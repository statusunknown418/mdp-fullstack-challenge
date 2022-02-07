import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils'
import { TInitialFormSchema } from '@/ui/Home/InitialForm/initialFormSchema.zod'
import prisma from '@/db/prisma'

export type TExtendedNextApiRequest<T> = Omit<NextApiRequest, 'body'> & {
  body: T
}

export default async function usersHandler(
  req: TExtendedNextApiRequest<TInitialFormSchema>,
  res: NextApiResponse
) {
  const { body, method } = req

  if (method === 'POST') {
    if (!body || Object.keys(body).length === 0)
      res.status(400).end().json({ error: 'Unprocessable Entity' })

    try {
      const newUser = await prisma.user.create({
        data: {
          name: body.name,
          lastName: body.lastName,
          dob: new Date(body.dob),
          createdAt: new Date(),
        },
      })

      res.status(200).json({ created: newUser })
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
      })
    }
  }

  if (method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      })

      res.status(200).json(users)
    } catch (error) {
      const showError = error as Error

      res.status(500).json({
        message: showError.message,
      })
    }
  }
}
