import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MealListItem } from '../FoodComponents/FoodProp'
import { ThreeDot } from 'react-loading-indicators'
import { Outlet, Route, useNavigate, useParams } from 'react-router-dom'
import { ProtectedRoute } from '../../App'
import Meal from './Meal'

const MealRoute = ({user}) => {
  const {mealid}= useParams();
  return (
    <ProtectedRoute element={<Meal user={user} mealid={mealid} />} />
  );
};

const MealHistoryPage = ({user}) => {

  const navigate = useNavigate()
  const [mealHistory, setMealHistory] = useState([])

  useEffect(() => {
    getHistory()
  },[])

  const getHistory = async () => {
    await axios.get(`http://localhost:3000/api/gethistory/${user._id}`, {withCredentials: true})
    .then((res) => {
      setMealHistory(res.data.meals)
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className='h-screen w-3/4 flex flex-row transition-transform'>
      <div className='bg-[#15141b] w-2/6 h-full p-5 drop-shadow-[20px_0_50px_rgba(0,0,0,0.7)]'> 
        <p className='text-white text-center text-6xl font-[Montserrat]'>Meal History</p>
        <div className='h-5/6 w-full flex flex-col gap-3 overflow-scroll no-scrollbar p-5 pt-10'>
          {mealHistory.length < 1 && <div className='h-full z-20 w-full flex justify-center items-center'><ThreeDot variant="bounce" color="#ffffff" size="large" text="Getting history" textColor="#ffffff" /></div> }
          {mealHistory?.slice().reverse().map((item, index) => (
            <MealListItem key={index} data={item} onAction={
              () => {
                navigate(`/profile/${user._id}/mealhistory/${item._id}`, { replace: true })
              }
            }/>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export const mealRoutes = (user) => (
  <Route path='/profile/:userId/mealhistory' element={<ProtectedRoute element={<MealHistoryPage user={user}/>} />}>
      <Route path=':mealid' element={<MealRoute user={user} />}/>
  </Route>
);