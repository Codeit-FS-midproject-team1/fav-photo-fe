"use client";

import { Suspense } from "react";
import { useSearchParams, redirect } from "next/navigation";
import ResultScreen from "@/components/resultScreen/ResultScreen";

function SellFailContent() {
  const sp = useSearchParams();
  const grade = sp.get("grade");
  const name = sp.get("name");
  const count = sp.get("count");

  if (!grade || !name || !count) redirect("/market");

  return (
    <ResultScreen
      success={false}
      title="판매 등록"
      message={`[${grade} | ${name}] ${count}장 판매 등록에 실패했습니다.`}
      actionText="마켓플레이스로 돌아가기"
      actionHref="/market"
    />
  );
}

export default function SellFailPage() {
  return (
    <Suspense>
      <SellFailContent />
    </Suspense>
  );
}
