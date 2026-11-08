import TextArea from "@/components/textArea/TextArea";

export default function HomePage() {
  return (
    <main style={{ maxWidth: 640, margin: "48px auto", padding: "0 24px" }}>
      <h1>TextArea 초기화 확인</h1>
      <form>
        <TextArea
          label="내용"
          name="content"
          defaultValue="처음 표시되는 내용입니다."
          maxLength={200}
          placeholder="내용을 입력하세요"
        />
        <button type="reset" style={{ marginTop: 16 }}>
          초기화
        </button>
      </form>
    </main>
  );
}
