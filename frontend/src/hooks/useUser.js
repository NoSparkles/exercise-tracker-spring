import {useEffect, useState} from 'react'
import UserService from '../services/UserService'

const useUser = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(null)
  useEffect(() => {
    UserService.me()
    .then(([data, error]) => {
      if (!error) {
        setUser(data)
        setAuthenticated(true)
      }
      else {
        setAuthenticated(false)
        localStorage.removeItem('token')
      }
      setLoading(false)
    })
    .catch(err => {
      setAuthenticated(false)
      setLoading(false)
      localStorage.removeItem('token')
    })
  }, [])
  return [user, loading, authenticated]
}

export default useUser