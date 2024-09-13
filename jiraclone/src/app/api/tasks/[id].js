import prisma from '../../../../lib/prisma'
export default async function handler(req, res) {
    const { id } = req.query
  
    if (req.method === 'GET') {
      try {
        const task = await prisma.task.findUnique({
          where: { id },
          include: { project: true, assignee: true },
        })
        if (task) {
          res.status(200).json(task)
        } else {
          res.status(404).json({ error: 'Task not found' })
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch task' })
      }
    } else if (req.method === 'PUT') {
      try {
        const { title, description, status, assigneeId } = req.body
        const updatedTask = await prisma.task.update({
          where: { id },
          data: { title, description, status, assigneeId },
        })
        res.status(200).json(updatedTask)
      } catch (error) {
        res.status(400).json({ error: 'Failed to update task' })
      }
    } else {
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
  