import React from 'react'

const Modal = ({text, setShowModal, setAnswer}) => {
  return (
    <div className='modal-wrapper'>
      <div className="modal">
        <span>{text}</span>
        <button className='yes-button'>Yes</button>
        <button className='no-button'>No</button>
      </div>
    </div>
  )
}

export default Modal