import React from "react";
import styles from "./UserItem.module.scss";

type Props = {
  login: string;
  avatarUrl: string;
  onSelect: (login: string) => void;
  selected?: boolean;
};

function UserItem({ login, avatarUrl, onSelect, selected }: Props) {
  return (
    <button
      className={`${styles.item} ${selected ? styles.selected : ""}`}
      onClick={() => onSelect(login)}
      aria-label={`user-${login}`}
    >
      <img src={avatarUrl} alt={`${login} avatar`} className={styles.avatar} />
      <span className={styles.login}>{login}</span>
    </button>
  );
}

export default React.memo(UserItem);
