import clsx from 'clsx'
import { NextPage } from 'next'
import { Spinner } from './Spinner'

export type TButtonProps = {
  type?: 'submit' | 'button'
  designation: 'primary' | 'secondary' | 'link'
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  title: string
}

export const Button: NextPage<TButtonProps> = ({
  type = 'button',
  disabled,
  onClick,
  designation,
  title,
}) => {
  return (
    <button
      className={clsx(
        designation === 'primary' && [
          'flex items-center gap-5 justify-center',
          'bg-white px-2 py-1 text-black font-medium rounded-primary',
          'hover:bg-gray-300 transition-colors duration-150',
        ]
      )}
      type={type}
      onClick={onClick}
    >
      <span>{title}</span>

      {disabled && <Spinner className="text-indigo-500" />}
    </button>
  )
}
