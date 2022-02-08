import { TSummaryResponseData } from '@/pages/api/summary'
import { Button } from '@/ui/__shared__/Button'
import { ErrorMessage } from '@/ui/__shared__/ErrorMessage'
import { Tabs } from '@/ui/__shared__/HeadlessUIPrimitives/Tabs'
import { SinglePanel } from '@/ui/__shared__/HeadlessUIPrimitives/Tabs/SinglePanel'
import { SingleTab } from '@/ui/__shared__/HeadlessUIPrimitives/Tabs/SingleTab'
import { ScrollArea } from '@/ui/__shared__/RadixPrimitives/ScrollArea'
import { fetcher } from '@/utils/fetcher'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { InitialForm } from '../InitialForm'
import { TInitialFormSchema } from '../InitialForm/initialFormSchema.zod'
import { DataSummary } from './Panels/DataSummary'

export type TShowcaseTabsProps = {
  keys: string[]
}

export type TExtendedInitialFormSchema = TInitialFormSchema & {
  id: string
}

export const ShowcaseTabs: NextPage<TShowcaseTabsProps> = ({ keys }) => {
  const { data, error } = useSWR<TExtendedInitialFormSchema[]>('/api/users', fetcher)
  const { data: average, error: summaryError } = useSWR<TSummaryResponseData>(
    '/api/summary',
    fetcher
  )

  const [dataFilterBy, setDataFilterBy] = useState(data)

  useEffect(() => {
    setDataFilterBy(data)
  }, [data])

  const handleShowValidUsers = () => {
    if (!data) return

    setDataFilterBy(data.filter((element) => element.dob && element.name && element.lastName))
  }

  const handleResetFilter = () => {
    if (!data) return
    setDataFilterBy(data)
  }

  return (
    <div>
      <Tabs
        List={keys.map((key, idx) => (
          <SingleTab key={idx}>{key}</SingleTab>
        ))}
      >
        <SinglePanel>
          <InitialForm />
        </SinglePanel>

        <SinglePanel>
          <div className="flex flex-col gap-8">
            <section className="flex flex-col items-center gap-4 sm:flex-row sm:gap-3">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-extrabold">This is updated in realtime!</h2>
                <p className="font-light">
                  Valid clients are those with all of its info completed.
                </p>
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <Button
                  designation="primary"
                  title="valid clients"
                  onClick={handleShowValidUsers}
                />

                <Button title="reset" designation="secondary" onClick={handleResetFilter} />
              </div>
            </section>

            <section className="flex flex-col gap-2">
              <div className="w-full grid grid-cols-3 text-center place-items-center font-semibold text-green-500 border border-border-primary p-2 rounded-primary">
                <span>Name</span>
                <span>Last Name</span>
                <span>Date of Birth</span>
              </div>

              <ScrollArea>
                {error && <ErrorMessage title="Oops, there was a server error" />}

                {dataFilterBy?.length === 0 && (
                  <p className="text-center italic font-semibold mt-5">No users yet!</p>
                )}
                {dataFilterBy &&
                  dataFilterBy.map((user) => (
                    <div
                      key={user.id}
                      className="relative grid grid-cols-3 place-items-center text-center px-2 py-1 border-b border-border-primary w-full"
                    >
                      <p className="w-full">
                        {user.name || (
                          <span className="italic text-zinc-500 capitalize">no name</span>
                        )}
                      </p>
                      <p className="w-full">
                        {user.lastName || (
                          <span className="italic text-zinc-500 capitalize">no last name</span>
                        )}
                      </p>
                      <p className="w-full">
                        {user.dob ? (
                          new Date(user.dob).toISOString().split('T')[0]
                        ) : (
                          <span className="italic text-zinc-500 capitalize">no date of birth</span>
                        )}
                      </p>
                    </div>
                  ))}
              </ScrollArea>
            </section>
          </div>
        </SinglePanel>

        <SinglePanel>
          <DataSummary average={average?.averageAge} count={average?.count} error={summaryError} />
        </SinglePanel>
      </Tabs>
    </div>
  )
}
