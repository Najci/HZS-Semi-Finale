import React from 'react'

const ClearConfirmation = ({onCancel, onClear}) => {
  return (
    <div className='fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex justify-center items-center'>
        <div className='bg-[#15141b] h-3/10 w-3/10 drop-shadow-[0_0_10px_rgba(0,0,0,1)] p-5 rounded-xl'>
            <p className='text-white text-3xl text-center'>Clearing plate</p>

            <div className='w-full h-fit p-10'>
                <p className='text-white text-center text-xl font-light'>Are you sure you want to clear your plate?</p>
                <p className='text-[#979797] text-center text-sm italic font-extralight'>(All the items on your plate will be removed and placed back into your fridge.)</p>
            </div>

            <div className='w-3/4 mx-auto h-10 flex flex-row justify-between'>
                <input className='bg-green-600 hover:bg-green-800 transition duration-1000 hover:drop-shadow-[0_0_10px_rgba(21,100,27,1)] text-white w-3/7 h-full rounded-xl drop-shadow-2xl' type="button" value="Cancel" onClick={
                    () => {onCancel()}
                } />
                <input className='bg-red-600 hover:bg-red-800 transition duration-1000 hover:drop-shadow-[0_0_10px_rgba(100,20,27,1)] text-white w-3/7 h-full rounded-xl drop-shadow-2xl' type="button" value="Clear" onClick={
                    () => {onClear()}
                } />
            </div>
            
        </div>
    </div>
  )
}

export default ClearConfirmation