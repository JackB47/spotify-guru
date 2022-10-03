import { SessionProvider } from '../context/session/SessionContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
