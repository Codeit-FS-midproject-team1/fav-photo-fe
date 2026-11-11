import { request } from "../api.js";

export const createPhotoCard = (accessToken, formData) =>
  request("/photo-cards", {
    method: "POST",
    body: formData,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
