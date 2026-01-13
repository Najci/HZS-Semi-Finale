import React from 'react'
/* import '../css/Instructions.css' */
import { useNavigate } from 'react-router-dom'

const Instructions = () => {
    const navigate = useNavigate()

    return (
        <div id="instructionsWrapper">
            <img onClick={() => {navigate("/dashboard")}} id='BackButton' src={imgStrela} alt="" />

        <div id="instructionsPage">
                <h1>How to play</h1>

                <ul>     
                    <li><p>Welcome to Pluralia, a financial education game. This is a guide for first timers and those having trouble understanding the premise of the game.</p> </li>
                    <li><p>To start the game click the “Play” button on the home screen, after which you will be brought to the main game screen.</p></li> 
                    <li><p> The premise of the game is to survive as long as possible by managing your funds and keeping a close eye at your happiness and fullness meter which you will be managing by choosing options from the given circumstances.</p></li>
                    <li><p> Options you choose will cost you money and increase or decrease your fullness/happiness meter so be careful what you choose.</p></li>
                    <li><p>Some important financial words might be highlighted in green, so be sure to hover over them to learn more about what they mean!</p></li>
                </ul>
        </div>
        </div>
    )
}

export default Instructions