const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

/**
 * 서버 에러를 감싸는 에러 클래스
 * @param {number} status - HTTP 상태 코드 (네트워크 오류는 0)
 * @param {string} message - 에러 메시지
 * @param {Object|null} fields - 입력 항목별 에러 (예: { email: '형식이 올바르지 않습니다' })
 */

export class ApiError extends Error {
  constructor(status, message, fields = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fields = fields;
  }
}

async function request(path, { method = 'GET', body, headers, ...rest } = {}) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      credentials: 'include',
      headers: {
        ...(body !== undefined && { 'Content-Type': 'application/json' }),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...rest,
    });
  } catch {
    throw new ApiError(0, '네트워크 오류가 발생했습니다.');
  }

  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    throw new ApiError(
      res.status,
      data?.message ?? res.statusText ?? '요청에 실패했습니다.',
      data?.fields ?? null,
    );
  }

  return data;
}

function toQuery(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.append(key, value);
    }
  });
  const query = search.toString();
  return query ? `?${query}` : '';
}



/** 화면에서 쓰는 API 목록 (백엔드가 정해지면 경로와 메서드를 맞춰 추가) */
export const api = {
  // 예시
  getListings: (params) => request(`/listings${toQuery(params)}`),
};