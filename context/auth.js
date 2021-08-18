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
    async function loadUserFromCookies() {
      const token = getToken()
      if (token) {
        setUserData(getUser())
      }
      setLoading(false)
    }

    loadUserFromCookies()
  }, [getUser])

  const signUp = async (data) => {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const res = await fetch(`${URL}/user/register`, options)
      const result = await res.json()

      if (result.status !== true) {
        throw new Error(result)
      }

      return await Promise.resolve(result)
    } catch (error) {
      throw new Error(error)
    }
  }

  const signIn = async (data) => {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
      const res = await fetch(`${URL}/user/login`, options)
      const result = await res.json()

      if (result.status !== true) {
        throw new Error(result)
      }

      setToken(result.token)
      setUserData({...getUser(), status_user: res.status_user})

      return await Promise.resolve(result)
    } catch (error) {
      throw new Error(error)
    }
  }

  const logout = () => {
    removeToken()
    setUserData(null)
  }

  const isAuthenticated = () => {
    const user = getUser()

    if (user == null) {
      return false
    }

    const {role} = user

    switch (role) {
      case 1:
        return 'admin'
      case 2:
        return 'donor'
      case 3:
        return 'fundraiser'

      default:
        return false
    }
  }

  const setToken = (token) => {
    Cookies.set('token', token)
  }

  const getToken = () => {
    const token = Cookies.get('token')
    return token
  }

  const removeToken = () => {
    Cookies.remove('token')
  }

  const request = async (endpoint, options) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Cookie: `token=${getToken()}`,
      }

      const res = await fetch(`${URL}${endpoint}`, {headers, ...options})
      const result = await res.json()

      if (result.status !== true) {
        throw new Error(result)
      }

      return await Promise.resolve(result)
    } catch (error) {
      throw new Error(error)
    }
  }

  const value = {
    userData,
    signIn,
    signUp,
    logout,
    isAuthenticated,
    loading,
    request,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (context == undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }

  return context
}
