import clsx from 'clsx'
import { NextPage } from 'next'
import Link from 'next/link'
import { Spinner } from './Spinner'

export type TButtonProps = {
  type?: 'submit' | 'button'
  designation: 'primary' | 'secondary' | 'link'
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  title: string
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  className?: string
}

export const Button: NextPage<TButtonProps> = ({
  type = 'button',
  disabled,
  onClick,
  designation,
  title,
  href,
  target,
  className,
}) => {
  return (
    <button
      className={clsx(
        'capitalize',
        'cursor-pointer',
        'flex items-center gap-5 justify-center px-2 py-1',
        disabled && 'cursor-not-allowed bg-gray-400',
        designation === 'primary' && [
          'bg-white text-black font-medium rounded-primary',
          'hover:bg-gray-300 transition-colors duration-150',
        ],
        designation === 'secondary' && [
          'bg-bg-secondary border border-border-primary rounded-primary',
          'hover:bg-zinc-700 hover:border-gray-500 transition-colors duration-150',
        ],
        designation === 'link' && [
          'flex items-center gap-5 justify-center text-base',
          'text-indigo-600 font-medium rounded-primary',
          'hover:text-indigo-400 transition-colors duration-150',
        ],
        className
      )}
      type={type}
      onClick={onClick}
    >
      {designation === 'link' ? (
        <Link href={href || ''}>
          <a className="font-bold underline underline-offset-2" target={target}>
            {title}
          </a>
        </Link>
      ) : (
        <>
          <span>{title}</span>

          {disabled && <Spinner className="text-indigo-800" />}
        </>
      )}
    </button>
  )
}
