import "@/styles/reset.css.js";
import "@/styles/globals.css.js";
import { themeClass } from "@/styles/theme.css.js";
import Header from "@/components/header/Header";
import { Noto_Sans_KR } from "next/font/google";
import localfont from "next/font/local";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700"],
});

const brB = localfont({
  src: "../assets/fonts/br-B.otf",
  display: "swap",
  variable: "--font-br-b",
});
export const metadata = {
  title: "최애의 포토",
  description: "최애의 포토",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${themeClass} ${notoSansKR.className} ${brB.variable}`}>
        <Header isLoggedIn={true} points={1540} username={"유디"} /> {/* TODO: 실제 로그인 유저 정보로 교체 */}
        {children}
      </body>
    </html>
  );
}
