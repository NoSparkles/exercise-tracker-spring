import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import { UserContext } from '../../App'
import Navbar from '../../components/Navbar'
import useInput from '../../hooks/useInput'
import './exercises.css'
import ExerciseService from '../../services/ExerciseService'
import ExerciseBox from '../../components/ExerciseBox'

const ExercisesPage = () => {
  const [user, loading, authenticated] = useUser()
  const [search, searchOnChange] = useInput("")
  const [exercises, setExercises] = useState(null)

  useEffect(() => {
    ExerciseService.getAll()
    .then(data => setExercises(data))
    console.log(exercises)
  }, [])
  return (
    <UserContext.Provider value={[user, loading, authenticated]}>
      <Navbar/>
      <div className="exercises-page">
        <div className='search-add'>
          <div className="input-group">
            <input
              type="text"
              value={search}
              required
              onChange={searchOnChange}
            />
            <label>Search</label>
          </div>
          <button className='add-exercise'>Add exercise</button>
        </div>
        <ul className="exercise-list">
          {
            exercises !== null ? exercises.map((exercise, i) => (
              <ExerciseBox key={i} exercise={exercise}/>
            )) :
            (
              <span>Loading...</span>
            )
          }
        </ul>

      </div>
    </UserContext.Provider>
  )
}

export default ExercisesPage