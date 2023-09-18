import { Map } from '@/features/Map/Map.tsx';
import { Sidebar } from '@/features/app/Sidebar/Sidebar.tsx';

import styles from './AppLayout.module.css';

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Map />
      <Sidebar />
    </div>
  );
}
