import React from 'react'
import parse from 'html-react-parser';

const Answers = ({data, handleSubmit}) => {
  return (
    <button className='bg-[#3c6e91] h-[119px] rounded-[30px] shrink-0 w-[366px] text-white' type="submit" onClick={() => {handleSubmit(data)}}>
        {parse(data.text)}
        <br />
        {data.status}
    </button>
  )
}

export default Answers