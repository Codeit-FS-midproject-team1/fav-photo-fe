import Image from "next/image";
import * as styles from "./Header.css.js";
import logoImage from "@/assets/images/logo.svg";
import Link from "next/link";
import Icon from "@/components/icon/Icon.jsx";

function LoggedInActions({ points, username, unreadCount,onLogout }) {
  return (
    <nav className={styles.actions}>
      <span className={styles.points}>{(points ?? 0).toLocaleString()} P</span>
      <button type="button">
        <Icon name="randomBox" />
      </button>
      <button type="button">
        <Icon name={unreadCount > 0 ? "alarmActive" : "alarmDefault"} />
      </button>
      <button className={styles.userButton} type="button">
        {username}
      </button>
      <span className={styles.divider} />
      <button className={styles.logoutButton} type="button" onClick={onLogout}>
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

function MobileHeader({ isLoggedIn, unreadCount }) {
  return (
    <div className={styles.mobileHeader}>
      <button type="button" className={styles.menuButton}>
        <Icon name="menu" size={18} />
      </button>

      <Link href="/" className={styles.logo}>
        <Image src={logoImage} alt="최애의 포토 로고" width={76} height={14} />
      </Link>

      {isLoggedIn ? (
        <div className={styles.mobileActions}>
          <Link href="/random-box">
            <Icon name="randomBox" />
          </Link>
          <button type="button">
            <Icon name={unreadCount > 0 ? "alarmActive" : "alarmDefault"} />
          </button>
        </div>
      ) : (
        <Link href="/login" className={styles.login}>
          로그인
        </Link>
      )}
    </div>
  );
}

export default function Header({
  isLoggedIn,
  points,
  username,
  unreadCount = 0,
  onLogout
}) {
  return (
    <header className={styles.header}>
      <div className={styles.desktopHeader}>
        <div className={styles.inner}>
          <Link href="/">
            <Image
              src={logoImage}
              alt="최애의 포토 로고"
              width={140}
              height={25}
            />
          </Link>

          {isLoggedIn ? (
            <LoggedInActions
              points={points}
              username={username}
              unreadCount={unreadCount}
              onLogout={onLogout}
            />
          ) : (
            <LoggedOutActions />
          )}
        </div>
      </div>

      <MobileHeader isLoggedIn={isLoggedIn} unreadCount={unreadCount} />
    </header>
  );
}
