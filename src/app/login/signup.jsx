// pages/login/signup.js

import { useState } from "react";
import { useRouter } from "next/router";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Hash the password
    const hashedPassword = await bcrypt.hash(form.password, 10);

    try {
      // Create user in the database
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, password: hashedPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect to sign-in page
        router.push("/auth/signin");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          Name:
          <input name="name" type="text" required value={form.name} onChange={handleChange} style={styles.input} />
        </label>
        <label>
          Email:
          <input name="email" type="email" required value={form.email} onChange={handleChange} style={styles.input} />
        </label>
        <label>
          Password:
          <input name="password" type="password" required value={form.password} onChange={handleChange} style={styles.input} />
        </label>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Sign Up</button>
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
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
};
