import React from 'react'

const Modal = ({modalClass, setShowModal, children}) => {
  const handleWrapperClick = (e) => {
    if (e.target.className === 'modal-wrapper') {
      setShowModal(false)
    }
  }

  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div className='modal-wrapper' onClick={handleWrapperClick}>
      <div className={"modal " + modalClass} onClick={handleModalClick}>
        {children}
      </div>
    </div>
  )
}

export default Modal