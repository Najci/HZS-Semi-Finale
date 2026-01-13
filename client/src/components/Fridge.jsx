import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate} from 'react-router-dom';
/* import '../css/Game.css' */
import axios from 'axios';
import { buildFoodClass } from './FoodComponents/Food';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Fridge = ({ user }) => {

  const [search, Searching] = useState("")
  const [storedFoods, setStoredFoods] = useState([])
  const [cartCount, addCartCount] = useState(0)
  const [loadedFoods, loadFoods] = useState([])
  const [selectedFood, selectFood] = useState(loadedFoods)
  const [filteredFoods, setFilteredFoods] = useState([...loadedFoods.values()])

  useEffect(() => {
    getFoods()
    getInventory()
  },[])

  useEffect(() => {
    if(search.length == 0){
      setFilteredFoods([...loadedFoods.values()])
    }

    const lower = search.toLowerCase()

    const filtered = [...loadedFoods.values()].filter(food =>
      food.Name.toLowerCase().startsWith(lower)
    )
  
    setFilteredFoods(filtered)
  },[search, loadedFoods])

  const getFoods = async () => {
    await axios.get(`http://localhost:3000/api/getstore`)
    .then((res) => {

      const Foods = new Map()

      res.data.forEach(item => {
        const foodItem = buildFoodClass(item)

        Foods.set(item.Name, foodItem)
        loadFoods(Foods)
      })
    })
    .catch((error) => {
        console.log(error)
    })
  }
 
  const getInventory = async () => {
    await axios.get(`http://localhost:3000/api/getinventory/${user?._id}`)
    .then((res) => {
      setStoredFoods([])

      res.data?.forEach(item => {
        const foodItem = buildFoodClass(item)
        foodItem.Count = `${item.count}x`

        setStoredFoods(prev => [...prev, foodItem])
      })

    })
    .catch((err) => {
      console.log(err)
    });
  }

  const handleSubmit = async () => {
    await axios.post(`http://localhost:3000/api/updateinventory`, {user : user, food : selectedFood, count : cartCount})
    .then(function(response) {
      getInventory()
    })
    .catch(function(error){
      console.log(error)
    })
  };

  return (
    <div className='bg-[#292838] h-screen flex lg:flex-row sm:flex-col justify-between items-center'>

      <div className='w-2/6 h-full flex flex-col'>

        <div className='w-[120%] saturate-60 -mt-15 relative h-50 bg-size-[150%] bg-position-[center_right_3%] bg-no-repeat bg-[url(../assets/images/storeroof.png)]'></div>

        <div className='w-full h-20 -mt-5 pl-3 pr-3 pb-5 bg-[#1c1c29]'>
          <input onChange={(e) => Searching(e.target.value)} placeholder='Search' className='bg-white w-full h-10 mt-5 text-center text-2xl' type="text" name="" id="" />
        </div>

        <div className='w-full h-full bg-[#15141b] flex lg:flex-wrap sm:flex-row content-start p-2 justify-start overflow-scroll no-scrollbar gap-2'>
          {filteredFoods.slice().sort((a, b) => a.Name.localeCompare(b.Name)).map(food => (
            food.buildIconWithAdd(selectFood, addCartCount)
          ))}
        </div>
      </div>

      <div className='w-100 h-120 bg-[#15141b] p-5 flex flex-col drop-shadow-2xl'>

        <div className='h-30 w-30 mx-auto bg-[#1c1c29] p-4 rounded-2xl'>
          <div style={{ backgroundImage: `url(${selectedFood.Img})` }} className="w-full saturate-75 h-full bg-no-repeat bg-center bg-contain" ></div>
        </div>

        <p className='text-center text-white mt-4 text-2xl'>{selectedFood.Name ? selectedFood.Name  : "Select a food item"}</p>

        <div className='text-white w-full mt-5 h-[30%] flex flex-row content-center justify-center text-xl'>
          <div className='w-2/3 h-full'>
            <p>Calories: {(selectedFood.Calories * cartCount)}cal</p>
            <p>Protien: {(selectedFood.Protein * cartCount).toFixed(1)}g</p>
            <p>Fat: {(selectedFood.Fat * cartCount).toFixed(1)}g</p>
          </div>

          <div>
            <p>Sugar: {(selectedFood.Sugar * cartCount).toFixed(1)}g</p>
            <p>Carbs: {(selectedFood.Carbs * cartCount).toFixed(1)}g</p>
          </div>
        </div>

        <div className='h-20 w-full mx-auto flex flex-row items-center justify-between'>
          <div className='flex flex-row h-fit w-100'>
            <div className='h-10 w-10 bg-[url(../assets/images/trolley.png)] bg-center bg-no-repeat bg-contain mr-1'></div>
            <p className='text-white text-2xl'>: {cartCount}</p>  
          </div>

          <div className='flex flex-row gap-5'>
            <div className='h-10 w-10 bg-[url(../assets/images/minus.png)] bg-center bg-no-repeat bg-contain mr-1' onClick={
              () => {if(cartCount-1<0){return} addCartCount(cartCount-1)}
            }></div>

            <div className='h-10 w-10 bg-[url(../assets/images/plus.png)] bg-center bg-no-repeat bg-contain mr-1' onClick={
              () => {addCartCount(cartCount+1)}
            }></div>
          </div>
        </div>

        <input className='bg-white' type="button" value="Take" onClick={() => {
          if(!selectFood || cartCount == 0){return}
          handleSubmit()
        }}/>

      </div>

      <div className='w-2/6 h-full flex bg-[#15141b] flex-wrap no-scrollbar content-start p-2 justify-start overflow-scroll no-scrollbar gap-2'>
        {storedFoods?.slice().sort((a, b) => a.Name.localeCompare(b.Name)).map(food => (
          food.buildIcon()
        ))}
      </div>

    </div>
  )
}

export default Fridge
