<template lang="pug">
.vstack.gap-3
  .form-group
    .hstack.gap-2.justify-content-between.align-items-center.mb-2
      label.form-label.mb-0.fw-bold(for="output") Result
      slot(name="additionalOptions")
    .code-input
      codemirror#output(
        v-model="val",
        :extensions="extensions",
        :style="style",
        disabled
      )
  .hstack.gap-2
    button.btn.btn-success.text-nowrap(
      @click="copyToClip",
      :disabled="copied || outputBtnsDisabled"
    ) #[icon(name="bi:clipboard")] {{ copied ? 'Copied' : 'Copy to clipboard' }}
    form.w-100(@submit.prevent="() => download()")
      .input-group
        input.form-control(
          type="text", 
          v-model="filename", 
          :class="{'is-invalid': emptyFilename}", 
          required
        )
        .input-group-text .{{ format }}
        button.btn.btn-success(
          type="submit"
          :disabled="outputBtnsDisabled"
        ) #[icon(name="bi:save")] Download #[span.d-none.d-xl-inline as file]
</template>

<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { Format } from "~/enums/format";

const props = defineProps<{
  output: string;
  format: Format;
}>();

const fmt = toRef(props, "format");
const val = toRef(props, "output");

const { copy, copied } = useClipboard();
const { downloadAsFile } = useDownload();

const { extensions, style } = useCode(fmt);

const filename = ref("cson");
const emptyFilename = computed(() => filename.value === "");
const outputBtnsDisabled = computed(
  () => props.output === "" || emptyFilename.value,
);

function copyToClip() {
  copy(props.output);
}

function download() {
  downloadAsFile(filename.value, props.format, props.output);
}
</script>
