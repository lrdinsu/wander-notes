import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { Button } from '@/components/Button/Button.tsx';
import { PageNav } from '@/components/PageNav/PageNav.tsx';
import { useAuth } from '@/contexts/fakeAuth/FakeAuthContext.ts';

import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('alice@email.com');
  const [password, setPassword] = useState('akgnlkerngflk239@4g');
  const { isAuthenticated, login } = useAuth();
  // const navigate = useNavigate();

  if (isAuthenticated) return <Navigate replace to={'/app'} />;

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/app', {replace: true});
  //   }
  // }, [isAuthenticated, navigate]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email && password) {
      login(email, password);
    }
  }

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button variant="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
