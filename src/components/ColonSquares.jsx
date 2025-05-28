import React from 'react'
import '../styles/ColonSquares.css'

export default function ColonSquares({ color = '#A62639', size = 18, gap = 10, style = {} }) {
  const squareStyle = {
    width: size,
    height: size,
    background: color,
    margin: 0,
    display: 'block'
  }
  return (
    <span
      className="colon-squares"
      style={{
        height: size * 2 + gap,
        ...style
      }}
    >
      <span className="colon-square" style={squareStyle} />
      <span className="colon-square" style={{ ...squareStyle, marginTop: gap }} />
    </span>
  )
}