import React, { useEffect, useState } from 'react'

function getGreenToRed(percent) {
    return 'rgb(' + Math.round(255 - (255 * percent) / 100) + ',' + Math.round((255 * percent) / 100) + ',' + 0 + ')';
}

const FoodStats = ({statName, plateStatData}) => {

    const goalData = 1000

 
    const percent = Math.min(((parseInt(plateStatData[statName]) || 0) / goalData) * 100, 100)


    return (
        <div className='h-1/5 w-full bg-[#1c1c29] p-3 drop-shadow-2xl'>
            <div className='flex flex-row justify-between items-center'>
                <p className='mb-1'>{statName}</p>
                <p className='mb-1 text-xs'>{Number(plateStatData[statName]).toFixed(1)}/{goalData}</p>
            </div>

            <div className='bg-black w-full h-2 rounded-4xl'>
                <div style={{width: `${percent}%`, transition:"0.5s", backgroundColor: `${getGreenToRed(percent)}`}} className='h-full rounded-4xl'></div>
            </div>
        </div>
    )
}

export default FoodStats