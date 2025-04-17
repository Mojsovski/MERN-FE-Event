import { useRef } from "react";

type AnyFunction = (...args: unknown[]) => void;

const useDebounce = () => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debounce = <T extends AnyFunction>(func: T, delay: number) => {
    return (...args: Parameters<T>) => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        func(...args);
        debounceTimeout.current = null;
      }, delay);
    };
  };

  return debounce;
};

export default useDebounce;
