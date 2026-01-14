import React, { useEffect, useRef, useState } from 'react'
/* import '../css/Dashboard.css' */
import { Link, useNavigate } from 'react-router-dom'
import { buildFoodClass, FoodClass, FoodStatsClass }  from './FoodComponents/Food'
import { FoodListItem } from './FoodComponents/FoodProp'
import axios from 'axios'
import DragLayer from './DragComponents/DragLayer'
import FoodStats from './FoodComponents/FoodStats'
import PlateComponent from './DragComponents/PlateComponent'
import ClearConfirmation from './Overlays/ClearConfirmation'


const Dashboard = ({user, logoutFunction}) => {
  const navigate = useNavigate()
  const [foodProperties, setFoodProperties] = useState(new FoodStatsClass(0,0,0,0,0,0,0))
  const [inventory, setInventory] = useState([])
  const [dragging, setDragging] = useState(null)
  const [hoverPlate, setHoverPlate] = useState(false)
  const hoverPlateRef = useRef(false)
  const draggingRef = useRef(null)
  const [plateItems, addPlateItem] = useState([])
  const [visiblePlateItems, addVisiblePlateItem] = useState([])
  const [search, setSearch] = useState("")
  const [filteredFoods, setFilteredFoods] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    GetInventory()
  },[])

  useEffect(() => {
    if(search.length == 0){
      setFilteredFoods(null)
      addPlateItem([...plateItems])
      return
    }

    const filtered = [...plateItems].filter(food =>
      food.Name.toLowerCase().startsWith(search)
    )

    setFilteredFoods(filtered)
  },[search])

  useEffect(() => {
    const totals = plateItems.reduce(
      (acc, item) => {
        const count = (parseInt(item.Count) || 0);

        acc.Calories += item.Calories * count;
        acc.Protein += item.Protein * count;
        acc.Fat += item.Fat * count;
        acc.Sugar += item.Sugar * count;
        acc.Carbs += item.Carbs * count;
        acc.GI += item.GI * count;
        acc.GL += item.GL * count;

        return acc;
      },
      new FoodStatsClass(0, 0, 0, 0, 0, 0, 0)
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

  const onUp = (e) => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);

    //ADDS ITEM TO PLATE
    if (hoverPlateRef.current.bool && draggingRef.current) {
      console.log("Dropped on plate:", draggingRef.current);

      const existingItem = plateItems.find(item => item._id === draggingRef.current._id);

      const imgToStore = draggingRef.current.Img
      const ID = {
        foodId : draggingRef.current._id,
        count : draggingRef.current.Count
      }
      addVisiblePlateItem(prev => [...prev, {
        posX: e.clientX - hoverPlateRef.current.target.getBoundingClientRect().left,
        posY: e.clientY - hoverPlateRef.current.target.getBoundingClientRect().top,
        Img: imgToStore,
        id: ID
      }])
    
      //UI ADDS 1 ITEM TO PLATE WHILE REMOVING FOOD REF COUNT BY 1
      if (existingItem) {
        existingItem.Count = existingItem.Count + 1;
        
        addPlateItem(prev => [...prev, ]);
      }
      else{

        const foodItem = draggingRef.current.copyTableData();
        foodItem.Count = 1;

        addPlateItem(prev => [...prev, foodItem]);
      }

      draggingRef.current.Count = draggingRef.current.Count - 1
      
      if ((parseInt(draggingRef.current.Count) || 0) == 0){
        setInventory([...inventory])
      }
    }

    setDragging(null);
    draggingRef.current = null
  }

  const GetInventory = async () => {
    await axios.get(`http://localhost:3000/api/getinventory/${user._id}`)
    .then((res) => {
      setInventory([])

      res.data?.forEach(item => {
        const foodItem = buildFoodClass(item)

        foodItem.Count = item.count

        setInventory(prev => [...prev, foodItem])
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const createMeal = async () => {
    const cleanData = []

    plateItems.forEach((item) => {
      cleanData.push(
        {
          Name: item.Name,
          Amount: item.Amount * parseInt(item.Count) || 0,
          Measurement: item.Measurement
        }
      )
    })

    await axios.post(`http://localhost:3000/api/getmeal`, {user: user, data: cleanData})
    .then((res) => {
      plateItems([])
      //navigate() to meal history
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const removePlateItem = (item, index) => {
    const foundItem = inventory.find(inventoryItem => inventoryItem._id == item._id)

    if(!foundItem){return}

    item.Count = item.Count - 1 

    if (item.Count >= 0){
      foundItem.Count = foundItem.Count + 1 
    }
    
    if(item.Count <= 0){
      plateItems.splice(index, 1)

      if(filteredFoods){
        filteredFoods.splice(index, 1)
      }
    }

    addVisiblePlateItem(prevItems => prevItems.filter(plateItem => !(plateItem.id.foodId === item._id && plateItem.id.count === foundItem.Count)));
    setInventory([...inventory])
    addPlateItem([...plateItems])
  }

  return (
    <div className='bg-[#292838] h-screen flex flex-col justify-between'>
      
      <div>
        <h2 className='text-white text-center text-5xl'>Welcome back, {user?.username}</h2>
      </div>

      <div className='bg-white h-20'>

      </div>

      <div className='flex justify-around items-center flex-row w-screen h-6/12'>
        <div className='bg-[#15141b] w-[25%] h-full rounded-xl p-3 pb-10 drop-shadow-2xl '>

          <p className='text-white text-3xl text-center mb-3'>Goals</p>

          <div className='w-full h-[90%] text-white flex flex-col justify-start p-3 gap-3 overflow-scroll no-scrollbar'>

            {FoodStatsClass.returnStats().map((item, index) => (
              <FoodStats key={index} statName={item} plateStatData={foodProperties}/>
            ))}

          </div>
        </div>

        <div className='w-[28%] h-full flex flex-col justify-around'>
          
          <div className='w-full h-15 text-center'> 
            <input className='bg-indigo-800 transition duration-1000 hover:drop-shadow-[0_0_10px_rgba(50,20,200,1)] text-white w-3/4 h-full rounded-xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]' type="button" value="✨Suggest a meal using AI✨" />
          </div>

          <div className='bg-[url(../assets/foodIcons/food.png)] drop-shadow-[0_50px_35px_rgba(0,0,0,.5)] bg-contain bg-center bg-no-repeat h-40 w-full'>
            <div 
              className='mx-auto mt-3 w-4/5 h-3/4 relative' 
              onMouseEnter={(e) => { setHoverPlate(true); hoverPlateRef.current = { bool: true, target: e.currentTarget }}}
              onMouseLeave={() => { setHoverPlate(false); hoverPlateRef.current = { bool: false }}}
            >
              {visiblePlateItems.map((item, index) => (
                <PlateComponent key={index} properties={item}/>
              ))}
            </div>

            <div className='absolute inset-0 bg-[url(../assets/foodIcons/plateliner.png)] drop-shadow-[0_-10px_10px_rgba(0,0,0,0.5)] bg-contain bg-center bg-no-repeat z-100 pointer-events-none'/>
          </div>

          <div className='w-full h-15 flex flex-row justify-between'>
            <input className='bg-[#15141b] hover:bg-red-800 transition duration-1000 hover:drop-shadow-[0_0_10px_rgba(100,20,27,1)] text-white w-1/4 h-full rounded-xl drop-shadow-2xl' type="button" value="Clear" onClick={
              () => setShowConfirmation(true)
            }/>
            <input className='bg-[#15141b] hover:bg-green-800 transition duration-1000 hover:drop-shadow-[0_0_10px_rgba(21,100,27,1)] text-white w-1/3 h-full rounded-xl drop-shadow-2xl' type="button" value="Create" onClick={
              () => createMeal()
            }/>
            <input className='bg-[#15141b] hover:bg-orange-800 transition duration-1000 hover:drop-shadow-[0_0_10px_rgba(100,50,27,1)] text-white w-1/4 h-full rounded-xl drop-shadow-2xl' type="button" value="Undo" />
          </div>
        </div>

        <div className='bg-[#15141b] w-[25%] h-full p-3 flex flex-col justify-center items-center rounded-xl gap-3 drop-shadow-2xl'>
          <p className='text-white text-3xl text-center'>Foods on plate</p>

          <input className='bg-white w-full h-10  text-center text-xl' type="text" placeholder='Search' name="" id="" onChange={
            (e) => {
              setSearch(e.target.value)
            }
          }/>

          <div className='h-full w-full p-3 overflow-scroll no-scrollbar flex flex-col gap-3'>
            {(filteredFoods || plateItems).map((item, index) => (
              <FoodListItem key={index} Img={item.Img} Count={item.Count} Name={item.Name} Amount={item.Amount} Measurement={item.Measurement} ClickAction={
                () => removePlateItem(item, index)
              }/>
            ))}
          </div>

        </div>

      </div>

      <div className='bg-[#15141b] w-full h-25 p-2 flex flex-row'>

        <div className='w-[91%] h-full flex flex-row gap-3 overflow-scroll flex-wrap no-scrollbar scroll-smooth'>
          {inventory.slice().sort((a, b) => a.Name.localeCompare(b.Name)).map(item => (
            item.buildIconWithDrag(startDrag)
          ))}
        </div>

        <div className='bg-[#222238] hover:bg-[#181827] transition h-21 w-35 flex flex-col p-2 fixed right-2' onClick={() => navigate("/store")}>
          <div className="bg-[url(../assets/images/trolley.png)] not-odd:w-full saturate-75 h-full bg-no-repeat bg-center bg-contain" ></div>
          <p className='text-white text-center w-full'>Shop</p>
        </div>

      </div>

      <DragLayer dragging = {dragging}/>
      {showConfirmation && <ClearConfirmation onCancel={() => setShowConfirmation(false)} onClear={() => {
        setShowConfirmation(false)
        window.location.reload()
      }}/>}

    </div>
  )
}

export default Dashboard