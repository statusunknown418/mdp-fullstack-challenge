import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { NextPage } from 'next'

export type TSingleTabProps = {
  className?: string
}

export const SingleTab: NextPage<TSingleTabProps> = ({ children, className }) => {
  return (
    <Tab
      className={({ selected }) =>
        clsx(
          'min-h-full w-full py-2.5 text-sm leading-5 font-medium rounded-primary capitalize',
          'focus:outline-none focus:ring-2 ring-offset-1 ring-white ring-opacity-60 transition-colors duration-200',
          selected ? 'bg-white text-black shadow-lg' : 'hover:bg-white/[0.12]',
          className
        )
      }
    >
      {children}
    </Tab>
  )
}
