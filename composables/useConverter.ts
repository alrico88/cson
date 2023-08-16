import papa, { ParseResult } from "papaparse";
import flatten from "flat";

export enum Delimiter {
  Comma = ",",
  Semi = ";",
  Tab = "\t",
}

export function useConverter() {
  function csvToJson(csv: string): ParseResult<unknown> {
    return papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    });
  }

  function jsonToCsv(json: unknown[], delimiter: Delimiter): string {
    return papa.unparse(
      json.map((d) => flatten(d)),
      {
        header: true,
        skipEmptyLines: true,
        delimiter,
      },
    );
  }

  return {
    csvToJson,
    jsonToCsv,
  };
}
