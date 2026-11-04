import * as styles from './Container.css';

/**
 * @param {React.ReactNode} children
 */

export default function Container({ children }) {
  return <div className={styles.container}>{children}</div>;
}