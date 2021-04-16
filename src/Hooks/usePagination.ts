import { useEffect, useRef } from "react";

type UsePaginationProps = {
  targetRef: React.RefObject<HTMLDivElement>;
  callback: () => Promise<void>;
};

const usePagination = ({ targetRef, callback }: UsePaginationProps) => {
  const isFetching = useRef(true);

  useEffect(() => {
    let unsubscribe: () => void;
    let timeoutID: number;

    const scrollObserver = (node: HTMLDivElement) => {
      const options: IntersectionObserverInit = {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      };

      const observer = new IntersectionObserver((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          if (!isFetching.current) {
            isFetching.current = true;
            callback();
          }
        }
      }, options);

      observer.observe(node);

      timeoutID = window.setTimeout(() => {
        isFetching.current = false;
      }, 1000);

      return () => observer.unobserve(node);
    };

    if (targetRef.current) {
      unsubscribe = scrollObserver(targetRef.current);
    }

    return () => {
      unsubscribe && unsubscribe();
      clearTimeout(timeoutID);
    };
  }, [targetRef, callback]);
};

export default usePagination;
