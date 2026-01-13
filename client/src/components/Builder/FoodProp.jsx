import React from 'react'

const Food = ({Img, Name, ClickAction, Count}) => {
  return (
    <div className='h-45 w-45 bg-[#1c1c29] pb-8 pt-3 rounded-3xl' onClick={() => ClickAction()}>
      <div style={{ backgroundImage: `url(${Img})` }} className="w-full saturate-75 h-full bg-no-repeat bg-center bg-contain" ></div>
      <div className='flex flex-row justify-between pl-6 pr-3'>
        <p className='text-white text-center'>{Name}</p>
        <p className='text-white'>{Count}</p>
      </div>
    </div>
  )
}

export default Food