import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const createToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
}

// Consolidate signup and login under the same POST request
export async function POST(req) {
  const { action, password, email, role, name } = await req.json(); // Destructure action from the request body
  
  if (action === 'signup') {
    // Handle signup
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
      const user = await prisma.User.create({
        data: { password: hashedPassword, email, role, name },
      });
      
      const token = createToken(user);
      return NextResponse.json({ data: { user, token } }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 400 });
    }
  } else if (action === 'login') {
    try {
      const user = await prisma.User.findUnique({ where: { email } });
      console.log(user, "user")
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
      }
      
      const token = createToken(user);
      console.log(token, "cc")
      return NextResponse.json({ data: { user, token } }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}

// GET request to fetch all users
export async function GET() {
  try {
    const users = await prisma.User.findMany();
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
