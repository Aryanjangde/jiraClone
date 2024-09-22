import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";
export async function GET(req, {params}){
    const {taskId} = params
    if(!taskId){
        return NextResponse.json({"error":"task Id not given"}, {status:400})
    }
    try{
        const taskData = await prisma.Task.findUnique({
            select: {
                title : true, 
                description: true,
                projectId: true,
                status: true,
                taskType: true, 
                priority: true,
                createdAt: true,
                deadline: true,
                assignees: true
            },
            where:{
                id : Number(taskId)
            }
        })

        return NextResponse.json({"data": taskData}, {status: 200} )
    }
    catch(error){
        console.log(error)
        return NextResponse.json({error},{status:500})
    }
}