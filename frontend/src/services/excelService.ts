import { withAuth } from './util';
import { ListResponse, urlConstants } from '../types';

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
        return res.json();
      }
    });
}

const loadOnExcel = (promise: Promise<Response>) => 
  promise
    .then(res => res.blob())
    .then(blob => URL.createObjectURL(blob))
    .then(href => {
      Object.assign(document.createElement('a'), {
        href,
        download: "fileName.xlsx",
      }).click();
    });

const loadOnExcelByShips = (data: ListResponse) =>
  loadOnExcel(fetch(`${urlConstants.EXCEL_SERVICE}/download`, { 
    method: "POST",
    body: JSON.stringify(data),
    headers: withAuth(new Headers({ "Content-Type": "application/json" }))
  }))

const loadOnExcelByOwn = (data: ListResponse) => 
  loadOnExcel(fetch(`${urlConstants.EXCEL_SERVICE}/download`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: withAuth(new Headers({ "Content-Type": "application/json" }))
  }))

export {
  loadOnDb,
  loadOnExcelByShips
}