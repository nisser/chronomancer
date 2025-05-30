import { useEffect, useState, useMemo } from 'react'
import './styles/App.css'
import Clock from './components/Clock'

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
  const [drawerOpen, setDrawerOpen] = useState(false)

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
      <button
          style={{
            margin: '0px 0',
            background: themeColors.bgColor,
            color: themeColors.bgColor,
            border: 'none',
            borderRadius: '0px',
            padding: '0px 0px',
            cursor: 'pointer'
          }}
          onClick={() => setDrawerOpen(open => !open)}
        >
          <img src="src/assets/icon_drawer.png" alt="null" />
        </button>
        <div className={`drawer drawer-top${drawerOpen ? ' open' : ''}`} 
        style={{ width: '400px', height: '250px',
          borderRadius: '250px 250px 0px 0px',
          boxShadow: '0px 0px 20px 0px #000000 inset',}}>
          <div style={{ padding: '0px', color: themeColors.textColor, alignItems: 'center', textAlign: 'center', width: '100%', height: '100%' }}>
            This is the drawer content!
          </div>
        </div>
      <div
        className="clock-box"
        style={{
          background: themeColors.bgColor,
          borderRadius: '20px',
          boxShadow: '0px 0px 20px 0px #000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ padding: '40px 40px' }}>
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
      </div>
    </div>
  )
}

export default App