// app/auth/signin/SignInForm.tsx
'use client';

import React from 'react';
// import { getCsrfToken } from 'next-auth/react';

type SignInFormProps = object

const SignInForm: React.FC<SignInFormProps> = ({  }) => {
  // const csrfToken = getCsrfToken();
  return (
    <div style={styles.container}>
      <h1>Sign In</h1>
      <form method="post" action="/api/auth/callback/credentials" style={styles.form}>
        {/*<input name="csrfToken" type="hidden" defaultValue={csrfToken ?? ''} />*/}
        <input name="csrfToken" type="hidden"  />
        <label htmlFor="email">
          Email:
          <input id="email" name="email" type="email" required style={styles.input} />
        </label>
        <label htmlFor="password">
          Password:
          <input id="password" name="password" type="password" required style={styles.input} />
        </label>
        <button type="submit" style={styles.button}>Sign In</button>
      </form>
    </div>
  );
};

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

export default SignInForm;
