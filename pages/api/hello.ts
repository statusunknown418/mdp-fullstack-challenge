// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TInitialFormSchema } from '@/ui/Home/InitialForm/initialFormSchema.zod'
import type { NextApiRequest, NextApiResponse } from 'next'

type TExtendedNextApiRequest<T> = Omit<NextApiRequest, 'body'> & {
  body: T
}

export default function handler(
  req: TExtendedNextApiRequest<TInitialFormSchema>,
  res: NextApiResponse
) {
  const users = [
    {
      name: 'someone',
      lastName: 'random',
      dob: '2020-01-01',
    },
  ]

  const { body } = req

  const isValidBody = Object.values(body).every((x) => x && x !== '')

  if (!isValidBody) {
    res.status(400).json({
      message: 'Unprocessable Entity',
    })
  }

  if (req.method === 'POST') {
    users.push({
      name: body['name'],
      lastName: body.lastName,
      dob: body.dob,
    })

    res.status(200).json(users)
  }

  if (req.method === 'GET') {
    res.status(200).json(users)
  }
}
