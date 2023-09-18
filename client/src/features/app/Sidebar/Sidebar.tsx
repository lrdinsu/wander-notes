import { Outlet } from 'react-router-dom';

import { Logo } from '@/components/Logo/Logo.tsx';

import { User } from '../../auth/User/User.tsx';
import { AppNav } from '../AppNav/AppNav.tsx';
import { Footer } from '../Footer/Footer.tsx';
import styles from './Sidebar.module.css';

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <User />
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  );
}
