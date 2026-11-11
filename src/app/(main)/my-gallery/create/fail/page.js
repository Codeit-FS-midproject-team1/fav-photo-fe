import { redirect } from "next/navigation";
import ResultScreen from "@/components/resultScreen/ResultScreen";
import { toCardLabel } from "../methodLabels.js";

export default async function PhotoCardCreateFailPage({ searchParams }) {
  const { name, method } = await searchParams;

  // 주소로 바로 들어와서 카드 이름이 없으면 생성 화면으로 돌려보낸다
  if (!name) redirect("/my-gallery/create");

  return (
    <ResultScreen
      success={false}
      title="포토카드 생성"
      message={`${toCardLabel(name, method)} 포토카드 생성에 실패했습니다.`}
      actions={[{ text: "마이갤러리로 돌아가기", href: "/my-gallery" }]}
    />
  );
}
