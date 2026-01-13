import React, { useEffect, useState } from 'react'

const FoodStats = ({statName, plateStatData}) => {

    const goalData = 1000

 
    const percent = Math.min(((parseInt(plateStatData[statName]) || 0) / goalData) * 100, 100)


    return (
        <div className='h-1/5 w-full bg-[#1c1c29] p-3 drop-shadow-2xl'>
            <p className='mb-3'>{statName}</p>

            <div className='bg-black w-full h-2'>
                <div style={{width: `${percent}%`, transition:"0.5s"}} className='bg-green-600 h-full'></div>
            </div>
        </div>
    )
}

export default FoodStats