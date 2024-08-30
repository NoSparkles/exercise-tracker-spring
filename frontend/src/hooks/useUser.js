import {useEffect, useState} from 'react'
import UserService from '../services/UserService'
import { useNavigate } from 'react-router-dom'

const useUser = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(null)
  const navigate = useNavigate()
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
  const logout = () => {
    setAuthenticated(false)
    setLoading(false)
    localStorage.removeItem('token')
    navigate('/')
  }
  return [user, loading, authenticated, logout]
}

export default useUser