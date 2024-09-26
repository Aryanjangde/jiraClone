// src/app/api/tasks/[status]/route.js
import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { status } = params;

  try {
    const tasks = await prisma.task.findMany({
      where: { status },
      orderBy: [
        {
        priority: {
          sort: ['CRITICAL','HIGH', 'MEDIUM', 'LOW'],
        }},
        // { title: 'asc' },
        // { createdAt: 'desc' },
        { deadline: 'asc'}
      ],
      include: { project: true, assignee: true },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}
