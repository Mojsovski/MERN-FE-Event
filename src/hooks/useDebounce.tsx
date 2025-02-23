import { useRef } from "react";

const useDeboundce = () => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debounce = (func: Function, delay: number) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      func();
      debounceTimeout.current = null;
    }, delay);
  };
  return debounce;
};

export default useDeboundce;
