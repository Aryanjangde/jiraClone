import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

// GET request to fetch all project names
export async function GET() {
  try {
    const projects = await prisma.Project.findMany({
      select: {
        name: true,
      },
    });
    const projectNames = projects.map(project => project.name);
    return NextResponse.json({ data: projectNames }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error); // Added more specific logging
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST request to create a new project
export async function POST(req) {
  try {
    const { name, managerId } = await req.json();
    if (!name || !managerId) {
      return NextResponse.json({ error: 'Missing name or managerId' }, { status: 400 }); // Adjusted error message
    }

    const project = await prisma.Project.create({
      data: { name, managerId },
    });
    return NextResponse.json({ message: 'Project created successfully', project }, { status: 201 }); // Clarified success message
  } catch (error) {
    console.error('Error creating project:', error); 
    return NextResponse.json({ error: 'Failed to create project', details: error.message }, { status: 500 }); // Improved error response
  }
}
