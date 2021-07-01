import { FetchPayload, Ship, ListResponse, urlConstants } from '../types';
import { api, withAuth, createApi, deleteApi } from './util';

const fetchShips = (data: FetchPayload) => {
  const param = [["page", data.page.toString()], ["size", data.size.toString()]];
  if (data.sort !== undefined) {
    param.push(["sort", data.sort]);
  }
  const searchParam = data.search && data.search !== "" ? (data.search + "&") : "?" 
  const urlParams = searchParam + new URLSearchParams(param).toString()
  const url = `${urlConstants.SHIP_SERVICE}/ship` + urlParams;
  return api<Ship[]>(url, { method: "GET" });
}

const fetchShipCountPage = (data: FetchPayload) => {
  const param = [["size", data.size.toString()]];
  const searchParam = data.search && data.search !== "" ? (data.search + "&") : "?" 
  const urlParams = searchParam  + new URLSearchParams(param).toString();
  const url = `${urlConstants.SHIP_SERVICE}/ship/count` + urlParams;
  return api<number>(url, { method: "GET"});
}
const fetchShip = (id: number) => api<Ship>(
  `${urlConstants.SHIP_SERVICE}/ship/id?id=${id}`,
  { method: "GET" });

const saveShip = (ship: Ship) => createApi<Ship>(
  `${urlConstants.SHIP_SERVICE}/ship`,
  { method: "POST", headers: withAuth(), body: JSON.stringify({ _type: 'ship', ...ship}) });

const updateShip = (ship: Ship) => api<Ship>(
  `${urlConstants.SHIP_SERVICE}/ship/`,
  {
    method: "PUT", 
    headers: withAuth(new Headers({ "Content-Type": "application/json" })), 
    body: JSON.stringify({ _type: 'ship', ...ship})
  });

const deleteAllShipsById = (data: ListResponse) => deleteApi(
  `${urlConstants.SHIP_SERVICE}/ship/all`,
  { 
    method: "DELETE",
    headers: withAuth(new Headers({ "Content-Type": "application/json" })),
    body: JSON.stringify(data)
  });

const deleteShipById = (data: ListResponse) => deleteApi(
  `${urlConstants.SHIP_SERVICE}/ship/id?id=${data.listId[0]}`,
  { method: "DELETE", headers: withAuth() });

export {
  fetchShips,
  fetchShipCountPage,
  fetchShip,
  saveShip,
  updateShip,
  deleteAllShipsById,
  deleteShipById,
}