import { request } from "../api.js";

// 포토카드 생성: FormData를 그대로 넘긴다.
export const createPhotoCard = (formData) =>
  request("/photo-cards", { method: "POST", body: formData });
