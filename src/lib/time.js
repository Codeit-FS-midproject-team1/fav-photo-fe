const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

// 알림 시각 -> "방금 전, 5분 전, 3시간 전, 2일 전, 1주일 전, 3개월 전, 1년 전"
export function timeAgo(date, now = new Date()) {
  const then = new Date(date);
  const diff = now - then;

  if (diff < MINUTE) return "방금 전";
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)}분 전`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)}시간 전`;
  if (diff < WEEK) return `${Math.floor(diff / DAY)}일 전`;
  if (diff < 4 * WEEK) return `${Math.floor(diff / WEEK)}주일 전`;

  // 달력 기준 개월 수. 아직 그달의 같은 시각이 안 됐으면 한 달을 뺀다
  let months =
    (now.getFullYear() - then.getFullYear()) * 12 +
    now.getMonth() -
    then.getMonth();
  const passed = new Date(then);
  passed.setMonth(then.getMonth() + months);
  if (passed > now) months -= 1;

  // 4주가 지났는데 한달이 안됐어도 최소 1개월
  if (months < 12) return `${Math.max(months, 1)}개월 전`;
  return `${Math.floor(months / 12)}년 전`;
}
