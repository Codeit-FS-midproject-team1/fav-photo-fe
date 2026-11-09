const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
let refreshRequest = null;

/**
 * @param {number} status - HTTP 상태 코드 (네트워크 오류는 0)
 * @param {string} message - 에러 메시지
 * @param {Object|null} fields - 입력 항목별 에러 (예: { email: '형식이 올바르지 않습니다' })
 */

export class ApiError extends Error {
  constructor(status, message, fields = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fields = fields;
  }
}

// 추가
function send(path, { method = "GET", body, headers, ...rest }) {
  const isFormData = body instanceof FormData;
  const token = getAccessToken();

  return fetch(`${BASE_URL}${path}`, {
    method,
    credentials: "include",
    headers: {
      ...(body !== undefined &&
        !isFormData && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body:
      body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
    ...rest,
  });
}

async function refreshAccessToken() {
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      clearAccessToken();
      return false;
    }
    const { accessToken } = await res.json();
    setAccessToken(accessToken);
    return true;
  } catch {
    return false;
  }
}

export async function request(path, { skipRefresh = false, ...options } = {}) {
  let res;

  try {
    res = await send(path, options);
    if (res.status === 401 && !skipRefresh && (await refreshAccessToken())) {
      res = await send(path, options);
    }
  } catch {
    throw new ApiError(0, "네트워크 오류가 발생했습니다.");
  }

  let text;
  try {
    text = await res.text();
  } catch {
    throw new ApiError(res.status, "응답 본문을 읽을 수 없습니다.");
  }

  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      if (!res.ok) {
        throw new ApiError(
          res.status,
          res.statusText || "요청에 실패했습니다.",
        );
      }

      throw new ApiError(res.status, "응답 형식이 올바르지 않습니다.");
    }
  }

  if (!res.ok) {
    throw new ApiError(
      res.status,
      data?.message ?? res.statusText ?? "요청에 실패했습니다.",
      data?.fields ?? null,
    );
  }

  return data;
}

function toQuery(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.append(key, value);
    }
  });
  const query = search.toString();
  return query ? `?${query}` : "";
}

function refresh() {
  if (!refreshRequest) {
    refreshRequest = request("/auth/refresh", {
      method: "POST",
    }).finally(() => {
      refreshRequest = null;
    });
  }

  return refreshRequest;
}

/** 화면에서 쓰는 API 목록 (백엔드가 정해지면 경로와 메서드를 맞춰 추가) */
export const api = {
  login: (credentials) =>
    request("/auth/login", {
      method: "POST",
      body: credentials,
    }),

  signup: (credentials) =>
    request("/auth/signup", {
      method: "POST",
      body: credentials,
    }),

  refresh,

  logout: () =>
    request("/auth/logout", {
      method: "POST",
    }),

  getMe: (accessToken) =>
    request("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};
