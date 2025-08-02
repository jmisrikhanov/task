import { useEffect, useState, useMemo } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import styles from "./Search.module.scss";

type Props = {
  onDebouncedChange: (value: string) => void;
  placeholder?: string;
};

export default function Search({
  onDebouncedChange,
  placeholder = "Search GitHub users…",
}: Props) {
  const [value, setValue] = useState("");
  const debounced = useDebounce(value, 500);

  useEffect(() => {
    onDebouncedChange(debounced.trim());
  }, [debounced, onDebouncedChange]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const clearVisible = useMemo(() => value.length > 0, [value]);

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label="search-input"
      />
      {clearVisible && (
        <button
          className={styles.clear}
          onClick={() => setValue("")}
          aria-label="clear"
        >
          &#x78;
        </button>
      )}
    </div>
  );
}
