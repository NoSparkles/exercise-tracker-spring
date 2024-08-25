import React from 'react'

const RecordRow = ({setModalData, setShowModal, setCreate, item}) => {
  const handleClick = () => {
    setModalData(item)
    setShowModal(true)
    setCreate(false)
  }
  return (
    <tr onClick={handleClick}>
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
  )
}

export default RecordRow