import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import { UserContext } from '../../App'
import Navbar from '../../components/Navbar'
import useInput from '../../hooks/useInput'
import './exercises.css'
import ExerciseService from '../../services/ExerciseService'
import ExerciseBox from '../../components/ExerciseBox'
import Modal from '../../components/Modal'
import Toast from '../../components/Toast'

const ExercisesPage = () => {
  const [user, loading, authenticated] = useUser()
  const [search, searchOnChange] = useInput("")
  const [exercises, setExercises] = useState(null)
  const [filteredExercises, setFilteredExercises] = useState(null)
  const [name, onNameChange] = useInput('')
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastText, setToastText] = useState("")
  const [toastColor, setToastColor] = useState("green")

  useEffect(() => {
    ExerciseService.getAll()
    .then(data => {
      setExercises(data)
      setFilteredExercises(data)
    })
  }, [])
  useEffect(() => {
    if (exercises) {
      setFilteredExercises(prev => {
        return exercises.filter((item) => {
          return item.name.toLowerCase().includes(search.toLowerCase())
        })
      })
    }
    
  }, [search])

  const handleAddClick = () => {
    setShowModal(true)
  }

  const handleSaveExercise = () => {
    ExerciseService.create(name)
    .then((data) => {
      if (!data.error) {
        setShowModal(false)
        onNameChange({target: {value: ''}})
        setToastText("Exercise was succesfully created")
        setShowToast(true)
        setToastColor('green')
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
        updateExercisesList(data)
      }
      else {
        setToastText("There was an error while creating an exercise")
        setShowToast(true)
        setToastColor('red')
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
      }
    })
  }

  const updateExercisesList = (data) => {
    setExercises(prev => {
      return [...prev, data]
    })
    setFilteredExercises(prev => {
      return [...prev, data]
    })
  }
  return (
    <UserContext.Provider value={[user, loading, authenticated]}>
      <Navbar/>
      <div className="exercises-page">
        {
          showToast && <Toast text={toastText} color={toastColor}/>
        }
        {
          showModal && (
            <Modal modalClass={'add-exercise-modal'} setShowModal={setShowModal}>
              <span>Add exercise</span>
              <div className="input-group">
              <input
                type="text"
                value={name}
                required
                onChange={onNameChange}
              />
              <label>Name</label>
            </div>
            <button onClick={handleSaveExercise}>Save</button>
            </Modal>
          )
        }
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
          <button className='add-exercise' onClick={handleAddClick}>Add exercise</button>
        </div>
        <ul className="exercise-list">
          {
            filteredExercises !== null ? filteredExercises.map((exercise, i) => (
              <ExerciseBox key={i} exercise={exercise}/>
            )) :
            (
              <span>Loading...</span>
            )
          }
        </ul>
        {
          filteredExercises?.length === 0 && (
            <span className='no-exercises'>No exercises were found</span>
          )
        }
      </div>
    </UserContext.Provider>
  )
}

export default ExercisesPage