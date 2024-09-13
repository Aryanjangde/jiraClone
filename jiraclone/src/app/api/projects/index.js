import prisma from '../../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const projects = await prisma.project.findMany()
      res.status(200).json(projects)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch projects' })
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description } = req.body
      const project = await prisma.project.create({
        data: { name, description },
      })
      res.status(201).json(project)
    } catch (error) {
      res.status(400).json({ error: 'Failed to create project' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}