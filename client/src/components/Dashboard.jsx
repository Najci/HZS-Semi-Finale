import React, { useEffect, useRef, useState } from 'react'
/* import '../css/Dashboard.css' */
import { Link, useNavigate } from 'react-router-dom'
import { buildFoodClass, FoodClass, FoodStatsClass }  from './FoodComponents/Food'
import { FoodListItem } from './FoodComponents/FoodProp'
import axios from 'axios'
import DragLayer from './DragComponents/DragLayer'
import FoodStats from './FoodComponents/FoodStats'


const Dashboard = ({user, logoutFunction}) => {
  const navigate = useNavigate()
  const [foodProperties, setFoodProperties] = useState(new FoodStatsClass(0,0,0,0,0))
  const [inventory, setInventory] = useState([])
  const [dragging, setDragging] = useState(null)
  const [hoverPlate, setHoverPlate] = useState(false)
  const hoverPlateRef = useRef(false)
  const draggingRef = useRef(null)
  const [plateItems, addPlateItem] = useState([])

  useEffect(() => {
    GetInventory()
  },[])

  useEffect(() => {
    const totals = plateItems.reduce(
      (acc, item) => {
        const count = (parseInt(item.Count) || 0);
        acc.Calories += item.Calories * count;
        acc.Protein  += item.Protein  * count;
        acc.Fat     += item.Fat   * count;
        acc.Sugar    += item.Sugar    * count;
        acc.Carbs    += item.Carbs    * count;

        return acc;
      },
      new FoodStatsClass(0, 0, 0, 0, 0)
    );

    setFoodProperties(totals);
  }, [plateItems]);


  const startDrag = (e, food) => {
    e.preventDefault(); 

    setDragging({
      food,
      x: e.clientX,
      y: e.clientY
    });

    draggingRef.current = food

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }

  const onMove = (e) => {
    setDragging(d => ({
      ...d,
      x: e.clientX,
      y: e.clientY
    }));
  }

  const onUp = () => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);

    //ADDS ITEM TO PLATE
    if (hoverPlateRef.current && draggingRef.current) {
      console.log("Dropped on plate:", draggingRef.current);

      const existingItem = plateItems.find(item => item._id === draggingRef.current._id);
    
      //UI ADDS 1 ITEM TO PLATE WHILE REMOVING FOOD REF COUNT BY 1
      if (existingItem) {
        existingItem.Count = (parseInt(existingItem.Count) || 1) + 1 + "x";
        
        addPlateItem(prev => [...prev]);
      }
      else{
        const foodItem = draggingRef.current.copyTableData();
        foodItem.Count = "1x";

        addPlateItem(prev => [...prev, foodItem]);
      }

      draggingRef.current.Count = (parseInt(draggingRef.current.Count) || 0) - 1 + "x"
      
      if ((parseInt(draggingRef.current.Count) || 0) == 0){
        setInventory([...inventory])
      }
    }

    setDragging(null);
    draggingRef.current = null
  }

  const GetInventory = () => {
    axios.get(`http://localhost:3000/api/getinventory/${user._id}`)
    .then((res) => {
      setInventory([])

      res.data?.forEach(item => {
        const foodItem = buildFoodClass(item)

        foodItem.Count = `${item.count}x`

        setInventory(prev => [...prev, foodItem])
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className='bg-[#292838] h-screen flex flex-col justify-between'>

      <div>
        <h2 className='text-white text-center text-5xl'>Welcome back, {user?.username}</h2>
      </div>

      <div className='bg-white h-20'>

      </div>

      <div className='flex justify-around items-center flex-row w-screen h-6/12'>
        <div className='bg-[#15141b] w-[25%] h-full rounded-xl p-3 drop-shadow-2xl '>

          <p className='text-white text-3xl text-center mb-3'>Goals</p>

          <div className='w-full h-[90%] text-white flex flex-col justify-start p-3 gap-3 overflow-scroll no-scrollbar'>

            {FoodStatsClass.returnStats().map((item, index) => (
              <FoodStats key={index} statName={item} plateStatData={foodProperties}/>
            ))}

          </div>
        </div>

        <div className='w-[28%] h-full flex flex-col justify-around'>
          <div className='w-full h-20 bg-white'> </div>

          <div className='bg-[url(../assets/foodIcons/food.png)] drop-shadow-[0_50px_35px_rgba(0,0,0,.5)] bg-contain bg-center bg-no-repeat h-40 w-full' 
            onMouseEnter={() => {setHoverPlate(true); hoverPlateRef.current = true;}}
            onMouseLeave={() => {setHoverPlate(false); hoverPlateRef.current = false;}}
          ></div>

          <div className='bg-white w-full h-20'>
            <input type="button" value="Clear" />
            <input type="button" value="Create" />
            <input type="button" value="Undo" />
          </div>
        </div>

        <div className='bg-[#15141b] w-[25%] h-full'>
          {plateItems.map((item, index) => (
            <FoodListItem key={index} Img={item.Img} Count={item.Count} Name={item.Name}/>
          ))}
        </div>
      </div>

      <div className='bg-[#15141b] w-full h-25 p-2 flex flex-row'>

        <div className='w-[91%] h-full flex flex-row gap-3 overflow-scroll flex-wrap no-scrollbar scroll-smooth'>
          {inventory.map(item => (
            item.buildIconWithDrag(startDrag)
          ))}
        </div>

        <div className='bg-[#222238] h-21 w-35 flex flex-col p-2 fixed right-2' onClick={() => navigate("/store")}>
          <div className="bg-[url(../assets/images/trolley.png)] not-odd:w-full saturate-75 h-full bg-no-repeat bg-center bg-contain" ></div>
          <p className='text-white text-center w-full'>Shop</p>
        </div>

      </div>

      <DragLayer dragging = {dragging}/>

    </div>
  )
}

export default Dashboard