import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { taskId } = params;
    if (!taskId) {
        return NextResponse.json({ error: "task Id not given" }, { status: 400 });
    }
    try {
        const taskData = await prisma.Task.findUnique({
            select: {
                title: true,
                description: true,
                projectId: true,
                status: true,
                taskType: true,
                priority: true,
                createdAt: true,
                deadline: true,
                assignees: true
            },
            where: {
                id: Number(taskId)
            }
        });

        return NextResponse.json({ data: taskData }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 }); // Return error message
    }
}

export async function POST(req, { params }) {
    const { taskId } = params;
    const { newStatus } = await req.json();

    if (!taskId) {
        return NextResponse.json({ error: "task Id not given" }, { status: 400 });
    }
    if (!newStatus) {
        return NextResponse.json({ error: "newStatus not given" }, { status: 400 });
    }
    try {
        const updateStatus = await prisma.Task.update({
            where: {
                id: Number(taskId)
            },
            data: {
                status: newStatus
            }
        });
        return NextResponse.json({ message: "successfully updated status" }, { status: 201 }); // Use json method correctly
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 }); // Return error message
    }
}
export async function DELETE(req, {params}){
    const {taskId} = params;

    if(!taskId){
        return NextResponse.json({ error: "task Id not given" }, { status: 400 });
    }
    try{
        const updateStatus = await prisma.Task.delete({
            where: {
                id: Number(taskId)
            }
        });
        return NextResponse.json({ message: "successfully deleted status" }, { status: 200 });

    }catch(err){
        return NextResponse.json({ error: err.message }, { status: 500 });
    }

}
