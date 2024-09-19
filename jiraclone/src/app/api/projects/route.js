import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
      const projects = await prisma.project.findMany({
        select: {
          name: true,
        },
      })
      const projectNames = projects.map(project => project.name);
      return NextResponse.json({data : projectNames}, {status: 200})
    } catch (error) {
      console.log(error)
      return NextResponse.json({error : 'Failed to fetch projects', error}, {status: 500})
    }
}

export async function POST(req) {
  try {
    const { name, managerId } = await req.json()
    if(!name || !managerId){
      return NextResponse.status(400).json({ error: 'Missing name or description or managerId'})
    }
    const project = await prisma.Project.create({
      data: { name, managerId },
    })
    return NextResponse.json({message : project}, {status: 201})
  } catch (error) {
    console.error('Error creating project:', error); 
    return NextResponse.json({error : error}, {status: 400})
  }
}
  