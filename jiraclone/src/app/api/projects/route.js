import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
      const projects = await prisma.project.findMany()
      return NextResponse.json({message : projects}, {status: 200})
    } catch (error) {
      return NextResponse.json({error : 'Failed to fetch projects', error}, {status: 500})
    }
}

export async function POST(req) {
  try {
    const { name, description, managerId } = req.json()
    if(!name || !description || !managerId){
      return NextResponse.status(400).json({ error: 'Missing name or description or managerId'})
    }
    const project = await prisma.project.create({
      data: { name, description, managerId },
    })
    return NextResponse.json({message : project}, {status: 201})
  } catch (error) {
    return NextResponse.json({error : 'Failed to create project'}, {status: 400})
  }
}
  