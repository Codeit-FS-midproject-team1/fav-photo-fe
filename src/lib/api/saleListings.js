import { ApiError, request } from "@/lib/api.js";
import { PURCHASE_QUANTITY_MIN, SALE_CARD_PAGE_SIZE } from "@/lib/constants.js";

function getSaleListingPath(id) {
  if (id === null || id === undefined || String(id).trim() === "") {
    throw new Error("판매글 ID가 필요합니다.");
  }

  return `/sale-listings/${encodeURIComponent(String(id))}`;
}

// 판매 관련 변경 요청에는 로그인 토큰을 전달합니다.
function getAuthHeaders(accessToken) {
  if (!accessToken) {
    throw new ApiError(401, "로그인이 필요합니다.");
  }

  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

// 판매글 등록
export function createSaleListing(photoCardId, formValues, accessToken) {
  const {
    quantity,
    price,
    exchangeMethod,
    exchangeGenre,
    exchangeDescription,
  } = formValues;

  return request("/sale-listings", {
    method: "POST",
    headers: getAuthHeaders(accessToken),
    body: {
      photoCardId,
      saleQuantity: quantity,
      price,
      exchangeMethod,
      exchangeGenre,
      exchangeDescription,
    },
  });
}

// 판매글 상세 조회
export function getSaleListing(id, accessToken) {
  return request(getSaleListingPath(id), {
    headers: getAuthHeaders(accessToken),
  });
}

// 판매글 수정
export function updateSaleListing(id, formValues, accessToken) {
  const {
    quantity,
    price,
    exchangeMethod,
    exchangeGenre,
    exchangeDescription,
  } = formValues;

  return request(getSaleListingPath(id), {
    method: "PATCH",
    headers: getAuthHeaders(accessToken),
    body: {
      remainingQuantity: quantity,
      price,
      exchangeMethod,
      exchangeGenre,
      exchangeDescription,
    },
  });
}

// 판매 취소
export function cancelSaleListing(id, accessToken) {
  return request(getSaleListingPath(id), {
    method: "DELETE",
    headers: getAuthHeaders(accessToken),
  });
}

/**
 * 실제 포인트 이동과 재고 변경은 백엔드 트랜잭션에서 처리합니다.
 * 동일한 구매 요청을 재시도할 때는 같은 idempotencyKey를 사용합니다.
 */
export function purchaseSaleListing(id, quantity, accessToken, idempotencyKey) {
  if (!Number.isSafeInteger(quantity) || quantity < PURCHASE_QUANTITY_MIN) {
    throw new Error("구매 수량은 1장 이상의 정수여야 합니다.");
  }

  if (typeof idempotencyKey !== "string" || !idempotencyKey) {
    throw new Error("구매 요청 식별자가 필요합니다.");
  }

  return request(`${getSaleListingPath(id)}/purchases`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(accessToken),
      "Idempotency-Key": idempotencyKey,
    },
    body: { quantity },
  });
}

// 판매 등록 화면에서 사용하는 보유(HELD) 카드 목록입니다.
// 팀의 인증 상태와 맞추기 위해 요청에 Bearer 토큰을 포함합니다.
export function getSaleableCards(
  { page = 1, pageSize = SALE_CARD_PAGE_SIZE } = {},
  accessToken,
  { signal } = {},
) {
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  return request(`/users/me/cards?${query.toString()}`, {
    headers: getAuthHeaders(accessToken),
    signal,
  });
}

// 판매글 수량을 늘릴 수 있는지 확인할 때, 동일한 카드의 HELD 수량을 조회합니다.
// 목록이 여러 페이지인 경우에도 photoCard ID로 정확히 찾습니다.
export async function getHeldPhotoCardQuantity(
  photoCardId,
  accessToken,
  { signal } = {},
) {
  if (
    photoCardId === null ||
    photoCardId === undefined ||
    String(photoCardId) === ""
  ) {
    throw new Error("포토카드 ID가 필요합니다.");
  }

  let page = 1;

  while (true) {
    const data = await getSaleableCards(
      { page, pageSize: SALE_CARD_PAGE_SIZE },
      accessToken,
      { signal },
    );

    if (!data || !Array.isArray(data.items)) {
      throw new Error("보유 카드 목록 응답 형식이 올바르지 않습니다.");
    }

    const card = data.items.find(
      (item) =>
        String(item?.photoCard?.id ?? item?.photoCardId) ===
        String(photoCardId),
    );

    if (card) {
      const quantity = Number(card.quantity);
      if (!Number.isSafeInteger(quantity) || quantity < 0) {
        throw new Error("보유 카드 수량 응답이 올바르지 않습니다.");
      }
      return quantity;
    }

    // 전체 건수가 존재하면 마지막 페이지를 정확하게 판별할 수 있습니다.
    if (Number.isSafeInteger(data.totalCount) && data.totalCount >= 0) {
      if (page * SALE_CARD_PAGE_SIZE >= data.totalCount) return 0;
    } else if (data.items.length < SALE_CARD_PAGE_SIZE) {
      return 0;
    } else {
      // 전체 건수 없이 매 페이지가 가득 차면, 마지막 페이지를 보장할 수 없습니다.
      throw new Error("보유 카드 목록의 전체 건수를 확인할 수 없습니다.");
    }

    page += 1;
  }
}
