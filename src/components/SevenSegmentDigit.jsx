import '../styles/SevenSegmentDigit.css'
import '../styles/theme.css'

const SEGMENTS = [
  // a, b, c, d, e, f, g
  [1,1,1,1,1,1,0], // 0
  [0,1,1,0,0,0,0], // 1
  [1,1,0,1,1,0,1], // 2
  [1,1,1,1,0,0,1], // 3
  [0,1,1,0,0,1,1], // 4
  [1,0,1,1,0,1,1], // 5
  [1,0,1,1,1,1,1], // 6
  [1,1,1,0,0,0,0], // 7
  [1,1,1,1,1,1,1], // 8
  [1,1,1,1,0,1,1], // 9
]

export default function SevenSegmentDigit({ digit, color = '#FFFFFF', offColor = '#000000', style = {} }) {
  const seg = SEGMENTS[digit] || [0,0,0,0,0,0,0]
  const baseWidth = 64
  const baseHeight = 116
  return (
    <div
      className="seven-segment-digit"
      style={{
        width: baseWidth,
        height: baseHeight,
        display: 'inline-block',
        ...style // <-- Allow custom styles from parent
      }}
    >
      <div className={`seg a ${seg[0] ? 'on' : ''}`} style={{background: seg[0] ? color : offColor}} />
      <div className={`seg b ${seg[1] ? 'on' : ''}`} style={{background: seg[1] ? color : offColor}} />
      <div className={`seg c ${seg[2] ? 'on' : ''}`} style={{background: seg[2] ? color : offColor}} />
      <div className={`seg d ${seg[3] ? 'on' : ''}`} style={{background: seg[3] ? color : offColor}} />
      <div className={`seg e ${seg[4] ? 'on' : ''}`} style={{background: seg[4] ? color : offColor}} />
      <div className={`seg f ${seg[5] ? 'on' : ''}`} style={{background: seg[5] ? color : offColor}} />
      <div className={`seg g ${seg[6] ? 'on' : ''}`} style={{background: seg[6] ? color : offColor}} />
    </div>
  )
}