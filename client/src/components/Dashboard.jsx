import React, { useEffect, useState } from 'react'
/* import '../css/Dashboard.css' */
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Dashboard = ({user, logoutFunction}) => {
  /* const navigate = useNavigate()
  const [high, setHigh] = useState("")

  useEffect(() => {
    axios.post("http://localhost:3000/dashboard", {data : user})
    .then((res)=>{
      console.log(res)
      setHigh(res.data)
    })

  },[user.highScore]) */

  return (
    <div className='bg-[#2e2a6e] h-screen flex flex-col justify-between'>

      <div>
        <h2 className='text-white text-center text-5xl'>Welcome back, Max</h2>
      </div>

      <div className='bg-white h-20'>

      </div>

      <div className='flex justify-around flex-row w-screen h-6/12'>
        <div className='bg-black w-[33%] h-full'>

        </div>

        <div className='w-[33%] h-full'>
          <div className='bg-[url(../../../public/foodIcons/food.png)] drop-shadow-[0_50px_35px_rgba(0,0,0,.5)] bg-no-repeat bg-center h-full w-full'></div>
        </div>

        <div className='bg-black w-[33%] h-full'>
          
        </div>
      </div>

      <div className='bg-white w-full h-20'>

      </div>

      <div className='bg-black w-full h-52'>

      </div>

    </div>
  )
}

export default Dashboard