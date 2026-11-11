import { request } from "@/lib/api.js";

/**
 * 랜덤 포인트 뽑기 API
 *
 * @param {string} accessToken - 로그인 Access Token
 * @param {string} idempotencyKey - 중복 지급 방지 요청 ID
 * @returns {Promise<{
 *   earned: number,
 *   points: number,
 *   randomPoint: {
 *     used: number,
 *     limit: number,
 *     nextResetAt: string
 *   }
 * }>}
 */
export const drawRandomPoints = (accessToken, idempotencyKey) =>
  request("/random-points/draw", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Idempotency-Key": idempotencyKey,
    },
  });
