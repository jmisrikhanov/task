import { useEffect, useState } from "react";

/**
 * Custom React hook that debounces a value by a specified delay.
 *
 * Useful for delaying the effect of a rapidly changing value, such as user input,
 * to avoid triggering expensive operations (e.g., API calls) on every change.
 *
 * @template T - The type of the value to debounce.
 * @param {T} value - The value to debounce.
 * @param {number} [delay=500] - The delay in milliseconds to wait before updating the debounced value.
 * @returns {T} - The debounced value that only updates after the delay has passed without changes.
 *
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 */
export function useDebounce<T>(value: T, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
