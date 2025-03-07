import { PrismaClient, Community } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Clearing existing data...');

  // 1) Delete from children to parents (to satisfy FK constraints)
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('✅ All data cleared!');

  console.log('🌱 Seeding data...');

  // 2) Create Users
  const userJohn = await prisma.user.create({
    data: {
      username: 'john@example.com',
      name: 'John Doe',
      avatar: 'https://example.com/avatar-john.png',
    },
  });

  const userJane = await prisma.user.create({
    data: {
      username: 'jane@example.com',
      name: 'Jane Smith',
      avatar: 'https://example.com/avatar-jane.png',
    },
  });

  console.log(`✅ Created users: ${userJohn.username}, ${userJane.username}`);

  // 3) Create Posts (Referencing Users)
  //    We'll assign them to different communities
  const post1 = await prisma.post.create({
    data: {
      title: 'My First Post',
      content: 'Hello everyone, this is my first post!',
      community: Community.HISTORY, // or 'HISTORY' if using string
      userId: userJohn.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Best Pasta Recipe?',
      content: 'Anyone have a good pasta recipe?',
      community: Community.FOOD,
      userId: userJane.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: 'Cute Cat Photos',
      content: 'Share your cat pictures here!',
      community: Community.PETS,
      userId: userJane.id,
    },
  });

  console.log(`✅ Created posts: #${post1.id}, #${post2.id}, #${post3.id}`);

  // 4) Create Comments
  await prisma.comment.create({
    data: {
      content: 'Welcome, John!',
      userId: userJane.id,
      postId: post1.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'I love penne with homemade sauce!',
      userId: userJohn.id,
      postId: post2.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'Check out my cat: Mew!',
      userId: userJane.id,
      postId: post3.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'Check out my cat: Mew!',
      userId: userJane.id,
      postId: post1.id,
    },
  });

  console.log('✅ Added comments');

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
