import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchUsersQuery } from "../../services/githubApi";
import UserItem from "../user-item/UserItem";
import Loader from "../loader/Loader";
import styles from "./UserList.module.scss";

const PER_PAGE = 30;
const MAX_RESULTS = 1000;

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
}

interface APIError {
  status?: number;
}

type Props = {
  query: string;
  onSelect: (login: string) => void;
  selected?: string | null;
};

export default function UserList({ query, onSelect, selected }: Props) {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isFetching, isError, error } = useSearchUsersQuery(
    { q: query, page, perPage: PER_PAGE },
    { skip: query.length < 2 }
  );

  const lastUserRef = useRef<HTMLLIElement | null>(null);

  // Reset on query change
  useEffect(() => {
    setUsers([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  // Append users
  useEffect(() => {
    if (data?.items) {
      setUsers((prev) => {
        const existing = new Set(prev.map((u) => u.id));
        const unique = data.items.filter((u) => !existing.has(u.id));
        return [...prev, ...unique];
      });

      if (data.items.length < PER_PAGE || page * PER_PAGE >= MAX_RESULTS) {
        setHasMore(false);
      }
    }
  }, [data, page]);

  // Observe last user
  useEffect(() => {
    if (!hasMore || isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: "100px" }
    );

    const current = lastUserRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [users, hasMore, isFetching]);

  // Memoized onSelect handler
  const handleSelect = useCallback(
    (login: string) => {
      onSelect(login);
    },
    [onSelect]
  );

  if (query.length < 2)
    return (
      <div className={styles.placeholder}>Type at least 2 characters.</div>
    );

  if (isError) {
    const apiError = error as APIError;
    const msg = apiError?.status
      ? `Request failed (${apiError.status}).`
      : "Something went wrong.";

    return (
      <div className={styles.error} role="alert">
        {msg}
      </div>
    );
  }

  if (!users.length && isFetching) return <Loader />;
  if (!users.length)
    return <div className={styles.placeholder}>No users found.</div>;

  return (
    <ul className={styles.list} role="list">
      {users.map((u, i) => (
        <li key={u.id} ref={i === users.length - 1 ? lastUserRef : undefined}>
          <UserItem
            login={u.login}
            avatarUrl={u.avatar_url}
            onSelect={handleSelect}
            selected={selected === u.login}
          />
        </li>
      ))}
      {isFetching && <Loader />}
    </ul>
  );
}
