import { Tab } from '@headlessui/react'
import { NextPage } from 'next'

export interface ITabsProps {
  List: JSX.Element[] | JSX.Element
}

export const Tabs: NextPage<ITabsProps> = ({ children, List }) => {
  return (
    <div className="max-w-lg mx-auto flex flex-col gap-3">
      <Tab.Group>
        <Tab.List className="p-1.5 flex flex-col gap-2 sm:flex-row sm:items-center rounded-lg bg-white/10">
          {List}
        </Tab.List>

        <Tab.Panels className="w-full h-full">{children}</Tab.Panels>
      </Tab.Group>
    </div>
  )
}
