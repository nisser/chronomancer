import '../styles/ColonSquares.css'

export default function ColonSquares({ color = '#000000', size = 12, gap = 12, style = {} }) {
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