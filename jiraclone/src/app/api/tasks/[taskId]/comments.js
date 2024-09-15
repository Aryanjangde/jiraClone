import prisma from '../../../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { taskId } = params;

  try {
    const comments = await prisma.comment.findMany({
      where: { taskId },
      include: { user: true },
    });
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const { taskId } = params;

  try {
    const { content, userId } = await request.json();
    const comment = await prisma.comment.create({
      data: { 
        content, 
        taskId,
        userId,
      },
      include: { user: true },
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 400 });
  }
}