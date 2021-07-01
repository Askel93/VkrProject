import { TokenObject, errorType } from "../types";

export function api<T = any>(url: string, options: RequestInit): Promise<T> {
  return fetch(url, options)
    .then(res => {
      if (res.status === 401) {
        throw new Error(errorType.NO_AUTH)
      }
      if (res.status === 404) {
        throw new Error(errorType.NOT_FOUND)
      }
      if (res.status === 500 || res.status === 502) {
        throw new Error(errorType.SERVER_ERROR);
      }
      if (!res.ok) {
        return res.json().then(err => { throw err })
      }
      return res.json();
    });
}

export function deleteApi(url: string, options: RequestInit): Promise<any> {
  return fetch(url, options)
    .then(res => {
      if (res.status === 401) {
        throw new Error(errorType.NO_AUTH);
      }
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return;
    })
}

export function stringApi(url: string, options: RequestInit): Promise<string> {
  return fetch(url, options)
    .then(res => {
      if (res.status === 401) {
        throw new Error(errorType.NO_AUTH);
      }
      if (res.status === 404) {
        throw new Error(errorType.NOT_FOUND)
      }
      if (res.status === 500 || res.status === 502) {
        throw new Error(errorType.SERVER_ERROR);
      }
      if (!res.ok) {
        return res.json().then(err => { throw err })
      }
      return res.text.toString();
    })
}

export function createApi<T>(url: string, options: RequestInit): Promise<T> {
  return fetch(url, options)
    .then(res => {
      if (res.status === 401) {
        throw new Error(errorType.NO_AUTH)
      }
      if (res.status !== 201) {
        return res.json().then(err => { throw err })
      }

      return res.json();
    });
}

export const withAuth = (headers = new Headers()) => {
  const tokenString = sessionStorage.getItem("access_token");
  if (tokenString === null) {
    throw new Error(errorType.NO_AUTH);
  }
  const token: TokenObject = JSON.parse(tokenString);
  headers.append('Authorization', `Bearer ${token.access_token}`);
  return headers;
}