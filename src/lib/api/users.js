import { request } from "../api";

const toQuery = (params) =>
  new URLSearchParams(
    Object.entries(params).filter(([, v]) => v != null && v !== ""),
  ).toString();

export const getMyCards = (params = {}) =>
  request(`/users/me/cards?${toQuery(params)}`);
