import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import Cookies from 'js-cookie'
import decode from 'jwt-decode'

const URL = 'https://loman-backend.herokuapp.com'

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  const getUser = useCallback(() => {
    const token = getToken()
    if (token != null) {
      const user = decode(token)
      return user
    }

    return null
  }, [])

  useEffect(() => {
    // Call api for getting user data
    async function loadUserFromCookies() {
      const token = getToken()
      if (token) {
        console.log("Got a token in the cookies, let's see if it is valid")
        setUserData(getUser())
      }
      setLoading(false)
    }
    loadUserFromCookies()
  }, [getUser])

  const signUp = async (data) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await fetch(`${URL}/user/register`, options)

    console.log(res)

    const result = await res.json()

    if (result.status !== true) {
      throw new Error(result)
    }

    return await Promise.resolve(result)
  }

  const signIn = async (data) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await fetch(`${URL}/user/login`, options)

    /*
      Response value:

      result = {
        "status": true
        "message": "Login successful",
        "data": {
          "name": "donor",
          "email": "test@mail.com",
          "status_user": "1",
          "user_roles": 2
        },
      }
    */

    const result = await res.json()

    if (result.status !== true) return await Promise.reject(result)

    setUserData(getUser())

    return await Promise.resolve(result)
  }

  const logout = () => {
    removeToken()
    setUserData(null)
  }

  const getToken = () => {
    const token = Cookies.get('token')
    return token
  }

  const removeToken = () => {
    Cookies.remove('token')
  }

  const request = async (endpoint, options) => {
    const headers = {
      'Content-Type': 'application/json',
    }

    const res = await fetch(`${URL}${endpoint}`, {headers, ...options})
    const result = await res.json()

    if (result.type !== 'success' || result.status !== 200)
      return await Promise.reject(result)

    return await Promise.resolve(result)
  }

  const value = {
    userData,
    signIn,
    signUp,
    logout,
    isAuthenticated: !!userData,
    loading,
    request,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
