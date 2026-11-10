const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

let refreshRequest = null;

/**
 * @param {number} status - HTTP 상태 코드 (네트워크 오류는 0)
 * @param {string} message - 에러 메시지
 * @param {Object|null} fields - 입력 항목별 에러
 */
export class ApiError extends Error {
  constructor(status, message, fields = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fields = fields;
  }
}

export async function request(
  path,
  { method = "GET", body, headers, ...rest } = {},
) {
  const isFormData = body instanceof FormData;
  let res;

  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      credentials: "include",
      headers: {
        ...(body !== undefined &&
          !isFormData && { "Content-Type": "application/json" }),
        ...headers,
      },
      body: isFormData
        ? body
        : body !== undefined
          ? JSON.stringify(body)
          : undefined,
      ...rest,
    });
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

/** 화면에서 사용하는 공통 API */
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

  logout: (accessToken) =>
    request("/auth/logout", {
      method: "POST",
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    }),

  getMe: (accessToken) =>
    request("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  patchNickname: (accessToken, { nickname }) =>
    request("/users/me/nickname", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: { nickname },
    }),

  patchPassword: (accessToken, { currentPassword, newPassword }) =>
    request("/users/me/password", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: { currentPassword, newPassword },
    }),
};
