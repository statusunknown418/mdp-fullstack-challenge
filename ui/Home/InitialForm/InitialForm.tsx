import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { initialFormSchema, TInitialFormSchema } from './initialFormSchema.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '../../__shared__/RadixPrimitives/Label'
import { Fieldset } from '../../__shared__/Fieldset'
import { Button } from '@/ui/__shared__/Button'
import { useOperations } from '@/utils/useOperations'
import toast from 'react-hot-toast'
import { useSWRConfig } from 'swr'

export const InitialForm: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInitialFormSchema>({
    resolver: zodResolver(initialFormSchema),
  })

  const { error, executor, isLoading } = useOperations()
  const { mutate } = useSWRConfig()

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

    await toast.promise(executor('/api/users', formData), {
      loading: 'Saving...',
      error: `There was an error ${error}`,
      success: 'User saved',
    })

    mutate('/api/users')
  }

  const onSubmit = handleSubmit(saveUser)

  return (
    <form onSubmit={onSubmit} className="grid place-content-center">
      <div className="grid grid-cols-1 gap-4">
        <Fieldset
          Label={<Label htmlFor="name" title="Name" />}
          RenderElement={
            <>
              <input {...register('name')} type="text" className="custom-input" id="name" />
            </>
          }
        />

        <Fieldset
          Label={<Label htmlFor="lastName" title="last name" />}
          RenderElement={
            <>
              <input {...register('lastName')} className="custom-input" id="lastName" />
            </>
          }
        />

        <Fieldset
          Label={<Label htmlFor="dob" title="Date of birth" />}
          RenderElement={
            <>
              <input {...register('dob')} className="custom-input" type="date" id="dob" />
              {errors.dob && <span className="text-xs text-red-500">{errors.dob?.message}</span>}
            </>
          }
        />

        {errors.name && <span className="text-xs text-red-500">{errors.name?.message}</span>}

        <Button designation="primary" title="add user" type="submit" disabled={isLoading} />
      </div>
    </form>
  )
}
