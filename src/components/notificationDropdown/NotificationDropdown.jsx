"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import * as styles from "./NotificationDropdown.css.js";
import Icon from "../icon/Icon";
import { useAuth } from "@/contexts/AuthContext";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import {
  getNotifications,
  markNotificationRead,
} from "@/lib/api/notifications";
import { timeAgo } from "@/lib/time";

// 헤더의 알림 종. 누르면 알림 목록이 펼쳐진다
export default function NotificationDropdown() {
  const { accessToken } = useAuth();
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const ref = useRef(null);

  // 종의 빨간 점: 처음에 안 읽은 개수만 받아 온다
  useEffect(() => {
    if (!accessToken) return;
    let cancelled = false;
    getNotifications({ limit: 1 }, accessToken)
      .then((data) => {
        if (!cancelled) setUnreadCount(data.unreadCount);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  // 열려 있을 때 바깥 클릭, Esc로 닫기
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  if (!accessToken) return null;

  return (
    <div ref={ref} className={styles.root}>
      <button
        type="button"
        aria-label={`알림${unreadCount > 0 ? `, 안 읽은 알림 ${unreadCount}개` : ""}`}
        aria-expanded={open}
        className={styles.bell}
        onClick={() => setOpen(!open)}
      >
        <Icon name={unreadCount > 0 ? "alarmActive" : "alarmDefault"} />
      </button>

      {open && (
        <NotificationList
          accessToken={accessToken}
          onUnreadCount={setUnreadCount}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

// 열 때마다 새로 마운트되어 첫 페이지부터 불러온다
function NotificationList({ accessToken, onUnreadCount, onClose }) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const cursor = useRef(undefined);

  // 실패하면 hasMore 를 false 로 넘겨 재요청 반복을 막는다
  const ref = useInfiniteScroll(async () => {
    try {
      const data = await getNotifications(
        { cursor: cursor.current },
        accessToken,
      );
      cursor.current = data.nextCursor;
      setItems((prev) => [...prev, ...data.items]);
      setDone(data.nextCursor === null);
      onUnreadCount(data.unreadCount);
    } catch (e) {
      setError(e.message || "알림을 불러오지 못했어요.");
    }
  }, !error && !done);

  const select = async (item) => {
    if (!item.isRead) {
      try {
        await markNotificationRead(item.id, accessToken);
        setItems((prev) =>
          prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n)),
        );
        onUnreadCount((count) => Math.max(count - 1, 0));
      } catch {
        // 읽음 처리에 실패해도 이동은 한다
      }
    }
    if (item.link) {
      onClose();
      router.push(item.link);
    }
  };

  return (
    <div className={styles.panel}>
      {done && items.length === 0 && (
        <p className={styles.empty}>알림이 없어요.</p>
      )}

      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={clsx(styles.item, !item.isRead && styles.unread)}
          onClick={() => select(item)}
        >
          <span className={styles.message}>{item.message}</span>
          <span className={styles.time}>{timeAgo(item.createdAt)}</span>
        </button>
      ))}

      {error && (
        <p role="alert" className={styles.empty}>
          {error}{" "}
          <button type="button" onClick={() => setError("")}>
            다시 시도
          </button>
        </p>
      )}

      {/* 끝 요소는 로딩 중에도 그대로 둔다 (useInfiniteScroll 규칙) */}
      <div ref={ref} />
    </div>
  );
}
