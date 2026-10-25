import "@/styles/reset.css.js";
import "@/styles/globals.css.js";

export const metadata = {
  title: "최애의 포토",
  description: "최애의 포토",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
