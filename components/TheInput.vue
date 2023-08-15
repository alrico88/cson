<template lang="pug">
.vstack.gap-3
  .form-group
    .hstack.gap-2.justify-content-between.align-items-center.mb-2
      label.form-label.mb-0.fw-bold(for="input") {{ isOverDropZone ? 'Drop the file' : `Paste a ${format} below or drag and drop a file` }}
      button.btn.btn-link.p-0(@click="loadExample") Load example
    textarea.form-control#input(
      :rows="rows",
      :spellcheck="false",
      v-model="selectedInput",
      ref="dropzoneRef",
      :class="{'is-invalid': error.length > 0}"
    )
  error-alert(v-if="error.length > 0", :error="error")
  .hstack.gap-2
    button.btn.btn-primary(
      @click="() => emit('convert')",
      :disabled="convertDisabled"
    ) #[icon(name="fluent:convert-range-20-regular")] Convert
    button.btn.btn-light(@click="clear") #[icon(name="material-symbols:clear-all")] Clear
</template>

<script setup lang="ts">
import { readAsText } from "promise-file-reader";

const props = defineProps<{
  input: string;
  format: string;
  rows: number;
  error: string[];
  example: string;
}>();

const emit = defineEmits<{
  convert: [];
  reset: [];
}>();

const selectedInput = useVModel(props, "input");
const convertDisabled = computed(() => selectedInput.value === "");

watch(selectedInput, () => {
  emit("reset");
});

const dropZoneRef = templateRef<HTMLElement>("dropzoneRef");

const { isOverDropZone } = useDropZone(dropZoneRef, async (files) => {
  if (Array.isArray(files) && files[0] != null) {
    selectedInput.value = await readAsText(files[0]);
  }
});

function clear() {
  selectedInput.value = "";
}

function loadExample() {
  selectedInput.value = props.example;
}
</script>
