import React from 'react'

const FoodSmall = ({Img, Name, ClickAction, Count}) => {
  return (
    <div style={{height: `calc(var(--spacing) * 10)`, width: `calc(var(--spacing) * 66.9)`}} className='bg-[#1c1c29] hover:bg-[#2c2c41] transition flex flex-row items-center justify-between p-2 pl-3 pr-3 rounded-3xl' onClick={() => ClickAction()}>
      <p className='text-white w-2/3'>{Name}</p>

      <div className='flex flex-row justify-around w-1/4 h-full'>
        <div style={{ backgroundImage: `url(${Img})` }} className="w-full saturate-75 h-full bg-no-repeat bg-center bg-contain" ></div>
      </div>
    </div>
  )
}

const FoodNormal = ({Img, Name, ClickAction, Count}) => {
  return (
    <div className='bg-[#1c1c29] h-21 min-w-35 flex flex-col justify-between p-2 rounded-2xl hover:bg-[#2c2c41] transition' onMouseDown={(e) => ClickAction(e)}>
      <div style={{ backgroundImage: `url(${Img})` }} className="w-full saturate-75 h-full bg-no-repeat bg-center bg-contain" ></div>

      <div className='flex flex-row justify-between items-center w-full pl-2 pr-2'>
        <p className='text-white w-2/3 text-xs'>{Name}</p>
        <p className='text-white'>{Count}x</p>
      </div>
    </div>
  )
}

const FoodInventoryItem = ({Img, Name, ClickAction, Count}) => {
  return (
    <div className='bg-[#1c1c29] w-6/13 flex flex-row justify-between hover:bg-[#2c2c41] p-2 pl-3 pr-3 rounded-3xl' onClick={(e) => ClickAction(e)}>
      <p className='text-white w-2/3'>{Name}</p>

      <div className='flex flex-row justify-around w-1/4 drop-shadow-2xl'>
        <div style={{ backgroundImage: `url(${Img})` }} className="w-full saturate-75 h-full bg-no-repeat bg-center bg-contain" ></div>
        <p className='text-white ml-1'>{Count}x</p>
      </div>
    </div>
  )
}

const FoodListItem = ({Img, Name, ClickAction, Count, Measurement, Amount}) => {
  return (
    <div className='bg-[#1c1c29] w-full flex flex-row justify-between p-2 pl-3 pr-3 rounded-3xl'>
      <p className='text-white w-1/3'>{Name}</p>

      <div className='flex flex-row justify-between w-2/4 drop-shadow-2xl'>

        <div className='justify-center items-center gap-2 flex flex-row w-3/4'>
          <div style={{ backgroundImage: `url(${Img})` }} className="w-full saturate-75 h-full bg-no-repeat bg-center bg-contain" ></div>
          <p className='text-white'>{parseInt(Count) * Amount}{Measurement}</p>
        </div>

        <div className='w-10 bg-[url(../assets/images/minus.png)] hover:brightness-50 transition bg-center bg-no-repeat bg-contain ' onClick={
            () => ClickAction()
          }
        ></div>

      </div>
    </div>
  )
}

export {FoodNormal, FoodSmall, FoodListItem, FoodInventoryItem} 