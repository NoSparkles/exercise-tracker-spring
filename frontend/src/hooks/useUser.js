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
    .then(([data, error, relogin]) => {
      if (relogin) {
        setAuthenticated(false)
        navigate('/login')
      }
      if (!error) {
        setUser(data)
        setAuthenticated(true)
      }
      setLoading(false)
    })
    .catch(err => {
      setAuthenticated(false)
      setLoading(false)
    })
  }, [])
  return [user, loading, authenticated]
}

export default useUser