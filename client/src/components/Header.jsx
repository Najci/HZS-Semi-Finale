import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = ({user}) => {

    const path = useLocation()

    if(!user || path.pathname == "/store" || path.pathname.startsWith("/profile")){return}
    const navigate = useNavigate()

  return (
    <div className='h-[5vh] shrink-0 z-10 bg-[#15141b] flex justify-between'>
        <div className='h-full flex flex-row gap-10 pl-5 content-center items-center justify-center '>

            <div className='h-10 flex justify-center items-center hover:cursor-pointer' onClick={() => {navigate(`/home/${user._id}`)}}>
                <p className='text-white'>Home</p>
            </div>

            <div className='h-full flex justify-center items-center hover:cursor-pointer' onClick={() => {navigate(`/dashboard/${user._id}`)}}> 
                <p className='text-white'>Dashboard</p>
            </div>

            <div className='h-full flex justify-center items-center hover:cursor-pointer'> 
                <p className='text-white'>Questioneer</p>
            </div>

            <div className='h-full flex justify-center items-center hover:cursor-pointer'>
                <p className='text-white'>Help</p>
            </div>
        </div>

        <div className='pr-2 flex flex-row w-1/12 justify-end gap-2 h-full items-center' onClick={
        () => {
            navigate(`/profile/${user._id}`)
        }
        }>
            <div className='h-full w-fit flex justify-center items-center'>
                <p className='text-white'>Profile</p>
            </div>

            <div className='h-11 w-11 p-1.5'>
                <div className='bg-[url(../assets/images/Pfp.png)]  h-full w-full bg-no-repeat bg-center bg-contain'></div>
            </div>
        </div>

    </div>
  )
}

export default Header