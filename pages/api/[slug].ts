import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query

  if (typeof slug !== 'string') {
    res.status(400).send('Invalid slug')
    return
  }

  const shortLink = await prisma.shortLink.findFirst({
    where: { slug: { equals: slug } },
  })
  if (!shortLink) {
    res.status(404).send('Slug not found')
    return
  }

  res.redirect(301, shortLink.url)
}
