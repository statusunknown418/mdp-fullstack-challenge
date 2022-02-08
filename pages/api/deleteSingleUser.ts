import { NextApiResponse } from 'next'
import { TExtendedNextApiRequest } from './users'
import prisma from '@/db/prisma'
import { TInitialFormSchema } from '@/ui/Home/InitialForm/initialFormSchema.zod'

export type TDeleteSingleUser = {
  id: string
}

export type TDeleteSingleUserResponse = {
  error?: string
  deleted?: TDeleteSingleUser | TInitialFormSchema
}

export default async function usersHandler(
  req: TExtendedNextApiRequest<TDeleteSingleUser>,
  res: NextApiResponse<TDeleteSingleUserResponse>
) {
  const { body, method } = req

  if (method !== 'POST') {
    res.status(405).end().json({ error: 'Method Not Allowed' })
  }

  if (!body || Object.keys(body).length === 0 || !body.id) {
    res.status(400).end().json({ error: 'Unprocessable Entity' })
  }

  try {
    const { id } = body

    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    })
    res.status(200).json({ deleted: deletedUser })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
