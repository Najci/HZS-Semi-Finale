import React from 'react'
/* import '../css/Footer.css' */

const Footer = ({cookie}) => {
  if(cookie){
    return (
      <footer>
        <p> &copy; EduSphinx</p>
      </footer>
    )
  }
}

export default Footer