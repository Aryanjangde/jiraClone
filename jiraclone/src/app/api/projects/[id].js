import prisma from '../../../../lib/prisma'

export default async function handler(req, res) {
    const { id } = req.params
  
    if (req.method === 'GET') {
      try {
        const project = await prisma.project.findUnique({
          where: { id },
          include: { tasks: true },
        })
        if (project) {
          res.status(200).json(project)
        } else {
          res.status(404).json({ error: 'Project not found' })
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch project' })
      }
    } else {
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }