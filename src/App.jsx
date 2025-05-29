import { useEffect, useState, useMemo } from 'react'
import './styles/App.css'
import Clock from './components/Clock'
import SevenSegmentDigit from './components/SevenSegmentDigit'

function App() {
  // Get theme colors from CSS variables
  const themeColors = useMemo(() => {
    const styles = getComputedStyle(document.documentElement)
    return {
      bgColor: styles.getPropertyValue('--background-color').trim(),
      primColor: styles.getPropertyValue('--primary-color').trim(),
      textColor: styles.getPropertyValue('--text-color').trim()
    }
  }, [])

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000) // update every second for clock
    return () => clearInterval(interval)
  }, [])

  // Calculate day completion percentage
  const secondsSinceMidnight = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds()
  const dayPercent = ((secondsSinceMidnight / 86400) * 100).toFixed(2)

  return (
    <div className="app-wrapper">
      <div
        className="clock-box"
        style={{
          background: themeColors.bgColor,
          borderRadius: '20px',
          padding: '40px 40px',
          boxShadow: '0px 0px 20px 0px #000000 inset',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Clock
          hours={time.getHours()}
          minutes={time.getMinutes()}
          seconds={time.getSeconds()}
          onColor={themeColors.primColor}
          offColor={themeColors.bgColor}
          size={80}
          colonGap={26}
          colonStyle={{ marginTop: 0 }}
        />
      </div>
      {/* <div
        style={{
          color: themeColors.textColor,
          marginTop: '32px',
          fontFamily: "'Consolas', monospace",
          fontSize: '28px',
          userSelect: 'none'
        }}
      >
        The day is {dayPercent}% completed
      </div> */}
    </div>
  )
}

export default App