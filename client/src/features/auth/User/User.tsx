import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/fakeAuth/FakeAuthContext.ts';

import styles from './User.module.css';

export function User() {
  // const user = FAKE_USER;
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return;

  function handleClick() {
    logout();
    navigate('/');
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Hi, {user.name}! Where did you go today?</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}
