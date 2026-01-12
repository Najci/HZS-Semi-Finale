import React, { useEffect, useState } from 'react'
/* import '../css/Dashboard.css' */
import { Link, useNavigate } from 'react-router-dom'
import Leaderboard from './Leaderboard'
import QuestionMark from '../assets/qm.png'
import axios from 'axios'

import svgPaths from "../assets/svgs";
import imgConfidence1 from "../assets/Logo.png";

const Dashboard = ({user, logoutFunction}) => {
  const navigate = useNavigate()
  const [high, setHigh] = useState("")

  useEffect(() => {
    axios.post("http://localhost:3000/dashboard", {data : user})
    .then((res)=>{
      console.log(res)
      setHigh(res.data)
    })

  },[user.highScore])

  return (
    <div className="bg-[#f8f5f2] content-stretch flex flex-col items-start relative size-full h-screen w-screen overflow-hidden">
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
      
      <div className="absolute backdrop-filter bg-[rgba(209,213,219,0)] h-[934px] left-1/2 overflow-clip top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1280px]">
      
      <div className=" absolute backdrop-blur-[6.7px] backdrop-filter bg-gray-300 h-[529px] overflow-clip rounded-[40px] shadow-[0px_4px_17.1px_1px_rgba(0,0,0,0.25)] top-[225px] translate-x-[-50%] w-[889px]" style={{ left: "calc(50% + 0.5px)" }}>
        <div className="absolute font-['Inter:Bold',_sans-serif] font-bold leading-[0] not-italic text-[#2b2b2b] text-[64px] text-center text-nowrap top-[20px] tracking-[-1.6px] translate-x-[-50%]" style={{ left: "calc(50% - 0.5px)" }}>
          <p className="leading-[1.1] whitespace-pre">Leaderboard</p>
        </div>
        <table className="mx-auto absolute top-[125px] w-[700px] h-[29px] left-0 right-0" data-name="table">
          <Leaderboard user={user}/>
        </table>
      </div>

      <div className="absolute left-1/2 size-[106px] top-[26px] translate-x-[-50%]" data-name="confidence 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgConfidence1} />
      </div>
      <div className="absolute font-['Inter:Extra_Light_Italic',_sans-serif] font-extralight italic leading-[0] text-[#2b2b2b] text-[40px] text-center text-nowrap top-[157px] tracking-[-1px] translate-x-[-50%]" style={{ left: "calc(50% + 0.5px)" }}>
        <p className="leading-[1.1] whitespace-pre">Welcome back, {user.username}</p>
      </div>
      
      <div onClick={() => navigate('/game')} className="absolute bg-[#3c6e91] box-border content-stretch flex items-center justify-center left-1/2 overflow-clip px-[112px] py-[9px] rounded-[20px] shadow-[0px_4px_14.3px_4px_rgba(0,0,0,0.25)] top-[797px] translate-x-[-50%]">
        <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[40px] text-center text-nowrap text-white tracking-[-1px]">
          <p className="leading-[1.1] whitespace-pre">Play</p>
        </div>
      </div>

      <div className="[text-shadow:rgba(0,0,0,0.25)_0px_5px_5px] absolute bottom-[63px] font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic text-[#2b2b2b] text-[40px] text-center text-nowrap tracking-[-1px] translate-x-[-50%] translate-y-[100%]" style={{ left: "calc(50% + 0.5px)" }}>
        <p className="leading-[1.1] whitespace-pre">High Score: {high}</p>
      </div>
      
      <button onClick={() => {logoutFunction(), navigate('/')}} className="absolute bg-[#3c6e91] box-border content-stretch flex gap-[8px] h-[51px] items-center justify-center px-[16px] py-[12px] right-[14px] rounded-[12px] shadow-[0px_4px_12.9px_0px_rgba(0,0,0,0.25)] top-[14px] w-[245px]" data-name="Primary button">
        <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-center text-nowrap text-white tracking-[-0.1px]">
          <p className="leading-[1.45] whitespace-pre">Sign Out</p>
        </div>
      </button>

    </div>

    </div>
    /* <div id='sideWrapper'>
      <button id='Logout' onClick={() => {logoutFunction(), navigate('/')}}>Sign Out</button>

      <div id='MainLogo' style={{height: 25 + 'vh', width: 25 + 'vh', marginTop: 2 + "%"}}></div>


      <div id='sidebarButtonWrapper'>
        <Leaderboard user={user}/>

        <div id="gameWrap">
          <div id='Game' className='sideWrapperButton' onClick={() => navigate('/game')}>Play</div>
          <div id='instructions' onClick={() => navigate('/instructions')}><img style={{height: 6 + "vh"}} src={QuestionMark} /></div>
        </div>

      </div>

    </div> */
  )
}

export default Dashboard