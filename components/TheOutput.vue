<template lang="pug">
.vstack.gap-3
  .form-group
    .hstack.gap-2.justify-content-between.align-items-center.mb-2
      label.form-label.mb-0.fw-bold(for="output") Result
      slot(name="additionalOptions")
    textarea.form-control#output(
      :rows="rows",
      :spellcheck="false",
      :value="output",
      readonly
    )
  .hstack.gap-2
    button.btn.btn-success(
      @click="copyToClip",
      :disabled="copied || outputBtnsDisabled"
    ) #[icon(name="bi:clipboard")] {{ copied ? 'Copied' : 'Copy to clipboard' }}
    button.btn.btn-success(
      @click="download",
      :disabled="outputBtnsDisabled"
    ) #[icon(name="bi:save")] Download as file
</template>

<script setup lang="ts">
const props = defineProps<{
  output: string;
  rows: number;
  format: "json" | "csv";
}>();

const outputBtnsDisabled = computed(() => props.output === "");

const { copy, copied } = useClipboard();
const { downloadAsFile } = useDownload();

function copyToClip() {
  copy(props.output);
}

function download() {
  downloadAsFile("cson", props.format, props.output);
}
</script>
