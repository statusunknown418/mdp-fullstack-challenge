import clsx from 'clsx'
import { NextPage } from 'next'
import { ReactNode } from 'react'

export type TFieldsetProps = {
  vertical?: boolean
  RenderElement: ReactNode
  Label: ReactNode
}

export const Fieldset: NextPage<TFieldsetProps> = ({ vertical, RenderElement, Label }) => {
  return (
    <fieldset
      className={clsx(
        vertical ? 'grid grid-cols-1 gap-3' : 'sm:grid sm:grid-cols-2 sm:max-w-md items-center',
        ['grid grid-cols-1 gap-2']
      )}
    >
      <div>{Label}</div>
      <div>{RenderElement}</div>
    </fieldset>
  )
}
