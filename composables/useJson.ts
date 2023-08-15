import { Formatter } from "fracturedjsonjs";

export function useJson() {
  function prettyJson(json: unknown[]): string {
    const f = new Formatter();

    return f.Serialize(json) as string;
  }

  function parseJson(jsonString: string): unknown[] {
    return JSON.parse(jsonString);
  }

  return {
    prettyJson,
    parseJson,
  };
}
