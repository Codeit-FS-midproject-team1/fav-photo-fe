import { useEffect, useRef } from "react";

// 목록 끝의 <div ref={ref} /> 가 화면에 보이면 다음 페이지를 불러온다
export default function useInfiniteScroll(loadMore, hasMore) {
  const ref = useRef(null);
  const loading = useRef(false);
  const latestLoadMore = useRef(loadMore);

  useEffect(() => {
    latestLoadMore.current = loadMore;
  });

  useEffect(() => {
    const target = ref.current;
    if (!target || !hasMore) return;

    let active = true;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || loading.current) return;
        loading.current = true;
        try {
          await latestLoadMore.current();
          // 불러온 뒤에도 끝이 보이면 이벤트가 다시 안 오므로 관찰을 새로 건다
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
  }, [hasMore]);

  return ref;
}
