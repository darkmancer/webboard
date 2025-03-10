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
      avatar:
        'https://cdn1.iconfinder.com/data/icons/emoticon-of-avatar-man/128/06_man_mocking_avatar_emoticon_smiley_people_user-512.png',
    },
  });

  const userJane = await prisma.user.create({
    data: {
      username: 'jane@example.com',
      name: 'Jane Smith',
      avatar:
        'data:image/jpeg;base64,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',
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
