import { useGetUserQuery } from "../../services/githubApi";
import Loader from "../loader/Loader";
import styles from "./UserDetails.module.scss";

type Props = { login?: string | null };

export default function UserDetails({ login }: Props) {
  const { data, isFetching, isError, error } = useGetUserQuery(login!, {
    skip: !login,
    // Only update when the selected login changes
    selectFromResult: ({ data, isFetching, isError, error }) => ({
      data,
      isFetching,
      isError,
      error,
    }),
  });

  if (!login)
    return (
      <div className={styles.placeholder}>Select a user to view details.</div>
    );
  if (isFetching) return <Loader />;
  if (isError) {
    const msg =
      typeof error === "object" && error && "status" in (error as any)
        ? `Failed to load user (${(error as any).status}).`
        : "Something went wrong.";
    return (
      <div className={styles.error} role="alert">
        {msg}
      </div>
    );
  }

  if (!data) return null;

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <img
          className={styles.avatar}
          src={data.avatar_url}
          alt={`${data.login} avatar`}
        />
        <div>
          <h2 className={styles.name}>{data.name ?? data.login}</h2>
          <a
            className={styles.link}
            href={data.html_url}
            target="_blank"
            rel="noreferrer"
          >
            &#x40;{data.login}
          </a>
        </div>
      </header>
      {data.bio && <p className={styles.bio}>{data.bio}</p>}
      <div className={styles.meta}>
        <span className={styles.badge}>Repos: {data.public_repos}</span>
      </div>
    </article>
  );
}
