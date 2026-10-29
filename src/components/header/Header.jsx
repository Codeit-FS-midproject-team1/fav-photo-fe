import Image from "next/image";
import * as styles from "./Header.css.js";
import logoImage from "@/assets/images/logo.svg";
import notificationIcon from "@/assets/images/notification.svg";
import Link from "next/link";

function LoggedInActions({ points, username }) {
  return (
    <nav className={styles.actions}>
      <span className={styles.points}>{points} P</span>
      <button type="button" className={styles.iconButton}>
        <Image src={notificationIcon} alt="알림" width={24} height={24} />
      </button>
      <button className={styles.userButton} type="button">
        {username}
      </button>
      <span className={styles.divider} />
      <button className={styles.logoutButton} type="button">
        로그아웃
      </button>
    </nav>
  );
}

function LoggedOutActions() {
  return (
    <nav className={styles.loggedOutActions}>
      <Link href="/login">로그인</Link>
      <Link href="/signup">회원가입</Link>
    </nav>
  );
}

export default function Header({ isLoggedIn, points, username }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Image src={logoImage} alt="최애의 포토 로고" width={140} height={25} />
        {isLoggedIn ? (
          <LoggedInActions points={points} username={username} />
        ) : (
          <LoggedOutActions />
        )}
      </div>
    </header>
  );
}
