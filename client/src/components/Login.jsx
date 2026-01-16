import React from 'react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate} from 'react-router-dom';
/* import '../css/Login.css' */
import axios from 'axios';
import svgPaths from "../assets/images/svgs";

const Login = ({ CreateCookie, user }) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const [userd, setUser] = useState()

  useEffect(() => {
    if (user){
      navigate(`/dashboard/${user._id}`)
      console.log('workin')
    }
  }, [userd])


  const submit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target); 
    const formData = Object.fromEntries(form.entries())

     axios.post('http://localhost:3000/login', formData)
    .then(function (response) {
      CreateCookie(response.data)
      setUser(response.data)
      navigate(`/dashboard/${user?._id}`)

    })
    .catch(function (error) {
      setMessage(error.response?.data)
    });
  }

  return (
    <form onSubmit={submit} id='LogIn' className="bg-[#f8f5f2] content-stretch flex flex-col items-start relative size-full h-screen w-screen overflow-hidden">

      <div className="h-[934px] relative shrink-0 w-[1388.24px] mx-auto overflow-hidden">
        <div className="absolute inset-[-2.08%_-1.67%_-2.94%_-1.69%] overflow-hidden">
          <svg className="block size-full overflow-hidden" fill="none" preserveAspectRatio="none" viewBox="0 0 1436 982">
            <g filter="url(#filter0_d_8_1473)" id="Vector 1">
              <path d={svgPaths.p1c7c8700} fill="var(--fill-0, #6D597A)" />
              <path d={svgPaths.p1c7c8700} stroke="var(--stroke-0, black)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="980.842" id="filter0_d_8_1473" width="1434.77" x="0.599993" y="0.6">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="11.45" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_8_1473" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_8_1473" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      <div className="absolute backdrop-blur-[6.7px] backdrop-filter bg-gray-300 h-[463px] overflow-clip rounded-[40px] shadow-[0px_4px_17.1px_1px_rgba(0,0,0,0.25)] translate-x-[-50%] translate-y-[-50%] w-[695px]" style={{ top: "calc(50% + 51px)", left: "calc(50% - 1.5px)" }}>
        <div className="absolute bg-[#f8f5f2] h-[59px] left-[126px] rounded-[40px] top-[61px] w-[442px]">
          <input placeholder='Username' className='w-full h-full px-6 rounded-[40px] outline-none border-none' type="text" id="user" name='username'/>
        </div>

        <div className="absolute bg-[#f8f5f2] h-[59px] left-[126px] rounded-[40px] top-[163px] w-[442px]">
          <input placeholder='Password' className='w-full h-full px-6 rounded-[40px] outline-none border-none' name="password" type='password' id="passLog"/>
        </div>

        <div className="absolute bg-[#3c6e91] bottom-[89px] h-[59px] left-1/2 rounded-[40px] translate-x-[-50%] w-[319px]">
          <input className='w-full h-full px-6 rounded-[40px] outline-none border-none text-white'  id='Log' type="submit" value="Continue"  name='button'/>
        </div>

        <div className="absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold h-[30px] justify-center leading-[0] left-[82px] not-italic right-[82px] text-[#e07a5f] text-[24px] text-center top-[274px] tracking-[-0.6px] translate-y-[-50%]">
          <p className="leading-[1.1]">{message}</p>
        </div>

        <div className="absolute bottom-[41px] flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] left-1/2 not-italic text-[20px] text-center text-nowrap text-[#2b2b2b] tracking-[-0.5px] translate-x-[-50%] translate-y-[50%]">
          <Link to={`/signup`} style={{textDecoration: 'none'}}>
            <p className="leading-[1.1] whitespace-pre">Sign up</p>
          </Link>
        </div>

      </div>

      <div className="[text-shadow:rgba(0,0,0,0.25)_0px_4px_4px] absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold h-[62px] justify-center leading-[0] not-italic text-[56px] text-[#2b2b2b] top-[151px] tracking-[-1.4px] translate-y-[-50%] w-[600px]" style={{ left: "calc(50% - 302px)" }}>
        <div className="leading-[1.1]">Continue Your Journey</div>
      </div>

    </form>
    /* <div id='loginBackground'>
        <div id='ErsteLogo'></div>

      <div id="wrapperLog">

        <div id='MainLogo' style={{position: 'absolute', top: 7 +'vh', height: 12 + 'vh', width: 12 + 'vh'}}></div>

        <h2>Resume Your Quest</h2>

        <form onSubmit={submit} id='LogIn'>
  


          <Link to={`/signup`} style={{textDecoration: 'none'}}>
            <p style={{fontWeight: 500, color: "rgb(223, 230, 255)" }}>Sign Up</p>
          </Link>
  
          <p id='Error'>{message}</p>
  
          
        </form>

      </div>

      <div id='slogan'>
        <p>FINANCE MADE SIMPLE</p>
      </div>

    </div> */
  )
}

export default Login
