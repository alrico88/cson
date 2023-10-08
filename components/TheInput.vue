<template lang="pug">
input.d-none#fileInput(type="file", @change="handleFileLoad")
.vstack.gap-3
  .form-group
    .hstack.gap-2.justify-content-between.align-items-center.mb-2
      label.form-label.mb-0.fw-bold.text-truncate(
        :title="labelText",
        for="input"
      ) {{ labelText }}
      div
        .hstack.gap-2
          button.btn.btn-link.p-0.text-nowrap(@click="openFile") #[icon(name="material-symbols:file-open-outline-sharp")] Load file
          button.btn.btn-link.p-0.text-nowrap(@click="loadExample") #[icon(name="ic:outline-contact-support")] Load example
    .code-input
      codemirror#input(
        v-model="selectedInput",
        :extensions="extensions",
        :style="style",
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
import { Codemirror } from "vue-codemirror";
import { Format } from "~/enums/format";

const props = defineProps<{
  input: string;
  format: Format;
  error: string[];
  example: string;
}>();

const emit = defineEmits<{
  convert: [];
  reset: [];
}>();

const selectedInput = useVModel(props, "input");
const convertDisabled = computed(() => selectedInput.value === "");

const fmt = toRef(props, "format");
const { extensions, style } = useCode(fmt);

const labelText = computed(() =>
  isOverDropZone.value
    ? "Drop the file"
    : `Paste a ${fmt.value.toUpperCase()} below or drag and drop a file`,
);

debouncedWatch(
  selectedInput,
  () => {
    emit("reset");
  },
  {
    debounce: 100,
  },
);

const dropZoneRef = templateRef<HTMLElement>("dropzoneRef");

async function processFile(files: File[] | null): Promise<void> {
  if (Array.isArray(files) && files[0] != null) {
    selectedInput.value = await readAsText(files[0]);
  }
}

const { isOverDropZone } = useDropZone(dropZoneRef, (files) => {
  processFile(files);
});

function clear() {
  selectedInput.value = "";
}

function loadExample() {
  selectedInput.value = props.example;
}

function openFile() {
  document.getElementById("fileInput")?.click();
}

function handleFileLoad(event: Event) {
  const file = (event.target as HTMLInputElement).files;

  if (!file) {
    return [];
  }

  processFile([file[0]]);
}
</script>
