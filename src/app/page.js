import { breakpoints } from "@/styles/responsive.css";
import Image from "next/image";
import Button from "@/components/button/Button";
import logoImage from "@/assets/images/logo.svg";
import * as styles from "./LandingPage.css";

const featureImages = [
  { number: 2, alt: "포인트로 안전하게 거래하는 방법" },
  { number: 3, alt: "알림으로 빠르게 거래하는 기능" },
  { number: 4, alt: "랜덤 상자로 포인트 받기" },
];

function ResponsiveLandingPicture({ number, alt, className }) {
  return (
    <picture className={className}>
      <source
        media={`(max-width: ${breakpoints.mobile}px)`}
        srcSet={`/landing/images/landing_mobile_${number}.svg`}
      />
      <source
        media={`(max-width: ${breakpoints.desktop - 1}px)`}
        srcSet={`/landing/images/landing_tablet_${number}.svg`}
      />
      <img
        className={styles.heroImage}
        src={`/landing/images/landing_desktop_${number}.svg`}
        alt={alt}
      />
    </picture>
  );
}

export default function LandingPage() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroContent}>
            <Image
              className={styles.heroLogo}
              src={logoImage}
              alt="최애의 포토"
              width={140}
              height={25}
            />
            <h1 className={styles.heroTitle}>
              구하기 어려웠던 <br />
              <span className={styles.highlight}>나의 최애</span>가 여기에!
            </h1>

            <Button
              href="/marketplace"
              thickness="compact"
              size="XS"
              className={styles.heroButton}
            >
              최애 찾으러 가기
            </Button>
          </div>

          <ResponsiveLandingPicture
            number={1}
            alt="최애 포토를 찾고 거래하는 서비스 소개"
            className={styles.heroPicture}
          />
        </div>
      </section>

      {featureImages.map(({ number, alt }) => (
        <section className={styles.featureSection} key={number}>
          <ResponsiveLandingPicture
            number={number}
            alt={alt}
            className={styles.featurePicture}
          />
        </section>
      ))}
    </main>
  );
}
