"use client";

import Image from "next/image";
import * as styles from "./Header.css.js";
import logoImage from "@/assets/images/logo.svg";
import Link from "next/link";
import Icon from "@/components/icon/Icon.jsx";
import { useState } from "react";
import Dropdown from "@/components/dropdown/Dropdown.jsx";
import { useRouter } from "next/navigation";
import RandomPointModal from "@/components/randomPoint/RandomPointModal.jsx";
import { useRandomPointDraw } from "@/hooks/useRandomPointDraw.js";

function LoggedInActions({
  points,
  username,
  unreadCount,
  onLogout,
  onOpenRandomPoint,
}) {
  const router = useRouter();
  const userMenuOptions = [
    { label: "내 정보", value: "/my-info" },
    { label: "마이 갤러리", value: "/my-gallery" },
    { label: "판매 중인 포토카드", value: "/my-sales" },
    { label: "로그아웃", value: "logout" },
  ];

  return (
    <nav className={styles.actions}>
      <span className={styles.points}>{(points ?? 0).toLocaleString()} P</span>
      <button
        type="button"
        aria-label="랜덤 포인트 상자 열기"
        onClick={onOpenRandomPoint}
      >
        <Icon name="randomBox" />
      </button>
      <button type="button">
        <Icon name={unreadCount > 0 ? "alarmActive" : "alarmDefault"} />
      </button>
      <Dropdown
        variant="filter"
        options={userMenuOptions}
        value={null}
        placeholder={username}
        onChange={(value) => {
          if (value === "logout") onLogout?.();
          else router.push(value);
        }}
      />
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

function MobileHeader({
  isLoggedIn,
  isAuthLoading,
  points,
  username,
  unreadCount,
  onLogout,
  onOpenRandomPoint,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={styles.mobileHeaderWrap}>
      <div className={styles.mobileHeader}>
        <button
          type="button"
          className={styles.menuButton}
          aria-label="메뉴"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name="menu" size={18} />
        </button>

        <Link href="/" className={styles.logo}>
          <Image
            src={logoImage}
            alt="최애의 포토 로고"
            width={76}
            height={14}
          />
        </Link>

        {isAuthLoading ? null : isLoggedIn ? (
          <div className={styles.mobileActions}>
            <button
              type="button"
              aria-label="랜덤 포인트 상자 열기"
              onClick={onOpenRandomPoint}
            >
              <Icon name="randomBox" />
            </button>
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
      {menuOpen && isLoggedIn && !isAuthLoading && (
        <nav className={styles.mobileMenu}>
          <span className={`${styles.points} ${styles.mobileMenuItem}`}>
            {(points ?? 0).toLocaleString()} P
          </span>
          <span className={`${styles.mobileUsername} ${styles.mobileMenuItem}`}>
            {username}
          </span>
          <button
            className={`${styles.logoutButton} ${styles.mobileMenuItem}`}
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onLogout?.();
            }}
          >
            로그아웃
          </button>
        </nav>
      )}
    </div>
  );
}

export default function Header({
  isLoggedIn,
  isAuthLoading,
  points,
  username,
  unreadCount = 0,
  onLogout,
}) {
  const [randomPointOpen, setRandomPointOpen] = useState(false);

  const { draw, result, error, loading, exhausted } = useRandomPointDraw();

  const openRandomPoint = () => {
    setRandomPointOpen(true);
  };

  const closeRandomPoint = () => {
    if (loading) return;
    setRandomPointOpen(false);
  };

  const handleLogout = () => {
    setRandomPointOpen(false);
    onLogout?.();
  };

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

          {isAuthLoading ? null : isLoggedIn ? (
            <LoggedInActions
              points={points}
              username={username}
              unreadCount={unreadCount}
              onLogout={handleLogout}
              onOpenRandomPoint={openRandomPoint}
            />
          ) : (
            <LoggedOutActions />
          )}
        </div>
      </div>

      <MobileHeader
        isLoggedIn={isLoggedIn}
        isAuthLoading={isAuthLoading}
        points={points}
        username={username}
        unreadCount={unreadCount}
        onLogout={handleLogout}
        onOpenRandomPoint={openRandomPoint}
      />

      <RandomPointModal
        open={randomPointOpen && isLoggedIn && !isAuthLoading}
        onClose={closeRandomPoint}
        onDraw={draw}
        loading={loading}
        result={result}
        error={error}
        limitReached={exhausted}
      />
    </header>
  );
}
