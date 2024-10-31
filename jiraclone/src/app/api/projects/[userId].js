import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'
export async function GET(request, {params}) {
    const {userId} = params
    const userProjects = await prisma.project.findMany({
        where: {
          OR: [
            {
              managerId: userId,
            },
            {
              tasks: {
                some: {
                  assignees: {
                    some: {
                      id: userId,
                    },
                  },
                },
              },
            },
          ],
        },
      });

    
}