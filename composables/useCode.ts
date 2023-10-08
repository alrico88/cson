import { json } from "@codemirror/lang-json";
import { EditorView } from "codemirror";
import { Format } from "~/enums/format";
import type { StyleValue } from "nuxt/dist/app/compat/capi";

export function useCode(formatRef: Ref<string>) {
  const extensions = computed(() => {
    const baseExtensions = [EditorView.lineWrapping];

    if (formatRef.value === Format.JSON) {
      baseExtensions.push(json());
    }

    return baseExtensions;
  });

  const style: StyleValue = {
    backgroundColor: "white",
    height: "300px",
  };

  return {
    extensions,
    style,
  };
}
