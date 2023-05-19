import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // USERS
  const user1 = await prisma.user.upsert({
    where: { user_id: 1 },
    update: {},
    create: {
      username: 'stdre',
      password: '$2b$10$m1tilET3IOZlEcADeYbc7eK3KceQvcuU5q1HR2YkMzDehs956QGtS',
    }
  })
  const user2 = await prisma.user.upsert({
    where: { user_id: 2 },
    update: {},
    create: {
      username: 'engreed',
      password: '$2b$10$m1tilET3IOZlEcADeYbc7eK3KceQvcuU5q1HR2YkMzDehs956QGtS',
    }
  })
  const user3 = await prisma.user.upsert({
    where: { user_id: 3 },
    update: {},
    create: {
      username: 'user',
      password: '$2b$10$NLWmHe/pYTYyy2DYA5i/OOuYNxiGdTHpHv5sHWZ6EAgvvh2M7qqbC',
    }
  })

  // POSTS
  const task1 = await prisma.task.upsert({
    where: { task_id: 1 },
    update: {},
    create: {
      title: 'Learning Prisma',
      priority: 'Low',
      due_date: new Date('2023-05-17T10:20:30.000Z'),
      note: 'Learning how to apply Prisma to create Schema to the project',
      user_id: 1,
    },
  });
  const task2 = await prisma.task.upsert({
    where: { task_id: 2 },
    update: {},
    create: {
      title: 'Create Task',
      priority: 'Medium',
      due_date: new Date('2023-05-17T11:22:33.000Z'),
      note: "Create Task schema and it's controller",
      user_id: 1,
    },
  });
  const task3 = await prisma.task.upsert({
    where: { task_id: 3 },
    update: {},
    create: {
      title: 'Authentication',
      priority: 'High',
      due_date: new Date('2023-05-18T09:10:11.000Z'),
      note: "Using JSON Web Token to authenticate To-do List",
      user_id: 2,
    },
  });

  console.log({ user1, user2, user3, task1, task2, task3 });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
