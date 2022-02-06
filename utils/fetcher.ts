export const fetcher = async <TResponse>(
  url: string,
  payload?: Record<string, unknown>
): Promise<TResponse[]> => {
  const data = await fetch(`${url}`, {
    method: payload ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(payload && { body: JSON.stringify(payload) }),
  })
  return await data.json()
}
