// 포토카드 생성 결과 화면(성공, 실패)에서 쓰는 제작 방식 라벨
export const METHOD_LABELS = {
  PHOTO: "촬영",
  CRAFT: "제작",
  AI: "AI생성",
  ETC: "기타",
};

// [제작방식 | 카드이름] 모양의 글자 생성
export const toCardLabel = (name, method) => {
  const methodLabel = METHOD_LABELS[method];
  return methodLabel ? `[${methodLabel} | ${name}]` : `[${name}]`;
};
