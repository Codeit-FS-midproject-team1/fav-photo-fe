import * as styles from "./MethodText.css.js";

const LABEL = { PHOTO: "촬영", CRAFT: "제작", AI: "AI생성", ETC: "기타" };

export default function MethodText({ method }) {
  return <span className={styles.method[method]}>{LABEL[method]}</span>;
}
