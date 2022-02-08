import { TInitialFormSchema } from '@/ui/Home/InitialForm/initialFormSchema.zod'
import { NextApiResponse } from 'next'
import { TExtendedNextApiRequest } from './users'

export type TSummaryResponseData = Partial<{
  count: number
  averageAge: number
  message: string
  error: string
}>

const findAge = (dob: Date) => {
  const now = new Date()
  const age = now.getFullYear() - dob.getFullYear()

  return age
}

const findAverageAge = (ages: number[]) => {
  if (ages.length === 0 || ages.every((v) => v === null)) return 0

  const sum = ages.reduce((a, b) => a + b, 0)
  const avg = sum / ages.length

  return avg
}

export default async function usersHandler(
  req: TExtendedNextApiRequest<TInitialFormSchema>,
  res: NextApiResponse<TSummaryResponseData>
) {
  const { method } = req

  if (method !== 'GET') res.status(405).json({ error: 'Method Not Allowed' })

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    const agesArr = users
      .map((user) => (user.dob ? findAge(user.dob) : 0))
      .filter((value) => value >= 0)

    res.status(200).json({
      averageAge: findAverageAge(agesArr),
      count: users.length,
    })
  } catch (error) {
    const showError = error as Error

    res.status(500).json({
      message: showError.message,
    })
  }
}
