import React, { useEffect, useState } from 'react'
import '../css/Leaderboard.css'
import ShowScore from './Builder/ShowScore'
import axios from 'axios'

    const Leaderboard = ({user}) => {
       const [data, setData] = useState([])
        
        useEffect(() => {
            axios.get("http://localhost:3000/api/leaderboard")
            .then((res) => {
                console.log(res)
                setData(res.data)
            })
        },[])


        return (
            <>              
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>High Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((value, i) => (
                        <ShowScore key={i} data={value} index={i+1} />
                    ))}         
                </tbody>
             </>       
        )
}

export default Leaderboard