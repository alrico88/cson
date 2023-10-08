<template lang="pug">
.container-fluid
  .row.row-cols-1.row-cols-md-2.g-4
    .col
      the-input(
        v-model:input="input", 
        @convert="convert", 
        @reset="reset",
        :format="Format.JSON", 
        :error="error",
        :example="jsonExample"
      )
    .col
      the-output(:output="output", :format="Format.CSV")
        template(#additionalOptions)
          div
            .form-check.form-check-inline
              input.form-check-input#delimiterComma(type="radio", :value="Delimiter.Comma", v-model="delimiter")
              label.form-check-label(for="delimiterComma") Comma
            .form-check.form-check-inline
              input.form-check-input#delimiterSemi(type="radio", :value="Delimiter.Semi", v-model="delimiter")
              label.form-check-label(for="delimiterSemi") Semicolon
            .form-check.form-check-inline
              input.form-check-input#delimiterTab(type="radio", :value="Delimiter.Tab", v-model="delimiter")
              label.form-check-label(for="delimiterTab") Tab
</template>

<script setup lang="ts">
import { Format } from "~/enums/format";

useHead({
  title: "CSON - Convert JSON to CSV",
  meta: [
    {
      name: "description",
      content: "Convert JSON to CSV free and privately",
    },
    {
      name: "keywords",
      content: "convert,json,to,csv,free,private",
    },
  ],
});

const { parseJson, prettyJson } = useJson();
const { jsonToCsv } = useConverter();

const input = ref("");
const output = ref("");
const error = ref<string[]>([]);
const delimiter = ref(Delimiter.Comma);

function convert() {
  try {
    error.value = [];

    output.value = jsonToCsv(parseJson(input.value), delimiter.value);
  } catch (err) {
    console.error(err);

    error.value = [err as string];
  }
}

function reset() {
  error.value = [];
  output.value = "";
}

watch(delimiter, () => {
  if (output.value !== "") {
    convert();
  }
});

const jsonExample = prettyJson([
  {
    item: "apples",
    count: 10,
    buyer: "Alberto",
  },
  {
    item: "bananas",
    count: 5,
    buyer: "Alberto",
  },
  {
    item: "watermelons",
    count: 1,
    buyer: "Alberto",
  },
]);
</script>
