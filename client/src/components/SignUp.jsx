import React from 'react'
import { useEffect, useState } from 'react'
/* import '../css/SignUp.css' */
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import svgPaths from "../assets/images/svgs";

function Frame3() {
  return <div className="absolute bg-white h-[59px] left-[78px] right-[86px] rounded-[40px] top-[37px]">
    <input placeholder='Username' className='w-full h-full px-6 rounded-[40px] outline-none border-none' type="text" id="user" name='username'/>
  </div>;
}

function Frame4() {
  return <div className="absolute bg-white h-[59px] left-[78px] right-[86px] rounded-[40px] top-[133px]">
    <input placeholder='Email' className='w-full h-full px-6 rounded-[40px] outline-none border-none' name="email" type="text" id="email"/>
  </div>;
}

function Frame5() {
  return <div className="absolute bg-[#3c6e91] bottom-[89px] h-[59px] left-1/2 rounded-[40px] translate-x-[-50%] w-[319px]">
    <input className='w-full h-full px-6 rounded-[40px] outline-none border-none text-white' id='Sign' type="submit" value="Begin"  name='button'/>
  </div>;
}

function Frame6() {
  return <div className="absolute bg-white h-[59px] left-[78px] rounded-[40px] translate-y-[-50%] w-[234px]" style={{ top: "calc(50% + 0.5px)" }}>
    <input placeholder='Password' className='w-full h-full px-6 rounded-[40px] outline-none border-none' name="password" type='password' id="pass"/>
  </div>;
}

function Frame7() {
  return <div className="absolute bg-white h-[59px] right-[86px] rounded-[40px] translate-y-[-50%] w-[234px]" style={{ top: "calc(50% + 0.5px)" }}>
    <input placeholder='Confirm Password' className='w-full h-full px-6 rounded-[40px] outline-none border-none' name="repeatPassword" type="password" id="cpass"/>
  </div>;
}

const SignUp = ({user, CreateCookie}) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    if (user){
      navigate('/dashboard')
      console.log('workin')
    }
  }, [])

  const submit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target); 
    const formData = Object.fromEntries(form.entries())

    axios.post('http://localhost:3000/signup', formData)
    .then(function (response) {
      CreateCookie(response.data)
      navigate('/dashboard')
      console.log(response.data)
    })
    .catch(function (error) {
      setMessage(error.response.data)
    });
      
  }

  return (
    <form onSubmit={submit} id='SignUp' className="bg-[#f8f5f2] content-stretch flex flex-col items-start relative size-full h-screen w-screen overflow-hidden">
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

      <div className="absolute backdrop-blur-[6.7px] backdrop-filter bg-gray-300 h-[518px] overflow-clip rounded-[40px] shadow-[0px_4px_17.1px_1px_rgba(0,0,0,0.25)] translate-x-[-50%] translate-y-[-50%] w-[695px]" style={{ top: "calc(50% + 78.5px)", left: "calc(50% - 1.5px)" }}>
      <Frame3 />
      <Frame4 />
      <Frame5 />
      <div className="absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold h-[30px] justify-center leading-[0] left-[343.5px] not-italic text-[#e07a5f] text-[24px] text-center top-[342px] tracking-[-0.6px] translate-x-[-50%] translate-y-[-50%] w-[531px]">
        <p className="leading-[1.1]">{message}</p>
      </div>
      <div className="absolute bottom-[41px] flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] left-1/2 not-italic text-[#2b2b2b] text-[20px] text-center text-nowrap tracking-[-0.5px] translate-x-[-50%] translate-y-[50%]">
        <Link to={`/login`} style={{textDecoration: 'none'}}>
          <p className="leading-[1.1] whitespace-pre">Log in</p>
        </Link>
      </div>
      <Frame6 />
      <Frame7 />
    </div>
      
      <div className="[text-shadow:rgba(0,0,0,0.25)_0px_4px_4px] absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold h-[62px] justify-center leading-[0] left-1/2 not-italic text-[#2b2b2b] text-[56px] text-center top-[164px] tracking-[-1.4px] translate-x-[-50%] translate-y-[-50%] w-[600px]">
        <div className="leading-[1.1]">Begin Your Journey</div>
      </div>
    </form>
  )
}

export default SignUp
