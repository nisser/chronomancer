import { useEffect, useState } from 'react'
import './styles/App.css'
import Clock from './components/Clock'

function App() {
  const bgColor = "#001D3D" // <--- Set your background color here
  const segmentColor = "#979dac" // <--- Set your color here
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
          background: bgColor,
          borderRadius: '18px',
          padding: '2.5rem 2.5rem',
          boxShadow: '0 4px 32px #0004',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Clock
          hours={time.getHours()}
          minutes={time.getMinutes()}
          seconds={time.getSeconds()}
          segmentColor={segmentColor}
        />
      </div>
      <div
        style={{
          color: '#FDFFFC',
          marginTop: '2rem',
          fontFamily: "'Londrina Shadow', monospace",
          fontSize: '1.5rem',
          userSelect: 'none'
        }}
      >
        The day is {dayPercent}% completed
      </div>
    </div>
  )
}

export default App