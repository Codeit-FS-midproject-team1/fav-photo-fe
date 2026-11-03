"use client";

import { useState } from "react";
import ResultScreen from "@/components/resultScreen/ResultScreen";

export default function ResultScreenTest() {
  const [result, setResult] = useState(null);

  return (
    <main>
      <button
        type="button"
        onClick={() =>
          setResult({
            success: true,
            title: "판매 등록",
            message: "2장 판매 등록에 성공했습니다.",
            actionText: "마켓플레이스로 돌아가기",
            actionHref: "/marketplace",
          })
        }
      >
        성공 화면 테스트
      </button>

      <button
        type="button"
        onClick={() =>
          setResult({
            success: false,
            title: "판매 등록",
            message: "2장 판매 등록에 실패했습니다.",
            actionText: "다시 시도하기",
            actionHref: "/marketplace",
          })
        }
      >
        실패 화면 테스트
      </button>

      {result && (
        <ResultScreen
          {...result}
          onClose={() => setResult(null)}
        />
      )}
    </main>
  );
}