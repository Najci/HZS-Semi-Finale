import React from 'react'

const FoodSmall = ({Img, Name, ClickAction, Count}) => {
  return (
    <div style={{height: `calc(var(--spacing) * 10)`, width: `calc(var(--spacing) * 66.9)`}} className='bg-[#1c1c29] flex flex-row justify-between p-2 pl-3 pr-3 rounded-3xl' onClick={() => ClickAction()}>
      <p className='text-white w-1/3'>{Name}</p>

      <div className='flex flex-row justify-around w-1/4 '>
        <div style={{ backgroundImage: `url(${Img})` }} className="w-full saturate-75 h-full bg-no-repeat bg-center bg-contain" ></div>
        <p className='text-white'>{Count}</p>
      </div>
    </div>
  )
}

const FoodNormal = ({Img, Name, ClickAction, Count}) => {
  return (
    <div className='bg-[#1c1c29] h-21 min-w-35 flex flex-col justify-between p-2 rounded-2xl' onMouseDown={(e) => ClickAction(e)}>
      <div style={{ backgroundImage: `url(${Img})` }} className="w-full saturate-75 h-full bg-no-repeat bg-center bg-contain" ></div>

      <div className='flex flex-row justify-between w-full pl-2 pr-2'>
        <p className='text-white w-1/3'>{Name}</p>
        <p className='text-white'>{Count}</p>
      </div>
    </div>
  )
}

const FoodListItem = ({Img, Name, ClickAction, Count}) => {
  return (
    <div className='bg-[#1c1c29] w-full flex flex-row justify-between p-2 pl-3 pr-3 rounded-3xl' onClick={() => ClickAction()}>
      <p className='text-white w-1/3'>{Name}</p>

      <div className='flex flex-row justify-around w-1/4 '>
        <div style={{ backgroundImage: `url(${Img})` }} className="w-full saturate-75 h-full bg-no-repeat bg-center bg-contain" ></div>
        <p className='text-white'>{Count}</p>
      </div>
    </div>
  )
}

export {FoodNormal, FoodSmall, FoodListItem} 