import prisma from '../../../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req, {params}){
    const { projectId } = params 
    if(!projectId){ return  NextResponse.json({"error" : "projectId Not Given"}, {status: 400})}
    try {
      const tasks = await prisma.task.findMany({
        where: {projectId: Number(projectId) },
      })
      return  NextResponse.json({data: tasks}, {status: 200})
    } catch (error) {
      return NextResponse.json({error: error}, {status: 500})
    }
}

export async function POST(req, {params}){
  const { projectId } = params 
  if(!projectId){ return NextResponse.json({"error" : "projectId Not Given"}, {status: 400})}
  try {
    const { title, description, status,taskType,priority, assignees } = await req.json()
    if(!title || !description || !status || 
    !taskType || !priority || !assignees ){
        return NextResponse.json({"error" : "All Fields are neccessary"}, {status: 200})
    }
    const task = await prisma.task.create({
        data: {
          title,
          description,
          projectId: Number(projectId), // Ensure this is an integer
          status,
          taskType,
          userId:0,
          priority,
          createdAt: new Date(), // Optional, if you want to explicitly set the createdAt timestamp
          assignees: {
            connect: assignees.map(id => ({ id })) // Convert array of IDs to array of objects with id
          }
        }
      })
      
    
    return NextResponse.json({"data" : task}, {status: 201})
  } catch (error) {
    console.log(error)
    return NextResponse.json({"error" : error}, {status: 400})
  }
}
