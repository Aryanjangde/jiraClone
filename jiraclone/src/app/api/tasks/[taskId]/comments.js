import prisma from '../../../../lib/prisma'
export default async function handler(req, res) {
    const { taskId } = req.params
  
    if (req.method === 'GET') {
      try {
        const comments = await prisma.comment.findMany({
          where: { taskId },
          include: { user: true },
        })
        res.status(200).json(comments)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' })
      }
    } else if (req.method === 'POST') {
      try {
        const { content, userId } = req.body
        const comment = await prisma.comment.create({
          data: { 
            content, 
            taskId,
            userId,
          },
          include: { user: true },
        })
        res.status(201).json(comment)
      } catch (error) {
        res.status(400).json({ error: 'Failed to create comment' })
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }