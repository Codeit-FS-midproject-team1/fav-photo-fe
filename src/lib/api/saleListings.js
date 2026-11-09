/**
 * 판매/구매 API 5개에 대응하는 fetch 클라이언트.
 * NEXT_PUBLIC_API_BASE_URL 환경변수: 예) http://localhost:4000
 * 세션 쿠키 기반 인증을 가정하므로 credentials: 'include'를 사용합니다.
 * 팀의 공통 axios 클라이언트가 있다면 이 함수들을 그쪽으로 옮기세요.
 */
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/$/, '');

async function request(path, { method = 'GET', body } = {}) {
  const response = await fetch(`${API_BASE}/api${path}`, {
    method,
    credentials: 'include',
    headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    cache: 'no-store',
  });
  const result = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(result?.message ?? `요청 실패 (${response.status})`);
    error.status = response.status;
    error.fields = result?.fields;
    throw error;
  }
  return result;
}

function idPath(id) {
  if (!Number.isSafeInteger(Number(id)) || Number(id) <= 0) throw new Error('유효하지 않은 판매글 ID');
  return `/sale-listings/${Number(id)}`;
}

export const createSaleListing = data => request('/sale-listings', { method: 'POST', body: data });
export const getSaleListing = id => request(idPath(id));
export const updateSaleListing = (id, data) => request(idPath(id), { method: 'PATCH', body: data });
export const cancelSaleListing = id => request(idPath(id), { method: 'DELETE' });
export const purchaseSaleListing = (id, quantity) => request(`${idPath(id)}/purchases`, { method: 'POST', body: { quantity } });
