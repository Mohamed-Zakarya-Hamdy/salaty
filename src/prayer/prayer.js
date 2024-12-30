import React from 'react'
import "./prayer.css"
const Prayer = ({pray , time}) => {
  return (
    <div className='prayer-contener' >
        
      <p> {pray} </p>
      <p> {time} </p>

    </div>
  )
}

export default Prayer