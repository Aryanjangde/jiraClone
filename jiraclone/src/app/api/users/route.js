import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { error } from 'console';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const createToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
}

export async function POST(req) {
  const { action, password, email,  name,role } = await req.json(); 
  if (action === 'signup') {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
      const user = await prisma.user.create({
        data: { password: hashedPassword, email, role, name },
      });
      
      return NextResponse.json({ data: { user } }, { status: 201 });
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: 'user already exists!!!' }, { status: 400 });
    }
  } else if (action === 'login') {
    try {
      const user = await prisma.User.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return NextResponse.json({ error: 'Wrong password!!!' }, { status: 401 });
      }
      if(email !== user.email){
        return NextResponse.json({ error: 'email does not match' }, { status: 401 });
      }
      if(name !== user.name){
        return NextResponse.json({error: "name does not match"}, {status: 401})
      }      
      const token = createToken(user);
      return NextResponse.json({user, token }, { status: 200 });
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}

export async function GET(req) {
  const { search } = req.query;  // Get the search query from the URL
  
  try {
    let users;
    
    if (search) {
      // If there's a search query, find users by name or ID
      users = await prisma.User.findMany({
        where: {
          OR: [
            {
              id: parseInt(search, 10),
            },
            {
              name: {
                contains: search, // Search by name containing the string
                mode: 'insensitive', // Case insensitive search
              },
            },
          ],
        },
      });
    } else {
      // If no search query, return all users
      users = await prisma.User.findMany();
    }

    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

