import { z } from 'zod'

export const initialFormSchema = z
  .object({
    name: z.string(),
    lastName: z.string(),
    dob: z
      .string({ invalid_type_error: 'Please enter a valid date of birth' })
      .regex(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/),
  })
  .refine((data) => data.name || data.lastName || data.dob, {
    message: 'Please enter either field',
    path: ['name'],
  })

export type TInitialFormSchema = z.infer<typeof initialFormSchema>
