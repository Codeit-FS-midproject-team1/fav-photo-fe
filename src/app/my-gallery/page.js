import Button from "@/components/button/Button";
import Field from "@/components/field/Field";
import TextArea from "@/components/textArea/TextArea";
import TextField from "@/components/textField/TextField";
import * as styles from "./sample.css.js";

export default function PhotocardsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <h1 className={styles.title}>컴포넌트 예시</h1>

        <div className={styles.form}>
          <Field label="Field">
            <div className={styles.fieldContent}>
              Field 컴포넌트 내부 내용입니다. input이 없습니다.
            </div>
          </Field>

          <TextField
            label="TextField"
            id="text-field-example"
            placeholder="TextField 입력 예시. input으로 받음"
          />

          <TextArea
            label="TextArea"
            id="text-area-example"
            placeholder="TextArea 입력 예시. input으로 받음"
            maxLength={200}
          />

          <Field label="Button">
            <Button type="button" variant="primary" size="L">
              Button
            </Button>
          </Field>

          <Field label="Button Secondary">
            <Button type="button" variant="secondary" size="L">
              Button Secondary
            </Button>
          </Field>
        </div>
      </section>
    </main>
  );
}
