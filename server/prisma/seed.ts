import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@promora.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'AdminPassword123!';
  const hostEmail = process.env.SAMPLE_HOST_EMAIL ?? 'host@promora.com';
  const amplifierEmail = process.env.SAMPLE_AMPLIFIER_EMAIL ?? 'amplifier@promora.com';
  const samplePassword = process.env.SAMPLE_PASSWORD ?? 'Password123!';

  const adminHash = await hash(adminPassword, 10);
  const sampleHash = await hash(samplePassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    create: {
      email: adminEmail,
      name: 'Admin',
      passwordHash: adminHash,
    },
    update: { passwordHash: adminHash },
  });
  await prisma.profile.upsert({
    where: { userId: admin.id },
    create: {
      userId: admin.id,
      creatorEnabled: true,
      hostEnabled: true,
      adminEnabled: true,
      onboardingDone: true,
    },
    update: { adminEnabled: true },
  });

  const host = await prisma.user.upsert({
    where: { email: hostEmail },
    create: {
      email: hostEmail,
      name: 'Sample Host',
      passwordHash: sampleHash,
    },
    update: {},
  });
  await prisma.profile.upsert({
    where: { userId: host.id },
    create: {
      userId: host.id,
      hostEnabled: true,
      creatorEnabled: false,
      onboardingDone: true,
      companyName: 'FashionCo',
      website: 'https://example.com',
    },
    update: {},
  });

  const creator = await prisma.user.upsert({
    where: { email: amplifierEmail },
    create: {
      email: amplifierEmail,
      name: 'Sample Creator',
      passwordHash: sampleHash,
    },
    update: {},
  });
  await prisma.profile.upsert({
    where: { userId: creator.id },
    create: {
      userId: creator.id,
      creatorEnabled: true,
      hostEnabled: false,
      onboardingDone: true,
      creatorPlatforms: ['INSTAGRAM', 'YOUTUBE'],
    },
    update: {},
  });

  console.log('Seed done:', { admin: admin.email, host: host.email, creator: creator.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
