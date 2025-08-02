import type { JSX } from "react";
import styles from "./Loader.module.scss";
export default function Loader(): JSX.Element {
  return <div className={styles.spinner} aria-label="loading" />;
}
