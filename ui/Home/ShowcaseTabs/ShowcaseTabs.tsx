import { Tabs } from '@/ui/__shared__/HeadlessUIPrimitives/Tabs'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { NextPage } from 'next'

export type TShowcaseTabsProps = {
  keys: string[]
}

export const ShowcaseTabs: NextPage<TShowcaseTabsProps> = ({ keys }) => {
  return (
    <div>
      <Tabs>
        {keys.map((key) => (
          <Tab
            key={key}
            className={({ selected }) =>
              clsx(
                'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                selected
                  ? 'bg-white shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            {key}
          </Tab>
        ))}
      </Tabs>
    </div>
  )
}
