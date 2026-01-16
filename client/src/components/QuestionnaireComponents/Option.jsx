import React, { useState } from 'react'

const Option = ({data, setQuestionnaireData, question}) => {

  return (
    <div className='w-2/5 h-1/4 bg-[#1c1c29] rounded-xl flex items-center p-4 gap-3'>
        <input type='radio' className='text-white accent-indigo-800' name='i' value={data} onChange={(e) => {
            setQuestionnaireData(prev => ({ ...prev, [question]: data }))
        }}/>
        <p className='text-white'>{data}</p>
    </div>
  )
}

const Input = ({data, setQuestionnaireData, question}) => {

    const [inputData, setInputData] = useState({});

    const handleChange = (fieldName, value) => {

        const newInputData = { ...inputData, [fieldName]: value };
        setInputData(newInputData);

        setQuestionnaireData(prev => ({
          ...prev,
          [question]: {
            ...prev[question], 
            [fieldName]: value     
          }
        }));
      };
      

    return (
      <div className='w-2/5 h-1/4 bg-[#1c1c29] rounded-xl flex items-center p-4 gap-3'>
            <p className='text-white'>{data.name}</p>

          <input type={data.type} className='text-white accent-indigo-800 bg-[#2f2f42] rounded-2xl w-4/5 h-full p-3' name='i' onChange={(e) => {
            const rawValue = e.target.value
            handleChange(data.name, rawValue);
          }}/>
          <p className='text-white'>{data.unit}</p>
      </div>
    )
}

export {Option, Input}