import React from 'react'

const PlateError = ({plateError, onOk}) => {
    return (
        <div className='fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex justify-center items-center'>
            <div className='bg-[#15141b] h-3/14 w-2/11 drop-shadow-[0_0_10px_rgba(0,0,0,1)] p-5 pb-5 rounded-xl'>
                <p className='text-white text-3xl text-center'>Oops!</p>
    
                <div className='w-full h-fit p-5'>
                    <p className='text-[#8f8f8f] text-center text-md font-light'>{plateError}</p>
                </div>
    
                <div className='w-3/4 mx-auto h-10 flex flex-row justify-center'>
                    <input className='bg-green-600 hover:bg-green-800 transition duration-1000 hover:drop-shadow-[0_0_10px_rgba(21,100,27,1)] text-white w-5/7 h-full rounded-xl drop-shadow-2xl' type="button" value="I understand" onClick={
                        () => {onOk()}
                    } />
                </div>
                
            </div>
        </div>
    )
}

export default PlateError