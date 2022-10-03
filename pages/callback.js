import { useEffect } from "react"
import { useRouter } from 'next/router'
import { useSession } from "../context/session/SessionContext";
import queryString from 'query-string'

export default function CallbackPage()  {
  const router = useRouter();
  const { state: sessionState, dispatch } = useSession();
  console.log({ router })

  useEffect(() => {
    const hash = router.asPath.split('#')[1]
    if (hash) return handleLogin(hash)
  }, [router.asPath])

  useEffect(() => {
    const { state, access_token } = sessionState
    if (state && access_token) {
      router.push('/')
    }
  }, [sessionState, router])

  const handleLogin = (hash) => {
    const { access_token, state } = queryString.parse(hash)
    
    sessionStorage.setItem('access_token', access_token)
    sessionStorage.setItem('state', state)

    dispatch({
      type: "set",
      payload: {
      access_token,
      state
      }
    })
  }
  return (
    <div>Handling...</div>
  )
}