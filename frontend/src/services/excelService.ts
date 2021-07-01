import { withAuth } from './util';
import { ListResponse, SaveToExcelPayload, urlConstants } from '../types';

const loadOnDb = (formData: FormData) => {
  const headers = new Headers({
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Encoding": "gzip"
  })
  return fetch(
    `${urlConstants.EXCEL_SERVICE}/save`,
    {method: "POST", headers: withAuth(headers), body: formData})
    .then(res => {
      if (res.status === 401) {
        throw new Error("No auth req");
      }
      if (res.status === 201) {
        return res.text();
      }
    });
}

const loadOnExcel = (input: RequestInfo, data: ListResponse, filename: string = "filename.xlsx") => 
  fetch(input, {
    method: "POST",
    body: JSON.stringify(data),
    headers: withAuth(new Headers({'Content-Type': 'application/json'}))
  }).then(res => {
      if (!res.ok) {
        throw new Error();
      }
      return res.blob()
    })
    .then(blob => URL.createObjectURL(blob))
    .then(href => {
      Object.assign(document.createElement('a'), {
        href,
        download: filename,
      }).click();
    });

const loadOnExcelByShips = (data: SaveToExcelPayload) => loadOnExcel(
  `${urlConstants.EXCEL_SERVICE}/download`,
  data, data.fileName)

const loadOnExcelByOwn = (data: SaveToExcelPayload) => loadOnExcel(
  `${urlConstants.EXCEL_SERVICE}/download/own`, 
  data, data.fileName);

const excelService = {
  loadOnDb,
  loadOnExcelByShips,
  loadOnExcelByOwn
}

export default excelService;