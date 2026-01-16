import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import Steps from '../FoodComponents/Steps'
import { Slab } from 'react-loading-indicators'
import { useLocation } from 'react-router-dom'
import { FoodStatGoal } from '../FoodComponents/FoodStats';
import {FoodStatsClass} from "../FoodComponents/Food.js";

const Meal = ({user, mealid, }) => {

    const [meal, setMeal] = useState([])
    const location = useLocation();
    const stats = FoodStatsClass.returnStats()

    useEffect(() => {
        getMeal()
    },[location.pathname])

    const getMeal = async () => {
        setMeal([])

        await axios.get(`http://localhost:3000/api/gethistory/${user._id}/meal/${mealid}`, {withCredentials: true})
        .then((res) => {
            setMeal(res.data)
            console.log(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    return (
        <div className='bg-[#15141b] w-4/6 h-screen p-5'>
            <div className='w-full h-full flex flex-col items-center gap-10 overflow-scroll no-scrollbar'>

                <SkeletonTheme baseColor="#15141c" highlightColor="#272436">
                    {(!meal || meal.length === 0) ? 
                        <Skeleton style={{height: "25rem", width:"35rem" }} /> 
                        :
                        <div className='w-2/3 h-100 bg-[#1c1c29] rounded-xl drop-shadow-2xl text-center'>
                            <div style={{ backgroundImage: `url(${meal.imageUrl})` }} className="size-100 mx-auto bg-no-repeat bg-contain" ></div>
                        </div>
                    }
                </SkeletonTheme>

                <SkeletonTheme baseColor='#15141c' highlightColor="#272436">
                    <h1 className='text-white w-2/3 text-5xl text-center font-light'>{meal.recipe?.name || <Skeleton style={{height: "5rem"}}/>}</h1>
                </SkeletonTheme>

                {meal.length !== 0 && <div className='bg-[#1c1c29] w-2/3 h-1/8 p-3 rounded-xl drop-shadow-xl'>
                    <p className='text-white text-xl text-center'>Instructions</p>
                </div>}
    
                <div className='w-2/3 h-fit flex flex-col gap-4'>

                    <SkeletonTheme baseColor="#15141c" highlightColor="#272436">
                        {(!meal || meal.length === 0) ?
                            Array.from({length: 8}).map((_, index) =>(
                                <Skeleton key={index} style={{height: "5rem", width: "100%"}}/>
                            ))
                            :
                            meal.recipe?.steps.map((item, index) => (
                            <Steps key={index} data={item} index={index}/> 
                        ))}
                    </SkeletonTheme>
    
                </div>

                {meal.length !== 0 && <div className='bg-[#1c1c29] w-2/3 h-1/8 p-3 rounded-xl drop-shadow-xl'>
                    <p className='text-white text-xl text-center'>Macros</p>
                </div>}

                <div className='w-2/3 h-fit flex flex-col gap-5 text-white'>
                    {meal?.recipe?.Macro?.map((item, index) => (
                        <FoodStatGoal key={index} statName={stats[index]} plateStatData={item}/>
                    ))}
                </div>


            </div>
        </div>
    )
}

export default Meal