import { NextPage } from 'next';
import React from 'react';

// Define the shape of the props
interface SignInProps {
  csrfToken: string | undefined;
}

const SignIn: NextPage<SignInProps> = ({ csrfToken }) => {
  return (
    <div style={styles.container}>
      <h1>Sign In</h1>
      <form method="post" action="/api/auth/callback/credentials" style={styles.form}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Email:
          <input name="email" type="email" required style={styles.input} />
        </label>
        <label>
          Password:
          <input name="password" type="password" required style={styles.input} />
        </label>
        <button type="submit" style={styles.button}>Sign In</button>
      </form>
    </div>
  );
};

// Define styles with proper TypeScript types
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default SignIn;
