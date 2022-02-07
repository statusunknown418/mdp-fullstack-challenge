import { Tabs } from '@/ui/__shared__/HeadlessUIPrimitives'
import { SinglePanel } from '@/ui/__shared__/HeadlessUIPrimitives/SinglePanel'
import { SingleTab } from '@/ui/__shared__/HeadlessUIPrimitives/SingleTab'
import { ScrollArea } from '@/ui/__shared__/RadixPrimitives/ScrollArea'
import { fetcher } from '@/utils/fetcher'
import { NextPage } from 'next'
import useSWR from 'swr'
import { InitialForm } from '../InitialForm'
import { TInitialFormSchema } from '../InitialForm/initialFormSchema.zod'

export type TShowcaseTabsProps = {
  keys: string[]
}

export type TExtendedInitialFormSchema = TInitialFormSchema & {
  id: string
}

export const ShowcaseTabs: NextPage<TShowcaseTabsProps> = ({ keys }) => {
  const { data } = useSWR<TExtendedInitialFormSchema[]>('/api/users', fetcher)

  return (
    <div>
      <Tabs
        List={keys.map((key) => (
          <SingleTab key={key}>{key}</SingleTab>
        ))}
      >
        <SinglePanel>
          <InitialForm />
        </SinglePanel>

        <SinglePanel>
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">This is updated in realtime!</h2>

            <ScrollArea>
              {data &&
                data.map((d) => (
                  <div
                    key={d.id}
                    className="flex gap-2 items-center justify-between px-2 py-1 border-b border-border-primary w-full"
                  >
                    <p>{d.name}</p>
                    <p>{d.lastName}</p>
                    <p>{d.dob}</p>
                  </div>
                ))}
            </ScrollArea>
          </div>
        </SinglePanel>
      </Tabs>
    </div>
  )
}
