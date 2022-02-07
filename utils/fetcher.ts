export const fetcher = async (url: string, payload?: Record<string, unknown>) => {
  const data = await fetch(`${url}`, {
    method: payload ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(payload && { body: JSON.stringify(payload) }),
  })
  return await data.json()
}
