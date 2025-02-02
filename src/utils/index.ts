import { useState, useEffect } from "react";
export function triggerRelayout() {
  requestAnimationFrame(() => window.dispatchEvent(new UIEvent("resize")));
  setTimeout(function() {
    window.dispatchEvent(new UIEvent("resize"));
  }, 200);
}
export function scrollToTop() {
  window.scrollTo(0, 0);
  requestAnimationFrame(() => window.scrollTo(0, 0));
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatPercent = (x: any) => (x > 0 ? `${(x * 100).toFixed(2)}%` : "");

type NotFinished = { notFinished: string };
const NOT_FINISHED = { notFinished: "yes" };

export function useAsync<T>(maybePromise: T | Promise<T>): T | undefined {
  const [fulfilledValue, setFulfilledValue] = useState<T | NotFinished>(NOT_FINISHED);
  useEffect(() => {
    if (maybePromise instanceof Promise) {
      setFulfilledValue(NOT_FINISHED);
      maybePromise.then(result => setFulfilledValue(result));
    } else {
      setFulfilledValue(maybePromise);
    }
  }, [maybePromise]);
  if (fulfilledValue !== NOT_FINISHED) {
    return fulfilledValue as T;
  }
  return undefined;
}
