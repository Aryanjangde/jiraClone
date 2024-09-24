const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const manager = await prisma.User.upsert({
    where: { email: 'john.manager@example.com' },
    update: {},
    create: {
      email: 'john.manager@example.com',
      name: 'John Carter',
      role: 'MANAGER',
    },
  });

  const developer1 = await prisma.User.upsert({
    where: { email: 'dave.dev@example.com' },
    update: {},
    create: {
      email: 'dave.dev@example.com',
      name: 'Dave Wilson',
      role: 'DEVELOPER',
    },
  });

  const developer2 = await prisma.User.upsert({
    where: { email: 'emily.dev@example.com' },
    update: {},
    create: {
      email: 'emily.dev@example.com',
      name: 'Emily Davis',
      role: 'DEVELOPER',
    },
  });

  const developer3 = await prisma.User.upsert({
    where: { email: 'jack.dev@example.com' },
    update: {},
    create: {
      email: 'jack.dev@example.com',
      name: 'Jack Thompson',
      role: 'DEVELOPER',
    },
  });

  // Create Projects
  const project1 = await prisma.Project.create({
    data: {
      name: 'Project Omega',
      managerId: manager.id,
    },
  });

  const project2 = await prisma.Project.create({
    data: {
      name: 'Project Phoenix',
      managerId: manager.id,
    },
  });

  // Create Tasks for Project Omega
  const task1 = await prisma.Task.create({
    data: {
      title: 'Backend Architecture Design',
      description: 'Design the microservices architecture for Project Omega.',
      projectId: project1.id,
      status: 'TODO',
      priority: 'HIGH',
      taskType: 'FEATURE',
      deadline: new Date('2024-10-15'),
      assignees: {
        connect: [{ id: developer1.id }, { id: developer2.id }],
      },
    },
  });

  const task2 = await prisma.Task.create({
    data: {
      title: 'Authentication Module',
      description: 'Develop the authentication module for Project Omega.',
      projectId: project1.id,
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      taskType: 'BUG',
      deadline: new Date('2024-10-05'),
      assignees: {
        connect: { id: developer3.id },
      },
    },
  });

  // Create Tasks for Project Phoenix
  const task3 = await prisma.Task.create({
    data: {
      title: 'Frontend Dashboard UI',
      description: 'Create the frontend dashboard UI for Project Phoenix.',
      projectId: project2.id,
      status: 'IN_PROGRESS',
      priority: 'CRITICAL',
      taskType: 'FEATURE',
      deadline: new Date('2024-09-30'),
      assignees: {
        connect: [{ id: developer1.id }],
      },
    },
  });

  const task4 = await prisma.Task.create({
    data: {
      title: 'API Error Handling',
      description: 'Implement proper error handling for all API endpoints.',
      projectId: project2.id,
      status: 'TODO',
      priority: 'LOW',
      taskType: 'ISSUE',
      deadline: new Date('2024-10-20'),
      assignees: {
        connect: [{ id: developer2.id }, { id: developer3.id }],
      },
    },
  });

  console.log({ manager, developer1, developer2, developer3, project1, project2, task1, task2, task3, task4 });
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
