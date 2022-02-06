import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { initialFormSchema, TInitialFormSchema } from './initialFormSchema.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '../../__shared__/RadixPrimitives/Label'
import { Fieldset } from '../../__shared__/Fieldset'
import { Button } from '@/ui/__shared__/Button'
import { useOperations } from '@/utils/useOperations'
import toast from 'react-hot-toast'

export const InitialForm: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInitialFormSchema>({
    resolver: zodResolver(initialFormSchema),
  })

  const { error, executor, isLoading } = useOperations()

  const saveUser = async (formData: TInitialFormSchema) => {
    const { dob } = formData

    const isDobValid =
      new Date(dob) < new Date() &&
      new Date(dob).getFullYear() > 1900 &&
      new Date(dob).getFullYear() < new Date().getFullYear() - 10

    if (!isDobValid) {
      toast.error('Invalid date of birth')
      return
    }

    const data = await executor('/api/hello', formData)
    data && !error && toast.success('Submitted successfully')
  }

  const onSubmit = handleSubmit(saveUser)

  return (
    <form onSubmit={onSubmit} className="grid place-content-center">
      <div className="grid grid-cols-1 gap-4 max-w-4xl">
        <Fieldset
          Label={<Label htmlFor="name" title="Name" />}
          RenderElement={
            <>
              <input {...register('name')} type="text" className="custom-input" id="name" />
              {errors.name && <span className="text-xs text-red-500">* {errors.name.message}</span>}
            </>
          }
        />

        <Fieldset
          Label={<Label htmlFor="email" title="Email" />}
          RenderElement={
            <>
              <input {...register('lastName')} className="custom-input" id="lastName" />
              {errors.lastName && (
                <span className="text-xs text-red-500">{errors.lastName?.message}</span>
              )}
            </>
          }
        />

        <Fieldset
          Label={<Label htmlFor="dob" title="Date of birth" />}
          RenderElement={
            <>
              <input {...register('dob')} className="custom-input" type="date" />
              {errors.dob && <span className="text-xs text-red-500">{errors.dob?.message}</span>}
            </>
          }
        />

        <span>{errors.name?.message}</span>
        <Button designation="primary" title="Submit" type="submit" disabled={isLoading} />

        {error && <span className="text-xs text-red-500">{error.message}</span>}
      </div>
    </form>
  )
}
