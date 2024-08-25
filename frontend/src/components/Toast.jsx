import React from 'react'

const Toast = ({text, color}) => {
  return (
    <div className={`toast ${color}`}>{text}</div>
  )
}

export default Toast