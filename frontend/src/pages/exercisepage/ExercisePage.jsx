import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import useUser from '../../hooks/useUser'
import { UserContext } from '../../App'
import './exercise.css'
import ExerciseService from '../../services/ExerciseService'
import RecordRow from '../../components/RecordRow'
import Modal from '../../components/Modal'
import RecordService from '../../services/RecordService'
import Toast from '../../components/Toast'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

const ExercisePage = () => {
  const [user, loading, authenticated, logout] = useUser()
  const id = useParams().id
  const [type, setType] = useState('weight')
  const [period, setPeriod] = useState('all')
  const [exercise, setExercise] = useState(undefined)
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const [create, setCreate] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastText, setToastText] = useState("")
  const [toastColor, setToastColor] = useState("green")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [],
  })
  const [graphOptions, setGraphOptions] = useState({})

  useEffect(() => {
    console.log(period)
  }, [period])

  useEffect(() => {
    ExerciseService.get(id)
    .then((data) => {
      if (!data.error) {
        const sortedRecords = [...data.records].sort((a, b) => new Date(a.date) - new Date(b.date)).reverse()
        data.records = sortedRecords
        setExercise(data)
      }
    })
  }, [id])

  useEffect(() => {
    console.log('updated')
    if (exercise && exercise.records) {
      const sortedRecords = [...exercise.records].sort((a, b) => new Date(a.date) - new Date(b.date)).reverse()

      if (JSON.stringify(sortedRecords) !== JSON.stringify(exercise.records)) {
        setExercise((prevExercise) => ({
          ...prevExercise,
          records: sortedRecords,
        }));
      }
    }
  }, [exercise?.records, exercise?.records.length]);


  useEffect(() => {
    if (exercise) {
      generateGraphData()
    }
  }, [exercise, type, period])

  const handleGraphTypeChange = (event) => {
    setType(event.target.value)
  }

  const handleGraphPeriodChange = (event) => {
    setPeriod(event.target.value)
  }

  const generateGraphData = () => {
    if (!exercise || !exercise.records || exercise.records.length === 0) return;

    const filteredRecords = filterRecordsByPeriod(exercise.records, period)
    const labels = filteredRecords.map(record => record.date)
    labels.reverse()

    const datasets = type === 'weight' 
      ? generateWeightDatasets(filteredRecords) 
      : generateRepsDatasets(filteredRecords)

    setGraphData({
      labels,
      datasets,
    })

    setGraphOptions({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          title: {
            display: true,
            text: type === 'weight' ? 'Weight (kg)' : 'Reps',
          },
        }
      }
    })
  }

  const filterRecordsByPeriod = (records, period) => {
    const now = new Date()
    let cutoffDate;
  
    switch (period) {
      case '1-year':
        cutoffDate = new Date();
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      case '6-months':
        cutoffDate = new Date();
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case '3-months':
        cutoffDate = new Date();
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      default:
        cutoffDate = new Date(0);
        break;
    }
  
    return records.filter(record => new Date(record.date) >= cutoffDate);
  }

  const generateWeightDatasets = (records) => {
    return [
      {
        label: 'Set 1 Weight',
        data: records.map(record => record.set1Weight),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Set 2 Weight',
        data: records.map(record => record.set2Weight),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
      {
        label: 'Set 3 Weight',
        data: records.map(record => record.set3Weight),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
      },
      {
        label: 'Set 4 Weight',
        data: records.map(record => record.set4Weight),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      }
    ]
  }

  const generateRepsDatasets = (records) => {
    return [
      {
        label: 'Set 1 Reps',
        data: records.map(record => record.set1Reps),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Set 2 Reps',
        data: records.map(record => record.set2Reps),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Set 3 Reps',
        data: records.map(record => record.set3Reps),
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
      },
      {
        label: 'Set 4 Reps',
        data: records.map(record => record.set4Reps),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      }
    ]
  }

  const handleUpdateOrCreate = () => {
    if (!create) {
      RecordService.update(modalData.id, {...modalData})
      .then(data => {
        if (!data.error) {
          handleUpdateRow(data)
          setToastText("record was succesfully updated")
          setShowToast(true)
          setToastColor('green')
          setTimeout(() => {
            setShowToast(false)
          }, 2000)
        }
        else {
          setToastText("an error occured while updating record")
          setShowToast(true)
          setToastColor('red')
          setTimeout(() => {
            setShowToast(false)
          }, 2000)
        }
        setShowModal(false)
      })
      return
    }
    RecordService.create(modalData)
    .then(data => {
      if (!data.error) {
        data.exercise = data.exercise.id
        handleAddRow(data)
        setToastText("record was succesfully created")
        setShowToast(true)
        setToastColor('green')
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
      }
      else {
        setToastText("an error occured while creating record")
        setShowToast(true)
        setToastColor('red')
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
      }
      setShowModal(false)
    })
  }

  const handleUpdateRow = (data) => {
    setExercise(prev => {
      const records = prev.records.map((item) => {
        if (item.id === data.id) {
          return data
        }
        else {
          return item
        }
      })
      return {...prev, records}
    })
  }

  const handleAddRow = (data) => {
    setExercise(prev => {
      const records = prev.records
      records.push(data)
      return {...prev, records}
    })
  }

  const handleAddRowClick = () => {
    setCreate(true)
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const date = `${year}-${month}-${day}`
    setModalData({
      exerciseId: exercise.id,
      date,
      set1Weight: 0,
      set2Weight: 0,
      set3Weight: 0,
      set4Weight: 0,
      set1Reps: 0,
      set2Reps: 0,
      set3Reps: 0,
      set4Reps: 0
    })
    setShowModal(true)
  }

  const handleDeleteButton = () => {
    setShowDeleteModal(true)
  }

  const handleNoDelete = () => {
    setShowDeleteModal(false)
  }

  const handleYesDelete = () => {
    RecordService.delete(modalData.id)
    .then((data) => {
      if (!data.error) {
        handleDeleteRow(modalData.id)
        setShowDeleteModal(false)
        setShowModal(false)
        setToastText("record was succesfully deleted")
        setShowToast(true)
        setToastColor('green')
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
      }
      else {
        setToastText("an error occured while deleting record")
        setShowToast(true)
        setToastColor('red')
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
      }
    })
  }

  const handleDeleteRow = (rowId) => {
    setExercise(prev => {
      const records = prev.records.filter(item => {
        return item.id !== rowId
      })
      return {...prev, records}
    })
  }
  return (
    <UserContext.Provider value={[user, loading, authenticated, logout]}>
      {
        showToast && <Toast text={toastText} color={toastColor}/>
      }
      {
        showModal && (
          <Modal
            modalClass='update-record' setShowModal={setShowModal}>
            <span>{create ? 'Create' : 'Update'} record</span>
            <div className="table-container">
              <table>
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
                    <tr>
                    <td><input type="text" defaultValue={modalData.date || '-'} onChange={(e) => {
                      setModalData(prev => {
                        return {
                          ...prev, date: e.target.value
                        }
                      })
                    }}/></td>
                    <td><input type="number" defaultValue={modalData.set1Weight || 0} onChange={(e) => {
                      setModalData(prev => {
                        return {
                          ...prev, set1Weight: e.target.value
                        }
                      })
                    }}/></td>
                    <td><input type="number" defaultValue={modalData.set2Weight || 0} onChange={(e) => {
                      setModalData(prev => {
                        return {
                          ...prev, set2Weight: e.target.value
                        }
                      })
                    }}/></td>
                    <td><input type="number" defaultValue={modalData.set3Weight || 0} onChange={(e) => {
                      setModalData(prev => {
                        return {
                          ...prev, set3Weight: e.target.value
                        }
                      })
                    }}/></td>
                    <td><input type="number" defaultValue={modalData.set4Weight || 0} onChange={(e) => {
                      setModalData(prev => {
                        return {
                          ...prev, set4Weight: e.target.value
                        }
                      })
                    }}/></td>
                    <td><input type="number" defaultValue={modalData.set1Reps || 0} onChange={(e) => {
                      setModalData(prev => {
                        return {
                          ...prev, set1Reps: e.target.value
                        }
                      })
                    }}/></td>
                    <td><input type="number" defaultValue={modalData.set2Reps || 0} onChange={(e) => {
                      setModalData(prev => {
                        return {
                          ...prev, set2Reps: e.target.value
                        }
                      })
                    }}/></td>
                    <td><input type="number" defaultValue={modalData.set3Reps || 0} onChange={(e) => {
                      setModalData(prev => {
                        return {
                          ...prev, set3Reps: e.target.value
                        }
                      })
                    }}/></td>
                    <td><input type="number" defaultValue={modalData.set4Reps || 0} onChange={(e) => {
                      setModalData(prev => {
                        return {
                          ...prev, set4Reps: e.target.value
                        }
                      })
                    }}/></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="buttons">
              <button onClick={handleUpdateOrCreate}>Save</button>
              <button 
                className='delete-button'
                onClick={handleDeleteButton}    
              >Delete</button>
            </div>
            
          </Modal>
        )
      }
      {
        showDeleteModal && (
          <Modal modalClass={'delete-record'}
            setShowModal={setShowDeleteModal}
          >
            <span>Are you sure that you want to delete this record?</span>
            <div className="buttons">
              <button className='yes-button' onClick={handleYesDelete}>Yes</button>
              <button className='no-button' onClick={handleNoDelete}>No</button>
            </div>
            
          </Modal>
        )
      }
      <Navbar />
      <div className="exercise-page">
        {
          exercise !== null ? (
          <>
            <h1>{exercise?.name}</h1>
            <div className="graph">
              {graphData && (
                <Line data={graphData} options={graphOptions} />
              )}
            </div>
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
            <div className="table-container">
              <button className='add-row' onClick={handleAddRowClick}>Add row</button>
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
                      <RecordRow key={index} item={item} setModalData={setModalData} setShowModal={setShowModal} setCreate={setCreate}/>
                    ))
                  }
                </tbody>
              </table>
            </div>
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
