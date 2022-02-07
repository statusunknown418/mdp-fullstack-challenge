import { Tab } from '@headlessui/react'
import { NextPage } from 'next'

export const Tabs: NextPage = ({ children }) => {
  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>{children}</Tab.Group>
    </div>
  )
}
