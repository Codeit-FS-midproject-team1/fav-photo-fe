/**
 * 요청이 처리되었을 가능성이 남아 있는 오류인지 판단합니다.
 * 2xx 성공 응답 이후 본문 처리에 실패한 경우도 재실행이 위험합니다.
 */
export function isRequestResultUncertain(error) {
  const status = error?.status;
  return (
    status === 0 ||
    (typeof status === "number" &&
      (status >= 500 || (status >= 200 && status < 300)))
  );
}
