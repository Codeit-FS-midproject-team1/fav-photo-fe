import TextArea from "@/components/textArea/TextArea";

export default function Home() {
  return (
    <>
      <TextArea
        label={"입력"}
        id={"text"}
        placeholder={"카드 설명을 입력해라"}
      ></TextArea>
    </>
  );
}
