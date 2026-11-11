import { request } from "../api";

const toQuery = (params) =>
  new URLSearchParams(
    Object.entries(params).filter(([, v]) => v != null && v !== ""),
  ).toString();

export const getMyCards = (accessToken, params = {}) =>
  request(`/users/me/cards?${toQuery(params)}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const getMySales = (accessToken, params = {}) =>
  request(`/users/me/sales?${toQuery(params)}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
