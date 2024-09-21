const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create Users
  const manager = await prisma.user.create({
    data: {
      email: 'managvverbvvvb@example.com',
      name: 'John Manager',
      role: 'MANAGER',  // Role is MANAGER
    },
  });

  const developer1 = await prisma.user.create({
    data: {
      email: 'dev1vvvvvff@example.com',
      name: 'Alice Developer',
      role: 'DEVELOPER', // Role is DEVELOPER (default)
    },
  });

  const developer2 = await prisma.user.create({
    data: {
      email: 'devvvvvvff2@example.com',
      name: 'Bob Developer',
      role: 'DEVELOPER',
    },
  });

  // Create Project
  const project1 = await prisma.project.create({
    data: {
      name: 'Project Alpha',
      manager: {
        connect: { id: manager.id }, // Connect project to the manager
      },
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: 'Project Beta',
      manager: {
        connect: { id: manager.id }, // Connect another project to the same manager
      },
    },
  });

  // Create Tasks for Project Alpha
  const task1 = await prisma.task.create({
    data: {
      title: 'Design Database',
      description: 'Design the initial database schema',
      project: {
        connect: { id: project1.id },
      },
      assignees: {
        connect: { id: developer1.id },
      },
      status: 'TODO',
      deadline: new Date('2024-12-09T00:00:00Z'),
    },
  });
  
  const task2 = await prisma.task.create({
    data: {
      title: 'Build API',
      description: 'Develop REST API for the project',
      project: {
        connect: { id: project1.id },
      },
      assignees: {
        connect: { id: developer2.id },
      },
      status: 'IN_PROGRESS',
      deadline: new Date('2024-12-09T00:00:00Z'),
    },
  });
  
  const task3 = await prisma.task.create({
    data: {
      title: 'Frontend Design',
      description: 'Design the frontend of the project',
      project: {
        connect: { id: project2.id },
      },
      assignees: {
        connect: { id: developer1.id },
      },
      status: 'DONE',
      deadline: new Date('2024-12-09T00:00:00Z'),
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
