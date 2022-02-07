import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: '9999px',
            backgroundColor: '#27272a',
            border: '1px solid #52525b',
            color: '#fff',
          },
        }}
        position="bottom-center"
      />
    </>
  )
}

export default MyApp
