import React, { useState } from 'react'

const EditAmount = ({selectedItem, onRemove}) => {
    
    const[valueSlider, setValueSlider] = useState(0)
    const[valueNum, setValueNum] = useState(0)
    const[error, setError] = useState("")

    const handleValueChange = (newVal) => {
        setValueNum(newVal);
        setValueSlider(newVal);
    };

    return (
        <div style={{
            position: "fixed",
            left: selectedItem.Params.posX,
            top: selectedItem.Params.posY,
            transform: "translate(-100%, -50%)",
            zIndex: 9999
        }} className='h-4/10 w-3/10 bg-[#15141b] drop-shadow-[0_20px_10px_rgba(0,0,0,0.5)] rounded-xl flex flex-col gap-2 items-center p-5'
        >
            <p className='text-white text-4xl mb-3'>{selectedItem.Name}</p>

            <div className='h-20 w-20 mx-auto bg-[#1c1c29] p-4 rounded-2xl'>
                <div style={{ backgroundImage: `url(${selectedItem.Img})` }} className="w-full saturate-75 h-full bg-no-repeat bg-center bg-contain" ></div>
            </div>

            <div className='w-full h-fit text-center'>
                <p className='text-white font-light'>Select the amount you would like to remove</p>
                <p className='text-red-900 font-light text-sm'>You are removing {valueSlider} {selectedItem.Name}(s) from storage!</p>
            </div>

            <div className='flex flex-row w-full h-fit justify-center'>
                <input className='accent-green-800 bg-[#1c1c29]' type="range" value={valueSlider} min={0} max={(parseInt(selectedItem.Count) || 0)} name="" id="" onChange={
                    (e) => {handleValueChange(e.target.value)}
                } />
                <input className='bg-[#1c1c29] text-white w-1/19 text-xl appearance-none text-right' type="number" min={0}  max={(parseInt(selectedItem.Count) || 0)} value={valueNum} name="" id="" onChange={
                    (e) => {handleValueChange(e.target.value)}
                }/>
                <p className='text-white text-xl'>/{parseInt(selectedItem.Count) || 0}</p>    
            </div>

            <div className='w-full text-center mt-3 p-1 h-10'>
                <p className='text-red-900 font-light text-sm mb-2'>{error}</p>

                <input className='bg-red-600 hover:bg-red-800 transition duration-1000 hover:drop-shadow-[0_0_10px_rgba(100,20,27,1)] text-white w-3/7 h-full rounded-xl drop-shadow-2xl' type="button" value="Remove" onClick={
                    () => {
                        if(valueSlider <= 0){
                            setError("Select a valid value to delete")
                            return
                        }

                        onRemove(valueSlider)
                    }
                } />
            </div>
        </div>
    )
}

export default EditAmount