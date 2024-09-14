import prisma from '../../../../lib/prisma'
export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' })
      }
    } else if (req.method === 'POST') {
      try {
        const { name, email, role } = req.body
        const user = await prisma.user.create({
          data: { name, email, role },
        })
        res.status(201).json(user)
      } catch (error) {
        res.status(400).json({ error: 'Failed to create user' })
      }
    } else {p
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}