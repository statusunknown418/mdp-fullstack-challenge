import { NextPage } from 'next'

export type TErrorMessageProps = {
  title: string
}

export const ErrorMessage: NextPage<TErrorMessageProps> = ({ title }) => {
  return <p className="font-semibold text-red-600 italic text-center">{title}</p>
}
