import clsx from 'clsx'
import { NextPage } from 'next'
import { ReactNode } from 'react'

export type TFieldsetProps = {
  vertical?: boolean
  RenderElement: ReactNode
  Label: ReactNode
}

export const Fieldset: NextPage<TFieldsetProps> = ({ vertical, RenderElement: Input, Label }) => {
  return (
    <fieldset
      className={clsx(vertical ? 'grid grid-cols-1 gap-3' : 'sm:grid sm:grid-cols-2 sm:max-w-md', [
        'grid grid-cols-1 gap-2',
      ])}
    >
      <div className="flex flex-col gap-2">{Label}</div>
      <div className="flex flex-col gap-2">{Input}</div>
    </fieldset>
  )
}
