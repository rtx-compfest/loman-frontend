import {createContext, useContext, useEffect, useState} from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
  const [userData, setUserData] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Call api for getting user data
  }, [])

  const value = {
    userData,
    setUserData,
    isLoggedIn,
    setIsLoggedIn,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
