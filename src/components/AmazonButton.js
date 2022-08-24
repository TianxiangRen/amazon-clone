import React from 'react'
import './AmazonButton.css'

const AmazonButton = ({text, style, onClick}) => {
  return (

    <button className="button" style={style} onClick={onClick}>{text}</button>

  )
}

export default AmazonButton