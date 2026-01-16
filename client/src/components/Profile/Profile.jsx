import React from 'react'
import {ProtectedRoute} from '../../App'
import { NavLink, Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromChildren, useNavigate, useParams } from 'react-router-dom';
import {mealRoutes} from './MealHistory';
import Account from './Account'
import Meal from './Meal';

const ProfileLayout = ({ user, handleLogout }) => {
    const navigate = useNavigate()

    return (
      <div className='bg-[#292838] h-screen flex flex-row'>
        <div className='bg-[#15141b] h-screen w-1/4 z-10 drop-shadow-[20px_0_50px_rgba(0,0,0,0.7)]'>

            <div className='h-1/4 flex flex-col justify-center items-center pb-5'>
                <div className='w-full p-3'>
                    <p className='text-white hover:cursor-pointer' onClick={() => {navigate(`/dashboard/${user._id}`)}}>Back</p>
                </div>

                <div className='w-40 h-40 p-2'>
                    <div className='bg-[url(../assets/images/Pfp.png)] h-full w-full bg-center bg-no-repeat bg-contain'></div>
                </div>
                <p className='text-white text-3xl'>{user.username}</p>
            </div>

            <div className='h-3/4 w-full flex flex-col justify-between'>
                <div className='w-full h-3/4 flex flex-col gap-3'>

                    <NavLink 
                        to={`/profile/${user?._id}`} end
                        className={
                            ({ isActive }) =>
                            `h-1/8 w-full flex items-center p-3 cursor-pointer transition
                            ${isActive ? "bg-[#36364e]" : "bg-[#1c1c29] hover:bg-[#2a2a3d]"}`
                        }
                    >
                        <p className='text-white text-2xl'>Account</p>
                    </NavLink>

                    <NavLink
                        to={`/profile/${user?._id}/mealhistory`} end
                        className={
                            ({ isActive }) => 
                            `h-1/8 w-full flex items-center p-3 cursor-pointer transition
                            ${isActive ? "bg-[#36364e]" : "bg-[#1c1c29] hover:bg-[#2a2a3d]"}`
                        }
                    >
                        <p className='text-white text-2xl'>History</p>
                    </NavLink> 

                </div>

                <div className='w-full h-1/4 flex flex-col justify-end pb-3'>
                    <div className='h-2/5 w-full bg-[#200000] flex items-center p-3 hover:bg-[#2a2a3d]' onClick={() => {handleLogout(), navigate('/')}}>
                        <p className='text-white text-2xl'>Sign out</p>
                    </div> 
                </div>
                
            </div>
        </div>
        <Outlet /> 
      </div>
    );
};
  
export const profileRoutes = (user, handleLogout) => (
    <Route path={`/profile/:userId`} element={<ProtectedRoute element={<ProfileLayout user={user} handleLogout={handleLogout} />} />}>
        {mealRoutes(user)}
        <Route path="" element={<ProtectedRoute element={<Account user={user} />} />} />
    </Route>
);