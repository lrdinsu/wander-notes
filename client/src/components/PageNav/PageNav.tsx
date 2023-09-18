import { NavLink } from 'react-router-dom';

import { Logo } from '../Logo/Logo.tsx';
import styles from './PageNav.module.css';

export function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/about">About US</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Log in
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
