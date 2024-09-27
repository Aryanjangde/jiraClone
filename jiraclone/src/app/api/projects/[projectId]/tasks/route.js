import prisma from '../../../../../../lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// const customPriority = {CRITICAL:1, HIGH:2, MEDIUM:3, LOW:4}

const customPriorityOrder = { CRITICAL: 1, HIGH: 2, MEDIUM: 3, LOW: 4 };

export async function GET(req, { params }) {
  const { projectId } = params;
  const sort = req.nextUrl.searchParams.get('sort');  // Correctly accessing the sort parameter

  // console.log(sort, "sorting");      

  if (!projectId) {
    return NextResponse.json({ error: "projectId Not Given" }, { status: 400 });
  }

  try {
    // Fetch tasks
    const tasks = await prisma.Task.findMany({
      where: { projectId: Number(projectId) },
      orderBy: sort ? { [sort]: 'asc' } : undefined
    });

    // Apply custom sorting for priority if no other sorting is requested
    if (!sort || sort === 'priority') {
      tasks.sort((a, b) => {
        return customPriorityOrder[a.priority] - customPriorityOrder[b.priority];
      });
    }

    return NextResponse.json({ data: tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(req, {params}){
  const { projectId } = params 
  if(!projectId){ return NextResponse.json({"error" : "projectId Not Given"}, {status: 400})}
  try {
    const { title, description, deadline, status,taskType,priority, assignees } = await req.json()
    console.log({ title, description, deadline, status,taskType,priority, assignees })
    if(!title || !description || !status ||  !deadline ||
    !taskType || !priority || !assignees ){
        return NextResponse.json({"error" : "All Fields are neccessary"}, {status: 400})
    }
    const task = await prisma.Task.create({
        data: {
          title,
          description,
          deadline,
          projectId: Number(projectId),
          status,
          taskType,
          priority,
          createdAt: new Date().toISOString(),
          assignees: {
            connect: assignees.map(id => ({ id })) // Convert array of IDs to array of objects with id
          }
        }
      })
      
    
    return NextResponse.json({"message" : "success"}, {status: 201})
  } catch (error) {
    console.log(error)
    return NextResponse.json({"error" : error}, {status: 400})
  }
}

