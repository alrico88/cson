<template lang="pug">
.container-fluid
  .row.row-cols-1.row-cols-md-2.g-4
    .col
      the-input(
        v-model:input="input", 
        @convert="convert",
        @reset="reset", 
        format="CSV", 
        :rows="rows",
        :error="error",
        :example="csvExample"
      )
    .col
      the-output(:output="output", :rows="rows", format="json")
        template(#additionalOptions)
          .form-check
            input.form-check-input#minify(type="checkbox", v-model="minify")
            label.form-check-label(for="minify") Minify JSON
</template>

<script setup lang="ts">
useHead({
  title: "CSON - Convert CSV to JSON",
  meta: [
    {
      name: "description",
      content: "Convert CSV to JSON free and privately",
    },
    {
      name: "keywords",
      content: "convert,csv,to,json,free,private",
    },
  ],
});

const { csvToJson } = useConverter();
const { prettyJson } = useJson();

const input = ref("");
const output = ref("");
const error = ref<string[]>([]);
const minify = ref(false);

const rows = 15;

function convert() {
  try {
    error.value = [];

    const parsed = csvToJson(input.value);

    output.value = minify.value
      ? JSON.stringify(parsed.data)
      : prettyJson(parsed.data);

    error.value = parsed.errors.map((err) => JSON.stringify(err));
  } catch (err) {
    error.value = err as string[];
  }
}

function reset() {
  error.value = [];
  output.value = "";
}

watch(minify, () => {
  if (output.value !== "") {
    convert();
  }
});

const csvExample = `item,count,buyer
apples,10,Alberto
bananas,5,Alberto
watermelons,1,Alberto`;
</script>
