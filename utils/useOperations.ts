import { useMemo, useState } from 'react'
import { fetcher } from './fetcher'

export const useOperations = <TResponse>() => {
  const [response, setResponse] = useState<TResponse[]>([])
  const [error, setError] = useState<Error>()
  const [isLoading, setIsLoading] = useState(false)

  const executor = useMemo(
    () => async (url: string, payload: Record<string, unknown>) => {
      setIsLoading(true)
      try {
        const data = await fetcher<TResponse>(url, payload)
        setResponse(data)

        return data
      } catch (e) {
        setError(e as Error)
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return {
    response,
    error,
    isLoading,
    executor,
  }
}
