import ResultScreen from "@/components/resultScreen/ResultScreen";

export default async function SellFailPage({ searchParams }) {
  const params = (await searchParams) ?? {};

  const name =
    typeof params.name === "string" && params.name.trim()
      ? params.name.slice(0, 80)
      : "포토카드";

  const count =
    typeof params.count === "string" &&
    Number.isSafeInteger(Number(params.count)) &&
    Number(params.count) > 0
      ? Number(params.count)
      : null;

  const reason =
    typeof params.reason === "string" && params.reason.trim()
      ? params.reason.slice(0, 200)
      : "판매 등록을 완료하지 못했습니다.";

  const cardInfo = count ? `${name} · ${count}장` : name;

  return (
    <ResultScreen
      success={false}
      title="판매 등록"
      message={`${cardInfo} 판매 등록에 실패했습니다. ${reason}`}
      actions={[
        {
          text: "판매 등록 다시 하기",
          href: "/sell",
        },
        {
          text: "마켓플레이스로 돌아가기",
          href: "/marketplace",
        },
      ]}
    />
  );
}
