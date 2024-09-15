import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const task = await prisma.task.findUnique({
      where: { id },
      include: { project: true, assignee: true },
    });

    if (task) {
      return NextResponse.json(task);
    } else {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { title, description, status, assigneeId } = await request.json();

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, description, status, assigneeId },
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 400 });
  }
}