import React, { use, useState } from 'react'
import { useEffect } from 'react'
import questions from '../../assets/questions.json'
import {Option, Input} from './Option'
import { FoodStatsClass } from '../FoodComponents/Food'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Questionnaire = ({user}) => {

  const[questionNum, setQuestionNum] = useState(0)
  const[renderComponents, setRenderComponents] = useState(null)
  const[choosenQuestion, setChoosenQuestion] = useState([])
  const[questionnaireData, setQuestionnaireData] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    buildQuestion(questionNum)
  },[questionNum])


  const buildQuestion = (number) => {
    const currentQuestion = questions.questions[number]
    console.log(currentQuestion)

    setChoosenQuestion(currentQuestion)
    
    if(currentQuestion.type == "singleChoice"){
      setRenderComponents(currentQuestion.options.map((item, index) => {
        return <Option key={index} data={item} setQuestionnaireData={setQuestionnaireData} question={currentQuestion.question}/>
      }))
    }

    if(currentQuestion.type == "inputGroup"){
      setRenderComponents(currentQuestion.fields.map((item, index) => {
        return <Input key={index} index={index} data={item} question={currentQuestion.question} setQuestionnaireData={setQuestionnaireData}/>
      }))
    }
    
  }

  const buildData = async (e) =>{
    e.preventDefault()

    if(questionnaireData.length <= 0){return}

    const goal = new FoodStatsClass(0,0,0,0,0)
    console.log(questionnaireData)

    const gender = questionnaireData["What's your gender?"]
    const weightGoal = questionnaireData["What's your goal?"].toLowerCase().split(' ')[0]
    const ageheightweight = questionnaireData["What's your age, height, and weight?"]
    const exercise = questionnaireData["Weekly activity/exercise:"].split(' ')[0]

    const age = ageheightweight.age
    const height = ageheightweight.height
    const weight = ageheightweight.weight

    let activity

    if(weightGoal == "lose"){
      activity = 1.375
    }
    else if(weightGoal == "gain"){
      activity = 1.55
    }
    else{
      activity=1.725
    }

    const BMR = gender === "male"
    ? 10*weight + 6.25*height - 5*activity + 5
    : 10*weight + 6.25*height - 5*activity - 161;

    const TDEE = BMR * activity

    const calories =
    weightGoal === "lose" ? TDEE - 500 :
    weightGoal === "gain" ? TDEE + 400 :
    TDEE;
    
    const protein =
    goal === "lose" ? 2.0*weight :
    goal === "gain" ? 1.8*weight :
    1.6*weight;

    const fat = 0.9*weight
    const carbs = (calories - (protein*4 + fat*9)) / 4;
    const sugars = Math.min(50, calories*0.10/4);

    goal.Calories = calories/3
    goal.Protein = protein/3
    goal.Fat = fat/3
    goal.Sugar = sugars/3
    goal.Carbs = carbs/3

    axios.post(`http://localhost:3000/api/updategoals`, {user : user, goals: JSON.stringify(goal)}, {withCredentials: true})
    .then((res) => {
      navigate(`/dashboard/${user._id}`)
    })
    .catch((error) => {

    })
  }

  return (
    <div className='bg-[#292838] w-full h-screen flex justify-center items-center gap-5 flex-col'>
      <div className='bg-[#15141b] w-1/2 h-2/3 drop-shadow-2xl rounded-xl flex flex-col justify-around items-center p-10'>
        <p className='text-white text-5xl text-center'>{choosenQuestion.question}</p>

        <div className='w-full h-1/2 flex flex-row flex-wrap gap-5 justify-center items-start'>
          {renderComponents}
        </div>
      </div>

      <div className='h-1/12 w-1/2 text-xl text-white flex flex-row justify-center '>
        <div className='w-2/5 h-full'>
          <button className='bg-[#15141b] h-full w-2/4 drop-shadow-2xl rounded-xl hover:bg-red-800 transition duration-1000 hover:drop-shadow-[0_0_10px_rgba(100,20,27,1)]' onClick={() =>
            {
              if(questionNum <= 0) {return}
              setQuestionNum(prev => prev - 1)
            }
          }>Back</button>
        </div>

        <div className='w-3/5 h-full flex flex-row justify-end gap-5'>
          {questionNum != 3 && <button className='bg-[#15141b] h-full w-2/7 drop-shadow-2xl rounded-xl hover:bg-orange-800 transition duration-1000 hover:drop-shadow-[0_0_10px_rgba(100,50,27,1)]' onClick={() =>
            {
              if(questionNum == 3) {return}
              setQuestionNum(prev => prev + 1)
            }}
            >Next</button>}
          {questionNum == 3 && <button className='bg-[#15141b] h-full w-2/7 drop-shadow-2xl rounded-xl hover:bg-green-800 transition duration-1000 hover:drop-shadow-[0_0_10px_rgba(21,100,27,1)]' onClick={
            (e) => buildData(e)
          }>Finish</button>}
        </div>

      </div>
    </div>
  )
}

export default Questionnaire