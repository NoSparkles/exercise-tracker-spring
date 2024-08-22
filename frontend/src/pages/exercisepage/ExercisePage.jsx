import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import useUser from '../../hooks/useUser'
import { UserContext } from '../../App'
import './exercise.css'
import ExerciseService from '../../services/ExerciseService'

const ExercisePage = () => {
  const [user, loading, authenticated] = useUser()
  const id = useParams().id
  const [type, setType] = useState('weight')
  const [period, setPeriod] = useState('all')
  const [exercise, setExercise] = useState(undefined)

  useEffect(() => {
    ExerciseService.get(id)
    .then((data) => {
      if (!data.error) {
        setExercise(data)
        console.log(data)
      }
    })
  }, [])

  const handleGraphTypeChange = (event) => {
    setType(event.target.value)
  }

  const handleGraphPeriodChange = (event) => {
    setPeriod(event.target.value)
  }

  return (
    <UserContext.Provider value={[user, loading, authenticated]}>
      <Navbar />
      <div className="exercise-page">
        {
          exercise !== null ? (
          <>
            <h1>{exercise?.name}</h1>
            <div className="graph"></div>
            <div className='menu'>
              <div className="graph-type">
                <label>
                  <input
                    type="radio"
                    name="graph-type"
                    value="weight"
                    checked={type === 'weight'}
                    onChange={handleGraphTypeChange}
                  />
                  <span>Weight</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="graph-type"
                    value="reps"
                    checked={type === 'reps'}
                    onChange={handleGraphTypeChange}
                  />
                  <span>Reps</span>
                </label>
              </div>
              <div className="graph-period">
                <label>
                  <input
                    type="radio"
                    name="graph-period"
                    value="all"
                    checked={period === 'all'}
                    onChange={handleGraphPeriodChange}
                  />
                  <span>All</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="graph-period"
                    value="1-year"
                    checked={period === '1-year'}
                    onChange={handleGraphPeriodChange}
                  />
                  <span>1 Year</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="graph-period"
                    value="6-months"
                    checked={period === '6-months'}
                    onChange={handleGraphPeriodChange}
                  />
                  <span>6 months</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="graph-period"
                    value="3-months"
                    checked={period === '3-months'}
                    onChange={handleGraphPeriodChange}
                  />
                  <span>3 months</span>
                </label>
              </div>
            </div>
            <table className="records-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Set 1 Weight</th>
                  <th>Set 2 Weight</th>
                  <th>Set 3 Weight</th>
                  <th>Set 4 Weight</th>
                  <th>Set 1 Reps</th>
                  <th>Set 2 Reps</th>
                  <th>Set 3 Reps</th>
                  <th>Set 4 Reps</th>
                </tr>
              </thead>
              <tbody>
                {
                  exercise?.records.map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.set1Weight || '-'}</td>
                      <td>{item.set2Weight || '-'}</td>
                      <td>{item.set3Weight || '-'}</td>
                      <td>{item.set4Weight  || '-'}</td>
                      <td>{item.set1Reps || '-'}</td>
                      <td>{item.set2Reps || '-'}</td>
                      <td>{item.set3Reps || '-'}</td>
                      <td>{item.set4Reps || '-'}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </>
          ) : (
            <>
            Loading...
            </>
          )
        }
        </div>
    </UserContext.Provider>
  )
}

export default ExercisePage
