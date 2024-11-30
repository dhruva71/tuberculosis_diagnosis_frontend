// pages/auth/signin.js

import { getCsrfToken } from "next-auth/react";

export default function SignIn({ csrfToken }) {
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
}

const styles = {
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

// Fetch CSRF token server-side
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
