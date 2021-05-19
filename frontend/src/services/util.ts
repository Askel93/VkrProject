import { TokenObject } from "../types";

export function api<T = any>(url: string, options: RequestInit): Promise<T> {
  return fetch(url, options)
    .then(response => {
      if (response.status === 401) {
        throw new Error('No auth request')
      }
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json();
    });
}

export function deleteApi(url: string, options: RequestInit): Promise<any> {
  return fetch(url, options)
    .then(res => {
      if (res.status === 401) {
        throw new Error("No auth request");
      }
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return;
    })
}

export function createApi<T>(url: string, options: RequestInit): Promise<T> {
  return fetch(url, options)
    .then(res => {
      if (res.status !== 201) {
        throw new Error(res.statusText);
      }
      return res.json();
    });
}

export const withAuth = (headers = new Headers()) => {
  const token: TokenObject = JSON.parse(localStorage.getItem("token") as string);
  headers.append('Authorization', `Bearer ${token.access_token}`);
  return headers;
}