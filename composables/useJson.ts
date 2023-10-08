export function useJson() {
  function prettyJson(json: unknown[]): string {
    return JSON.stringify(json, null, 2);
  }

  function parseJson(jsonString: string): unknown[] {
    return JSON.parse(jsonString);
  }

  return {
    prettyJson,
    parseJson,
  };
}
