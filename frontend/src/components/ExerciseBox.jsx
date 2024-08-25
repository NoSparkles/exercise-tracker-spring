import React from 'react'
import { useNavigate } from 'react-router-dom'

const ExerciseBox = ({ exercise }) => {
  const navigate = useNavigate()

  const handleSvgClick = (e) => {
    e.stopPropagation()
  }

  return (
    <li className="exercise" onClick={() => navigate(`/exercises/${exercise.id}`)}>
      <span>{exercise.name}</span>
      <svg 
        onClick={handleSvgClick}
        fill="#000000" 
        version="1.1" 
        id="Capa_1" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 490 490" 
        xmlSpace="preserve"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> 
          <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "></polygon> 
        </g>
      </svg>
    </li>
  )
}

export default ExerciseBox
