"use client";

import { useState } from "react";
import ConfirmModal from "@/components/confirmModal/ConfirmModal";

export default function ConfirmModalTest() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("");

  const handleConfirm = () => {
    setResult("확인 버튼 동작");
    setOpen(false);
  };

  const handleClose = () => {
    setResult("닫기 동작");
    setOpen(false);
  };

  return (
    <main style={{ padding: 24 }}>
      <button type="button" onClick={() => setOpen(true)}>
        모달 열기
      </button>

      <p aria-live="polite">{result}</p>

      <ConfirmModal
        open={open}
        title="확인 모달 테스트"
        message={"메시지 표시와 줄바꿈을 확인합니다.\n두 번째 줄입니다."}
        confirmText="확인"
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </main>
  );
}