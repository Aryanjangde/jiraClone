import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req){
    const { projectId } = req.params 
    try {
      const tasks = await prisma.task.findMany({
        where: { projectId },
      })
      NextResponse.json({data: tasks}, {status: 200})
    } catch (error) {
      NextResponse.json({error: error}, {status: 500})
    }
}

export async function POST(req){
  try {
    const { title, description, status, assigneeId } = await req.json()
    const task = await prisma.task.create({
      data: { 
        title, 
        description, 
        status, 
        assigneeId,
        projectId,
      },
    })
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' })
  }
}

