// pages/api/login/signup.js

import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email, password } = req.body;

  // Basic validation
  if (!email || !email.includes("@") || !password || password.length < 6) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Already hashed on the client-side
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
