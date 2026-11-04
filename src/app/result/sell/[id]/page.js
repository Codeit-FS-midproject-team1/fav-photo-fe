"use client";

import { useParams, notFound } from "next/navigation";
import ResultScreen from "@/components/resultScreen/ResultScreen";
//import { useSellDetail } from "@/hooks/useSellDetail";
// TODO: 상세 조회 훅으로 교체

export default function SellResultPage() {
  //TODO: const { id } = useParams(); const { data, isLoading, isError } = useSellDetail(id);
  const data = { grade: "LEGENDARY", name: "우리집 앞마당", count: 2 }; // TODO: 실제 데이터로 교체

  // if (isLoading) return null;
  // if (isError || !data) notFound();

  return (
    <ResultScreen
      success
      title="판매 등록"
      message={`[${data.grade} | ${data.name}] ${data.count}장 판매 등록에 성공했습니다!`}
      actionText="나의 판매 포토카드에서 확인하기"
      actionHref="/my-sales"
    />
  );
}
