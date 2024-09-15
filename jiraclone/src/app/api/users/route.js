import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(){
  try {
    const users = await prisma.user.findMany()
    NextResponse.json({data : users}, {status: 200})
  } catch (error) {
    NextResponse.json({ error: 'Failed to fetch users' }, {status: 500})
  }
}

export async function POST(){
  try {
    const { name, email, role } = await req.json()
    const user = await prisma.user.create({
      data: { name, email, role },
    })
    NextResponse.json({data : user}, {status: 201})
  } catch (error) {
    NextResponse.json({ error: 'Failed to create user' }, {status: 400})
  }
}
