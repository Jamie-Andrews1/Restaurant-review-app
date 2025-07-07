import styles from "./compStyles.module.css";
import ThemeSwitch from "./ThemeSwitch";

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.head}>
        <h1>Restaurant Reviews</h1>
      </div>
      <ThemeSwitch />
    </div>
  );
}
