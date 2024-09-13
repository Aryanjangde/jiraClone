import prisma from '../../../../lib/prisma'

export default async function handler(req, res) {
    const { projectId } = req.params 
  
    if (req.method === 'GET') {
      try {
        const tasks = await prisma.task.findMany({
          where: { projectId },
        })
        res.status(200).json(tasks)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' })
      }
    } else if (req.method === 'POST') {
      try {
        const { title, description, status, assigneeId } = req.body
        const task = await prisma.task.create({
          data: { 
            title, 
            description, 
            status, 
            assigneeId,
            projectId,
          },
        })
        res.status(201).json(task)
      } catch (error) {
        res.status(400).json({ error: 'Failed to create task' })
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }