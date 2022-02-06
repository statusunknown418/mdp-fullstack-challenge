export const fetcher = async <T>(url: string, payload?: string): Promise<T> => {
  const data = await fetch(`${url}`, {
    method: payload ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(payload && { body: payload }),
  })
  return await data.json()
}
