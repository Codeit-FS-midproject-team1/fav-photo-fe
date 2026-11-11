import { request } from "../api";

// 인증 헤더 생성
const authHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
});

// 교환 제안 목록 조회
export const getExchangeOffers = (accessToken, listingId) =>
  request(`/sale-listings/${listingId}/offers`, {
    headers: authHeaders(accessToken),
  });

// 교환 제안 생성
export const createExchangeOffer = (accessToken, listingId, data) =>
  request(`/sale-listings/${listingId}/offers`, {
    method: "POST",
    headers: authHeaders(accessToken),
    body: {
      photoCardId: data.photoCardId,
      description: data.description,
    },
  });

// 교환 제안 취소
export const cancelExchangeOffer = (accessToken, offerId) =>
  request(`/offers/${offerId}`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });

// 교환 제안 거절
export const rejectExchangeOffer = (accessToken, offerId) =>
  request(`/offers/${offerId}/reject`, {
    method: "POST",
    headers: authHeaders(accessToken),
  });

// 교환 제안 승인
export const acceptExchangeOffer = (accessToken, offerId) =>
  request(`/offers/${offerId}/accept`, {
    method: "POST",
    headers: authHeaders(accessToken),
  });
