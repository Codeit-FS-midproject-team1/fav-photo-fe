import { request } from "../api";

const authHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
});

// 알림 목록 (커서 방식). cursor 가 없으면 첫 페이지
export function getNotifications({ cursor, limit } = {}, accessToken) {
  const query = new URLSearchParams(
    Object.entries({ cursor, limit }).filter(([, v]) => v != null && v !== ""),
  );

  return request(`/notifications?${query.toString()}`, {
    headers: authHeaders(accessToken),
  });
}

// 알림 읽음 처리 (응답 본문 없음)
export function markNotificationRead(id, accessToken) {
  return request(`/notifications/${id}/read`, {
    method: "PATCH",
    headers: authHeaders(accessToken),
  });
}
