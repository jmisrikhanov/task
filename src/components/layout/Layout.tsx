import styles from "./Layout.module.scss";
import type { PropsWithChildren } from "react";

export const Layout = ({
  children,
}: PropsWithChildren<object>): React.ReactElement => {
  return (
      <main className={styles.layout}>{children}</main>
  );
};
