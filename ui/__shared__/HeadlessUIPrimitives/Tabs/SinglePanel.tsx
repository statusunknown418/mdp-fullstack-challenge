import { Tab } from '@headlessui/react'
import { NextPage } from 'next'

export const SinglePanel: NextPage = ({ children }) => {
  return (
    <Tab.Panel className="w-full border border-border-primary p-5 rounded-lg shadow-xl shadow-indigo-900/40">
      {children}
    </Tab.Panel>
  )
}
