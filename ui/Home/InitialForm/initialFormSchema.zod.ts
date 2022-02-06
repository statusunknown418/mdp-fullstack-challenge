import { z } from 'zod'

export const initialFormSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  lastName: z.string().nonempty({ message: 'Last name is required' }),
  dob: z
    .string({ required_error: 'Please enter a valid date of birth' })
    .regex(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)
    .nonempty({ message: 'Date of birth is required' }),
})

export type TInitialFormSchema = z.infer<typeof initialFormSchema>
