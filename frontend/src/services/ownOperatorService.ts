import { deleteApi, api, withAuth, createApi } from './util';

import { urlConstants, ListResponse, OwnOperator, FetchPayload } from '../types';

const fetchOwnOperator = (name: string) => api<OwnOperator>(
  `${urlConstants.SHIP_SERVICE}/ownoperator/id?id=${name}`,
  { method: "GET" });

const fetchOwnOperators = (payload: FetchPayload) => {
  const param = [["page", payload.page.toString()], ["size", payload.size.toString()]];
  if (payload.sort !== undefined) {
    param.push(["sort", payload.sort]);
  }
  if (payload.search && payload.search !== "") {
    param.push(["search", payload.search]);
  }
  const url = `${urlConstants.SHIP_SERVICE}/ownoperator?` + new URLSearchParams(param).toString();
  return api<OwnOperator[]>(url, { method: "GET" });
}

const fetchOwnCountPage = (data: FetchPayload) => {
  const param = [["size", data.size.toString()]];
  if (data.search && data.search.trim() !== "") {
    param.push(["search", data.search]);
  }
  const url = `${urlConstants.SHIP_SERVICE}/ownoperator/count?` + new URLSearchParams(param).toString();
  return api<number>(url, { method: "GET" });
}

const deleteAllOwnByIdApi = (data: ListResponse) => deleteApi(
  `${urlConstants.SHIP_SERVICE}/ownoperator/all`,
  {
    method: "DELETE",
    headers: withAuth(new Headers({ "Content-Type": "application/json" })),
    body: JSON.stringify(data)
  });

const updateOwnOperatorApi = (data: OwnOperator) => api<OwnOperator>(
  `${urlConstants.SHIP_SERVICE}/ownoperator/`,
  {
    method: "PUT",
    headers: withAuth(new Headers({ "Content-Type": "application/json" })),
    body: JSON.stringify({_type: 'ownoperator', ...data})
  });

const saveOwnOperatorApi = (data: OwnOperator) => createApi(
  `${urlConstants.SHIP_SERVICE}/ownoperator/`,
  {
    method: "POST",
    headers: withAuth(new Headers({ "Content-Type": "application/json" })),
    body: JSON.stringify({_type: 'ownoperator', ...data})
  })


export {
  deleteAllOwnByIdApi as deleteAllOwnById,
  fetchOwnOperator,
  fetchOwnOperators,
  fetchOwnCountPage,
  updateOwnOperatorApi as fetchUpdateOwnOperator,
  saveOwnOperatorApi
}