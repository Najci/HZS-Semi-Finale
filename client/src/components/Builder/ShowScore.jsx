import React from 'react'

const ShowScore = ({data, index}) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{data.username}</td>
      <td>{data.highScore}</td>
    </tr>
  )
}

export default ShowScore