import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate} from 'react-router-dom';
/* import '../css/Game.css' */
import axios from 'axios';
import Answers from './Builder/Answers';
import parse from 'html-react-parser';
import imgProfit from '../assets/profits.png'

import imgSavings from '../assets/piggy-bank.png'
import imgExpense from '../assets/expense.png'
import imgFullness from '../assets/chicken.png'
import GameOver from './GameOver';
import imgStrela from '../assets/strela.png'

import svgPaths from "../assets/svgs";
import imgCompassion1 from "../assets/compassion.png";
import imgConfidence1 from "../assets/confidence.png";
import imgHappiness from '../assets/smiley.png'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Frame11() {
  return <div className="bg-[#3c6e91] h-[119px] rounded-[30px] shrink-0 w-[366px]" />;
}


const Game = ({ user }) => {
  const navigate = useNavigate()
  const [data, setData] = useState(null);
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false)
  const [hide, setHide] = useState(false)
  const hasFetched = useRef(false);
  const [toolTip, setClickedValue] = useState("")
  const [toolTipName, setClickedValueName] = useState("")

  const [list, setList] = useState([]);

  const [sizes, setSizes] = useState({
    parentWidth: 0,
    barWidth: 0,
    parentPos: { x: 0, y: 0 }
  });

  const parentRef = useRef(null);
  const barRef = useRef(null);;

  const income = data?.game.income
  const savings = data?.game.cash
  const expense = data?.game.expenses

  const incomeScore = Math.min((income / 1000) * 100, 100);
  const savingsScore = Math.min((savings / 10000) * 100, 100);
  const expensesScore = Math.max(0, 100 - (expense / income) * 100); 

  const overallScore = (
    0.5 * data?.game.happiness +
    0.2 * data?.game.fullness +
    0.3 * incomeScore +
    0.1 * savingsScore -
    0.1 * (expensesScore - 100)
  );
  
  const maxTravel = sizes.parentWidth - sizes.barWidth;
  const leftPosition = (Math.min(Math.max(overallScore, 0), 100) / 100) * maxTravel;

  const getQuiz = () => {
    setHide(true)
    axios
    .get(`http://localhost:3000/api/game/${user?._id}`)
    .then((res) => {
      console.log(res.data);

      setData(res.data);

      if(res.data?.game.gameOver){
        setGameOver(true)
      }
      else{
        setGameOver(false)
        setQuestion(parse(res?.data?.event.event))
        const items = document.getElementsByClassName("tooltip")
        setList(items)
      }
      setHide(false)
    })
    .catch((err) => {
      setMessage("Error loading game")
      hasFetched.current = false;
      console.log(err)
    });
  }
  
  useEffect(() => {
    if (hasFetched.current) return; 
    hasFetched.current = true;

    getQuiz()

    if (parentRef.current && barRef.current) {
    const parentWidth = parentRef.current.offsetWidth;
    const barWidth = barRef.current.offsetWidth;
    const parentPos = parentRef.current.getBoundingClientRect();

    setSizes({
      parentWidth,
      barWidth,
      parentPos: { x: parentPos.x, y: parentPos.y }
    });
  }}, [hasFetched]);

  useEffect(() => {
    const items = document.getElementsByClassName("tooltip");
    const tooltip = document.getElementById("toolTip")
  
    const handlers = [];
  
    Array.from(items).forEach(item => {
      const handleEnter = () => {
        tooltip.style.display = "flex"
        setClickedValue(item.getAttribute("value")); 
        setClickedValueName(item.textContent)
      };
      const handleLeave = () => {
        tooltip.style.display = "none"
        setClickedValue("");
        setClickedValueName("")
      };
  
      item.addEventListener("mouseenter", handleEnter);
      item.addEventListener("mouseleave", handleLeave);
  
      handlers.push({ item, handleEnter, handleLeave });
    });
  
    return () => {
      handlers.forEach(({ item, handleEnter, handleLeave }) => {
        item.removeEventListener("mouseenter", handleEnter);
        item.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [data]);

  const handleSubmit = (object) => {
    hasFetched.current = false;
    axios.post(`http://localhost:3000/api/game/${user._id}/choice`, { data: object, user })
    .then(function(response) {
      getQuiz()
    })
    .catch(function(error){

    })
  };

 const retireQuiz = () =>{
    axios.post("http://localhost:3000/api/retire", {data : user})
    .then((res) => {
      getQuiz()
    })
    .catch((err) =>{
      
    })
  }

  return (
     <div className="bg-[#f8f5f2] content-stretch flex flex-col items-start relative size-full h-screen w-screen overflow-hidden">
      {gameOver ? (
          <GameOver data={data} user={user}/>
        ) : (
      <>
      <div className="h-[934px] relative shrink-0 w-[1388.24px] mx-auto">
        <div className="absolute inset-[-2.08%_-1.67%_-2.94%_-1.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1436 982">
            <g filter="url(#filter0_d_11_20)" id="Vector 1">
              <path d={svgPaths.p1c7c8700} fill="var(--fill-0, #6D597A)" />
              <path d={svgPaths.p1c7c8700} stroke="var(--stroke-0, black)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="980.842" id="filter0_d_11_20" width="1434.77" x="0.599993" y="0.6">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="11.45" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_11_20" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_11_20" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      
      <div className="absolute backdrop-blur-[6.7px] backdrop-filter bg-gray-300 h-[764px] overflow-clip rounded-[40px] shadow-[0px_4px_17.1px_1px_rgba(0,0,0,0.25)] translate-x-[-50%] translate-y-[-50%] w-[958px]" style={{ top: "calc(50% + 28px)", left: "calc(50% + 4px)" }}>
      
      <button onClick={retireQuiz} className="absolute bg-[#df7a5e] bottom-[21px] h-[67px] left-1/2 overflow-clip rounded-[30px] translate-x-[-50%] w-[366px]">
        <div className="absolute font-['Inter:Bold',_sans-serif] font-bold inset-[23px_-4.5px_22px_-4px] leading-[0] not-italic text-[#f8f5f2] text-[20px] text-center tracking-[-0.5px]">
          <p className="leading-[1.1]">RETIRE</p>
        </div>
      </button>

      <div className="absolute box-border content-stretch flex gap-[69px] h-[144px] items-center justify-center left-0 overflow-clip px-[29px] py-[24px] right-0 top-0">
      <div className="relative shrink-0 size-[120px]" data-name="compassion 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCompassion1} />
      </div>
      <div className="flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#2b2b2b] text-[48px] text-center text-nowrap tracking-[-1.2px]">
        <p className="leading-[1.1] whitespace-pre">{data?.game.compassion}</p>
      </div>
      <div className="relative shrink-0 size-[120px]" data-name="confidence 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgConfidence1} />
      </div>
      <div className="flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#2b2b2b] text-[48px] text-center text-nowrap tracking-[-1.2px]">
        <p className="leading-[1.1] whitespace-pre">{data?.game.confidence}</p>
      </div>
      <div className="relative shrink-0 size-[120px]" data-name="compassion 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgHappiness} />
      </div>
      <div className="flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#2b2b2b] text-[48px] text-center text-nowrap tracking-[-1.2px]">
        <p className="leading-[1.1] whitespace-pre">{data?.game.happiness}</p>
      </div>
      </div>

      {hide ? (
              <Skeleton highlightColor='#444' baseColor='#d1d4db' width={1000} height={764} />
            ) : (
              <>
                <div className="absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic text-[#2b2b2b] text-[64px] text-center text-nowrap top-[211px] tracking-[-1.6px] translate-x-[-50%] translate-y-[-50%]" style={{ left: "calc(50% + 0.5px)" }}>
                <p className="leading-[1.1] whitespace-pre">Day {data?.game.day}</p>
                </div>

                <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[92px] leading-[0] left-[69px] not-italic right-[69px] text-[#2b2b2b] text-[24px] text-center top-[260px] tracking-[-0.6px]">
                  <p className="leading-[1.1]">{question}</p>
                </div>
  
                <div className="absolute bottom-[94px] box-border content-start flex flex-wrap gap-[54px] h-[318px] items-start left-[72px] overflow-clip px-[7px] py-[12px] right-[69px]">
                  {data?.event?.options?.map((value, i) => (
                                <Answers key={i} data={value} handleSubmit={handleSubmit} />
                  ))}
                </div>
              </>
            )}
       </div>          
    </>)}

    <div id='toolTip' className="absolute right-[40px] top-[120px] h-[200px] w-[400px] backdrop-blur-[6.7px] backdrop-filter bg-gray-300 leading-[0] rounded-[40px] shadow-[0px_4px_17.1px_1px_rgba(0,0,0,0.25)] size-full text-[32px] text-center tracking-[-0.8px]">
      <div className="font-['Inter:Bold',_sans-serif] font-bold not-italic text-[#2b2b2b] text-nowrap p-8">
        <p className="leading-[1.1] whitespace-pre" id='Title'>{toolTipName}</p>
      </div>
      <div className="font-['Inter:Extra_Light_Italic',_sans-serif] font-extralight italic text-black text-wrap p-8">
        <p className="leading-[1.1] text-5" id='titlesub'>{toolTip}</p>
      </div>
    </div>

    </div>

    /* <div id='gameWrapper'>
      <img onClick={() => {navigate("/dashboard")}} id='BackButton' src={imgStrela} alt="" />

      <div id='gamePage'>

        {gameOver ? (
          <GameOver data={data} user={user}/>
        ) : (
          <>
            <div id='HH'>
              <div><img height="50" src={imgHappiness} /> {data?.game.happiness}%</div>
              <div><img height="50" src={imgProfit} />  ${data?.game.income}</div>
              <div><img height="50" src={imgSavings} />  ${data?.game.cash}</div>
              <div><img height="50" src={imgExpense} />  ${data?.game.expenses}</div>
              <div><img height="50" src={imgFullness} />  {data?.game.fullness}%</div>
            </div>

            <div ref={parentRef} id='gameBar'>
                  <div ref={barRef} style={{ left: `${leftPosition}px` }} id='gameChoiceBar'></div>
            </div>

            {hide ? (
              <div id='gameLoading'>Loading...</div>
            ) : (
              <>


              </>
            )}
          </>)}
      </div>

      <div id='toolTip'>
        <h1>{toolTipName}</h1>
        {toolTip}
      </div>

    </div> */
  )
}

export default Game
