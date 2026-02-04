import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@promora.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'AdminPassword123!';
  const hostEmail = process.env.SAMPLE_HOST_EMAIL ?? 'host@promora.com';
  const amplifierEmail = process.env.SAMPLE_AMPLIFIER_EMAIL ?? 'amplifier@promora.com';
  const host1Email = 'host1@promora.com';
  const host2Email = 'host2@promora.com';
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
      modeType: 'POLYCODE',
      lastRoleUsed: 'HOST',
      roleType: 'ADMIN',
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
      modeType: 'HOST',
      lastRoleUsed: 'HOST',
      roleType: 'USER',
      onboardingDone: true,
      companyName: 'FashionCo',
      website: 'https://example.com',
    },
    update: {},
  });

  const host1 = await prisma.user.upsert({
    where: { email: host1Email },
    create: {
      email: host1Email,
      name: 'Host One',
      passwordHash: sampleHash,
    },
    update: {},
  });
  await prisma.profile.upsert({
    where: { userId: host1.id },
    create: {
      userId: host1.id,
      hostEnabled: true,
      creatorEnabled: false,
      onboardingDone: true,
      companyName: 'Verified Studio',
      website: 'https://verified-studio.example',
      verifiedBadge: true,
    },
    update: { verifiedBadge: true },
  });

  const host2 = await prisma.user.upsert({
    where: { email: host2Email },
    create: {
      email: host2Email,
      name: 'Host Two',
      passwordHash: sampleHash,
    },
    update: {},
  });
  await prisma.profile.upsert({
    where: { userId: host2.id },
    create: {
      userId: host2.id,
      hostEnabled: true,
      creatorEnabled: false,
      onboardingDone: true,
      companyName: 'Unverified Media',
      website: 'https://unverified-media.example',
      verifiedBadge: false,
    },
    update: { verifiedBadge: false },
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
      modeType: 'CREATOR',
      lastRoleUsed: 'CREATOR',
      roleType: 'USER',
      onboardingDone: true,
      creatorPlatforms: ['INSTAGRAM', 'YOUTUBE'],
    },
    update: {},
  });

  await prisma.campaign.deleteMany({});

  await prisma.campaign.createMany({
    data: [
      {
        hostId: host1.id,
        title: 'Sample with verify',
        description: 'Showcase our verified host campaign with authentic content and clean visuals.',
        thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80',
        videoUrl: 'https://youtube.com/watch?v=verified',
        campaignType: 'product',
        productType: 'Tech & Gadgets',
        productLink: 'https://verified-studio.example/product',
        reviewContent: true,
        platforms: ['YOUTUBE', 'INSTAGRAM'],
        platformRates: { youtube: 7500, instagram: 3500 },
        ratePer1kViewsPaise: 3500,
        tags: ['Tech', 'Product'],
        requirements: ['Minimum 5k followers', 'Use product tag', 'Submit within 48 hours'],
        status: 'ACTIVE',
        budgetTotalPaise: 15000000,
        budgetReservedPaise: 2000000,
        budgetSpentPaise: 3500000,
        startAt: new Date(),
        endAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        hostId: host2.id,
        title: 'Sample with unverify',
        description: 'Launch a creator-first campaign with fresh visuals and honest storytelling.',
        thumbnail: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&q=80',
        videoUrl: 'https://youtube.com/watch?v=unverified',
        campaignType: 'product',
        productType: 'Fashion & Apparel',
        productLink: 'https://unverified-media.example/collection',
        reviewContent: false,
        platforms: ['INSTAGRAM', 'FACEBOOK'],
        platformRates: { instagram: 3000, facebook: 3000 },
        ratePer1kViewsPaise: 3000,
        tags: ['Fashion', 'Lifestyle'],
        requirements: ['Show product in natural light', 'Mention campaign hashtag', 'No competing brands'],
        status: 'ACTIVE',
        budgetTotalPaise: 9000000,
        budgetReservedPaise: 1000000,
        budgetSpentPaise: 2500000,
        startAt: new Date(),
        endAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      },
    ],
  });

  const polycodeEmail = process.env.SAMPLE_POLYCODE_EMAIL ?? 'polycode@promora.com';
  const polycode = await prisma.user.upsert({
    where: { email: polycodeEmail },
    create: {
      email: polycodeEmail,
      name: 'Polycode User',
      passwordHash: sampleHash,
    },
    update: {},
  });
  await prisma.profile.upsert({
    where: { userId: polycode.id },
    create: {
      userId: polycode.id,
      creatorEnabled: true,
      hostEnabled: true,
      modeType: 'POLYCODE',
      lastRoleUsed: 'CREATOR',
      roleType: 'USER',
      onboardingDone: true,
      creatorPlatforms: ['INSTAGRAM'],
      companyName: 'Polycode Labs',
      website: 'https://polycode.example',
    },
    update: {},
  });

  console.log('Seed done:', {
    admin: admin.email,
    host: host.email,
    host1: host1.email,
    host2: host2.email,
    creator: creator.email,
    polycode: polycode.email,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
