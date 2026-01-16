import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({user}) => {
    const navigate = useNavigate()

  return (
    <div className='flex-1 bg-[#101016] flex flex-col justify-center items-center min-h-0 overflow-hidden relative'>

        <div className='flex rise active w-full mx-auto h-2/3 flex-col items-center gap-5 z-10 '>
            <div className='rise active w-full h-fit flex flex-col gap-3'>
                <h2 className='text-white text-center text-8xl rise active'>Welcome back, {user?.username}</h2>
                <p className='text-[#a8a8a8] italic text-2xl text-center rise active'>Hungry? Take the questioneer:</p>
            </div>

            <div className='w-full rise active flex flex-col justify-center items-center gap-1'>
                <button className='bg-[#14141b] hover:cursor-pointer w-1/6 p-2 spinning-drop-shadow rounded-xl text-white text-center flex justify-center items-center mt-3' onClick={
                    () => {navigate(`/questionnaire/${user._id}`)}
                }>
                    <p>Questioneer</p>
                </button>
    
                <button className='w-1/6 h-1/2 p-2 rounded-xl hover:cursor-pointer rise active text-white text-center flex justify-center items-center' onClick={
                    () => {navigate(`/dashboard/${user._id}`)}
                }>
                    <p className='text-[#4b56b6]'>Dashboard</p>
                </button>
            </div>
        </div> 

        <div className='brightness-50 z-0 absolute blur-sm w-full h-full bg-[url(../assets/images/foodline.png)] bg-no-repeat bg-position-[center_bottom_0] bg-size-[100%_auto]'>
        </div>      
    </div>
  )
}

export default Home