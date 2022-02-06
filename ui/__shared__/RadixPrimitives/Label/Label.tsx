import * as LabelPrimitive from '@radix-ui/react-label'
import { NextPage } from 'next'

export type TLabelProps = {
  htmlFor: string
  title: string
}

export const Label: NextPage<TLabelProps> = ({ htmlFor, title }) => {
  return (
    <LabelPrimitive.Root htmlFor={htmlFor} className="text-sm font-semibold cursor-pointer">
      {title}
    </LabelPrimitive.Root>
  )
}
