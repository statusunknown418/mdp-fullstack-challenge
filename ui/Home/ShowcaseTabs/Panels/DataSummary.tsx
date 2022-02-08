import { ErrorMessage } from '@/ui/__shared__/ErrorMessage'
import { NextPage } from 'next'

export type TDataSummaryProps = {
  count?: number
  average?: number
  error?: string
}

export const DataSummary: NextPage<TDataSummaryProps> = ({ count, average, error }) => {
  return (
    <div className="flex flex-col items-center text-center gap-8 sm:flex-row sm:justify-evenly">
      {error ? (
        <ErrorMessage title="Oops, there was an error while finding the average" />
      ) : (
        <>
          <section className="flex flex-col gap-1 w-full">
            <h2 className="text-base font-bold">Average client age </h2>
            <span className="text-indigo-500 text-3xl font-black">
              {average?.toFixed(2)} <span className="text-sm">y/o</span>
            </span>
          </section>

          <section className="flex flex-col gap-1 w-full">
            <p className="text-base font-bold">Count</p>
            <p className="font-black text-green-600 text-3xl">
              {count} <span className="text-sm">clients</span>
            </p>
          </section>
        </>
      )}
    </div>
  )
}
