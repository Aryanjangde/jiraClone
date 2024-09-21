const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const manager = await prisma.user.upsert({
    where: { email: 'alice.manager@example.com' },
    update: {},
    create: {
      email: 'alice.manager@example.com',
      name: 'Alice Johnson',
      role: 'MANAGER',
    },
  });

  const developer1 = await prisma.user.upsert({
    where: { email: 'bob.dev@example.com' },
    update: {},
    create: {
      email: 'bob.dev@example.com',
      name: 'Bob Smith',
      role: 'DEVELOPER',
    },
  });

  const developer2 = await prisma.user.upsert({
    where: { email: 'charlie.dev@example.com' },
    update: {},
    create: {
      email: 'charlie.dev@example.com',
      name: 'Charlie Brown',
      role: 'DEVELOPER',
    },
  });

  // Create Projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Alpha Initiative',
      managerId: manager.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: 'Beta Expansion',
      managerId: manager.id,
    },
  });

  // Create Tasks for Alpha Initiative
  const task1 = await prisma.task.create({
    data: {
      title: 'Database Schema Design',
      description: 'Design the initial database schema for Alpha Initiative',
      projectId: project1.id,
      status: 'TODO',
      assignees: {
        connect: { id: developer1.id },
      },
    },
  });

  const task2 = await prisma.task.create({
    data: {
      title: 'API Development',
      description: 'Develop REST API endpoints for Alpha Initiative',
      projectId: project1.id,
      status: 'IN_PROGRESS',
      assignees: {
        connect: { id: developer2.id },
      },
    },
  });

  // Create Tasks for Beta Expansion
  const task3 = await prisma.task.create({
    data: {
      title: 'UI/UX Design',
      description: 'Create UI/UX designs for Beta Expansion',
      projectId: project2.id,
      status: 'DONE',
      assignees: {
        connect: { id: developer1.id },
      },
    },
  });

  console.log({ manager, developer1, developer2, project1, project2, task1, task2, task3 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
