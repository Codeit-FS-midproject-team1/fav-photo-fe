import { useEffect, useRef, useState } from "react";

// 목록 끝의 <div ref={ref} /> 가 화면에 보이면 다음 페이지를 불러온다
export default function useInfiniteScroll(loadMore, hasMore) {
  // 목록 끝의 <div ref={ref} /> 가 화면에 보이면 다음 페이지를 불러온다
  // - 끝 요소는 로딩 중에도 그대로 둔다 (로딩 표시로 바꾸지 않는다)
  // - 불러오기가 실패하면 hasMore 를 false 로 넘긴다 (안 그러면 재요청이 반복된다)
  const [target, ref] = useState(null);
  const loading = useRef(false);
  const latestLoadMore = useRef(loadMore);

  useEffect(() => {
    latestLoadMore.current = loadMore;
  });

  useEffect(() => {
    if (!target || !hasMore) return;

    let active = true;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!active || !entry.isIntersecting || loading.current) return;
        loading.current = true;
        try {
          await latestLoadMore.current();
          // 불러온 뒤에도 끝이 보이면 이벤트가 다시 안 온다. 관찰을 새로 건다
          if (active) {
            observer.unobserve(target);
            observer.observe(target);
          }
        } finally {
          loading.current = false;
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(target);

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [target, hasMore]);

  return ref;
}
