import { useCallback, useState } from "react";
import Search from "../search/Search";
import UserList from "../user-list/UserList";
import UserDetails from "../user-details/UserDetails";
import styles from "./SearchPage.module.scss";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const onDebouncedChange = useCallback((v: string) => {
    setQuery(v);
    setSelected(null); // reset selection on new search
  }, []);

  const onSelect = useCallback((login: string) => setSelected(login), []);

  return (
    <div className={styles.layout}>
      <section className={styles.left}>
        <Search onDebouncedChange={onDebouncedChange} />
        <div className={styles.listWrap}>
          <UserList
            query={query}
            onSelect={onSelect}
            selected={selected ?? undefined}
          />
        </div>
      </section>
      <section className={styles.right}>
        <UserDetails login={selected} />
      </section>
    </div>
  );
}
