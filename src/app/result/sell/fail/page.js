import { redirect } from "next/navigation";
import ResultScreen from "@/components/resultScreen/ResultScreen";

export default async function SellFailPage({ searchParams }) {
  const { grade, name, count } = await searchParams;

  if (!grade || !name || !count) redirect("/market");

  return (
    <ResultScreen
      success={false}
      title="판매 등록"
      message={`[${grade} | ${name}] ${count}장 판매 등록에 실패했습니다.`}
      actions={[{ text: "마켓플레이스로 돌아가기", href: "/marketplace" }]}
    />
  );
}
