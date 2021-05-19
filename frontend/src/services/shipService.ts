import { FetchPayload, OwnOperator, Ship, ListResponse, urlConstants } from '../types';
import { api, withAuth, createApi, deleteApi } from './util';

const fetchShips = (payload: FetchPayload) => {
  const param = [["page", payload.page.toString()], ["size", payload.size.toString()]];
  if (payload.sort !== undefined) {
    param.push(["sort", payload.sort]);
  }
  const url = `${urlConstants.SHIP_SERVICE}/ship?` + new URLSearchParams(param).toString();
  return api<Ship[]>(url, { method: "GET" });
}

const fetchCountPage = (size: number) => api<number>(
  `${urlConstants.SHIP_SERVICE}/ship/count?` + new URLSearchParams({ "size": size.toString()}),
  { method: "GET"});

const fetchShip = (id: number) => api<Ship>(
  `${urlConstants.SHIP_SERVICE}/ship/${id}`,
  { method: "GET" });

const saveShip = (ship: Ship) => createApi<Ship>(
  `${urlConstants.SHIP_SERVICE}/ship`,
  { method: "POST", headers: withAuth(), body: JSON.stringify(ship) });

const updateShip = (ship: Ship) => api<Ship>(
  `${urlConstants.SHIP_SERVICE}/ship/`,
  {
    method: "PUT", 
    headers: withAuth(new Headers({ "Content-Type": "application/json" })), 
    body: JSON.stringify(ship)
  });

const deleteAllById = (data: ListResponse) => deleteApi(
  `${urlConstants.SHIP_SERVICE}/ship/all`,
  { 
    method: "DELETE",
    headers: withAuth(new Headers({ "Content-Type": "application/json" })),
    body: JSON.stringify(data)
  });

const fetchOwnOperator = (name: string) => api<OwnOperator>(
  `${urlConstants.SHIP_SERVICE}/ownoperator/${name}`,
  { method: "GET" });
  
const fetchUpdateOwnOperator = (data: OwnOperator) => api<OwnOperator>(
  `${urlConstants.SHIP_SERVICE}/ownoperator/`,
  { 
    method: "PUT", 
    headers: withAuth(new Headers({ "Content-Type": "application/json" })), 
    body: JSON.stringify(data) 
  });

const fetchOwnOperators = (payload: FetchPayload) => {
  const param = [["page", payload.page.toString()], ["size", payload.size.toString()]];
  if (payload.sort !== undefined) {
    param.push(["sort", payload.sort]);
  }
  const url = `${urlConstants.SHIP_SERVICE}/ownoperator?` + new URLSearchParams(param).toString();
  return api<OwnOperator[]>(url, { method: "GET" });
}

const fetchOwnCountPage = (size: number) => api<number>(
  `${urlConstants.SHIP_SERVICE}/ownoperator/count?` + new URLSearchParams([["size", size.toString()]]).toString(),
  { method: "GET" });

export {
  fetchShips,
  fetchCountPage,
  fetchShip,
  saveShip,
  updateShip,
  fetchOwnOperator,
  fetchOwnOperators,
  fetchUpdateOwnOperator,
  deleteAllById,
  fetchOwnCountPage,
}