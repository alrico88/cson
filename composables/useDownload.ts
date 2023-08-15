import fileSaver from "file-saver";

export function useDownload() {
  function downloadAsFile(
    filename: string,
    extension: string,
    content: string,
  ) {
    fileSaver.saveAs(new Blob([content]), `${filename}.${extension}`);
  }

  return {
    downloadAsFile,
  };
}
