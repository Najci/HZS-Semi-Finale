import React from 'react'
/* import "../css/GameOver.css" */
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import svgPaths from "../assets/svgs";

const GameOver = ( {data, user} ) => {
    const navigate = useNavigate()

    const BTH = () => {
        axios.delete("http://localhost:3000/api/game/delete", { data: user })
        .then((res) =>{
            navigate("/")
        })
    }

  return (
    <div className="bg-[#f8f5f2] content-stretch flex flex-col items-start relative size-full">
      <div className="h-[934px] relative shrink-0 w-[1388.24px]">
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
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-[70px] leading-[0] not-italic text-[#2b2b2b] text-[64px] text-center top-[74px] tracking-[-1.6px] translate-x-[-50%] w-[517px]" style={{ left: "calc(50% + 0.5px)" }}>
        <p className="leading-[1.1]">Game Over</p>
      </div>
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic text-[#2b2b2b] text-[48px] text-center text-nowrap tracking-[-1.2px] translate-x-[-50%]" style={{ top: "calc(50% - 35px)", left: "calc(50% + 0.5px)" }}>
        <p className="leading-[1.1] whitespace-pre">High Score: {data?.highScore}</p>
      </div>
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[0] left-1/2 not-italic text-[#2b2b2b] text-[48px] text-center text-nowrap top-[235px] tracking-[-1.2px] translate-x-[-50%]">
        <p className="leading-[1.1] whitespace-pre">Score: {data?.game.score}</p>
      </div>
      
      <div onClick={() =>{BTH()}} className="absolute bg-[#3c6e91] box-border content-stretch flex flex-col h-[72px] items-center justify-center overflow-clip px-[73px] py-0 rounded-[40px] top-[491px] translate-x-[-50%]" style={{ left: "calc(50% + 0.5px)" }}>
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[48px] text-center text-nowrap text-white tracking-[-1.2px]">
        <p className="leading-[1.1] whitespace-pre">Back To Home</p>
      </div>
      </div>

      </div>

    </div>
    /* <div id='GameoverWrapper'>

        <p id='GameScore'>Score: </p>
        <p id='GameScore'>High Score: {data?.highScore}</p>
        <button onClick={() =>{BTH()}} id='RetartButton'> Back To Home </button>
    </div> */
  )
}

export default GameOver