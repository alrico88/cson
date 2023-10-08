import { json } from "@codemirror/lang-json";
import { StyleValue } from "nuxt/dist/app/compat/capi";
import { Format } from "~/enums/format";

export function useCode(formatRef: Ref<string>) {
  const extensions = computed(() =>
    formatRef.value === Format.JSON ? [json()] : [],
  );

  const style: StyleValue = {
    backgroundColor: "white",
    height: "300px",
  };

  return {
    extensions,
    style,
  };
}
