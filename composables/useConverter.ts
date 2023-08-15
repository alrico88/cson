import papa from "papaparse";

export enum Delimiter {
  Comma = ",",
  Semi = ";",
  Tab = "\t",
}

export function useConverter() {
  function csvToJson(csv: string): unknown[] {
    const parsed = papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    });

    if (parsed.errors.length > 0) {
      throw parsed.errors;
    }

    return parsed.data;
  }

  function jsonToCsv(json: unknown[], delimiter: Delimiter): string {
    return papa.unparse(json, {
      header: true,
      skipEmptyLines: true,
      delimiter,
    });
  }

  return {
    csvToJson,
    jsonToCsv,
  };
}
