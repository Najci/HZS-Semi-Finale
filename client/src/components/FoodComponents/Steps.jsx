import React from 'react'
import Skeleton from 'react-loading-skeleton'

const Steps = ({data, index}) => {
  return (  
    <div className='bg-[#1c1c29] w-full h-fit p-5 rounded-xl drop-shadow-xl'>
      <h2 className='text-white text-2xl'>Step {index+1}.</h2>
      <p className='text-[#a1a1a1] font-extralight'>{data}</p>
    </div>
  )
}

export default Steps