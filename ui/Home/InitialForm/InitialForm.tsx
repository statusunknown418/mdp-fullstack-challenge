import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { initialFormSchema, TInitialFormSchema } from './initialFormSchema.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '../__shared__/RadixPrimitives/Label'
import { Fieldset } from '../__shared__/Fieldset'

export const InitialForm: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInitialFormSchema>({
    resolver: zodResolver(initialFormSchema),
  })

  const saveUser = (data: TInitialFormSchema) => {
    console.log({ data })
  }

  const onSubmit = handleSubmit(saveUser)

  return (
    <form onSubmit={onSubmit} className="grid place-content-center">
      <div className="grid grid-cols-1 gap-4 max-w-4xl">
        <Fieldset
          Label={<Label htmlFor="name" title="Name" />}
          RenderElement={
            <>
              <input
                {...register('name')}
                type="text"
                className="bg-bg-secondary rounded-primary px-3 py-1 border border-border-primary"
                id="name"
              />
              {errors.name && <span className="text-xs text-red-500">* {errors.name.message}</span>}
            </>
          }
        />

        <Fieldset
          Label={<Label htmlFor="email" title="Email" />}
          RenderElement={
            <>
              <input
                {...register('lastName')}
                className="bg-bg-secondary rounded-primary px-3 py-1 border border-border-primary"
                id="lastName"
              />
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
              <input
                {...register('dob')}
                className="bg-bg-secondary rounded-primary px-3 py-1 border border-border-primary"
                type="date"
              />
              {errors.dob && <span className="text-xs text-red-500">{errors.dob?.message}</span>}
            </>
          }
        />

        <button type="submit" className="bg-white px-2 py-1 text-black font-medium rounded-primary">
          Add user
        </button>
      </div>
    </form>
  )
}
