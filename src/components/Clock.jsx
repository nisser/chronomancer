import SevenSegmentDigit from './SevenSegmentDigit'
import ColonSquares from './ColonSquares'

export default function Clock({
  hours,
  minutes,
  seconds,
  segmentColor = '#CAD2C5',
  size = 80,
  colonGap = 26,
  colonStyle = { marginTop: -28 }
}) {
  const [h1, h2] = hours.toString().padStart(2, '0')
  const [m1, m2] = minutes.toString().padStart(2, '0')
  const [s1, s2] = seconds.toString().padStart(2, '0')

  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '6rem', gap: '8px' }}>
      <SevenSegmentDigit
        digit={+h1}
        color={segmentColor}
        size={size}
        style={{ marginRight: '-15px' }} // Reduce gap after first digit
      />
      <SevenSegmentDigit
        digit={+h2}
        color={segmentColor}
        size={size}
      />
      <ColonSquares color={segmentColor} size={size / 8} gap={colonGap} style={colonStyle} />
      <SevenSegmentDigit digit={+m1} color={segmentColor} size={size} style={{ marginRight: '-15px' }} />
      <SevenSegmentDigit digit={+m2} color={segmentColor} size={size} />
      <ColonSquares color={segmentColor} size={size / 8} gap={colonGap} style={colonStyle} />
      <SevenSegmentDigit digit={+s1} color={segmentColor} size={size} style={{ marginRight: '-15px' }} />
      <SevenSegmentDigit digit={+s2} color={segmentColor} size={size} />
    </div>
  )
}