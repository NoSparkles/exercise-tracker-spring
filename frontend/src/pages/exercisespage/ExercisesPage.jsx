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
  const [deleteExercise, setDeleteExercise] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

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

  useEffect(() => {
    if (deleteExercise) {
      setShowDeleteModal(true)
    }
  }, [deleteExercise])

  useEffect(() => {
    if (!showDeleteModal) {
      setDeleteExercise(false)
    }
  }, [showDeleteModal])
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

  const handleYesDelete = () => {
    ExerciseService.delete(deleteExercise.id)
    .then((data) => {
      if (!data.error) {
        setShowDeleteModal(false)
        setToastText("Exercise was succesfully deleted")
        setShowToast(true)
        setToastColor('green')
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
        updateExercisesListAfterDelete(deleteExercise)
        setDeleteExercise(false)
      }
      else {
        setToastText("There was an error while deleting an exercise")
        setShowToast(true)
        setToastColor('red')
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
      }
    })
  }

  const updateExercisesListAfterDelete = (data) => {
    setExercises(prev => {
      return prev.filter(item => {
        return item.id !== data.id
      })
    })
    setFilteredExercises(prev => {
      return prev.filter(item => {
        return item.id !== data.id
      })
    })
  }

  const handleNoDelete = () => {
    setShowDeleteModal(false)
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
            <Modal 
              modalClass={'add-exercise-modal'} 
              setShowModal={setShowModal}>
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
        {
          showDeleteModal && (
            <Modal
              modalClass={'delete-exercise-modal'}
              setShowModal={setShowDeleteModal}
            >
              <span>Are you sure that you want to delete {deleteExercise?.name} exercise?</span>
              <div className="buttons">
                <button className='yes-button' onClick={handleYesDelete}>Yes</button>
                <button className='no-button' onClick={handleNoDelete}>No</button>
              </div>
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
              <ExerciseBox key={i} exercise={exercise} setDeleteExercise={setDeleteExercise}/>
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