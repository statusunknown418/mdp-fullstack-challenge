import { Tab } from '@headlessui/react'
import { NextPage } from 'next'

export const Tabs: NextPage = ({ children }) => {
  return (
    <div className="p-1 w-full max-w-md flex flex-col gap-2 md:flex md:items-center md:justify-between rounded-primary bg-white/10">
      <Tab.Group>{children}</Tab.Group>
    </div>
  )
}
