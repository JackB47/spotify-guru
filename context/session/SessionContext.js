import { createContext, useContext, useReducer } from "react";

const SessionContext = createContext()

const SessionReducer = (state, action) => {
  switch (action.type) {
    case "set": {
      return {
        ...state,
        ...action.payload
      }
    }

    default: {
      throw new Error('Unhandled action type in Session Context')
    }
  }
}

const SessionProvider = ({ children }) => {
  const payload =
    typeof window !== 'undefined' ?
      {
        access_token: sessionStorage.getItem('access_token'),
        state: sessionStorage.getItem('state')
      }
    : { access_token: null, state: null }
  
  const [state, dispatch] = useReducer(SessionReducer, payload)

  const value = { state, dispatch }

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

const useSession = () => {
  const context = useContext(SessionContext);

  if (context === undefined) throw new Error("useSession must be within the scope of <SessionProvider />")
  return context;

}

export { SessionProvider, useSession }