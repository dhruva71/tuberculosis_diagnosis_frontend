import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Seed users
  const users = [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'dhruva',
      email: 'dhruva@aimpact.com',
      emailVerified: new Date(),
      image: 'https://example.com/images/alice.png',
      password: 'diagn0stics2024!', // Ensure passwords are hashed in your app
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174001',
      name: 'naveen',
      email: 'naveen@aimpact.com',
      emailVerified: new Date(),
      image: 'https://example.com/images/bob.png',
      password: 'a1mp@ct2024!', // Ensure passwords are hashed in your app
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
    console.log(`Seeded user with email: ${user.email}`);
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });