import React from 'react'
import {BlinkBlur} from 'react-loading-indicators'

const CreatingMeal = ({errorCount}) => {
  return (
    <div className='fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex justify-center items-center'>
        <BlinkBlur color="#ffffff" size="large" text={`Generating meal (attempt ${errorCount})`} textColor="#ffffff" />
    </div>
  )
}

export default CreatingMeal