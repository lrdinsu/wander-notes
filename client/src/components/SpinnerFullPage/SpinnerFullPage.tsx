import { Spinner } from '../Spinner/Spinner.tsx';
import styles from './SpinnerFullPage.module.css';

export function SpinnerFullPage() {
  return (
    <div className={styles.spinnerFullpage}>
      <Spinner />
    </div>
  );
}
