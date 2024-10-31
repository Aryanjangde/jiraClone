import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

import { NextResponse } from 'next/server';
export async function GET(request,{ params }) {
  const { id } = params;

  try {
    const project = await prisma.Project.findUnique({
      select: {name: true},
      where: { id },
      include: { tasks: true },
    });

    if (project) {
      return NextResponse.json({project},{status:200});
    } else {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}