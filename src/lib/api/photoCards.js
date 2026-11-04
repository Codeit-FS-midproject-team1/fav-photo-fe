const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api";

export async function createPhotoCard(formData) {
  const response = await fetch(`${API_BASE_URL}/photo-cards`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(result.message || "포토카드 생성에 실패했습니다.");

    error.status = response.status;
    error.code = result.code;

    throw error;
  }

  return result;
}
