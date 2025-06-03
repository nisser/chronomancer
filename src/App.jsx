import { useEffect, useState, useMemo } from 'react'
import './styles/App.css'
import Clock from './components/Clock'
import WobblyClock from './components/WobblyClock'
import Drawer from './components/Drawer'
import BottomDrawer from './components/BottomDrawer'
import FortunesData from './assets/fortunes.json'
import { useRef } from 'react';

// Helper hook to get previous value
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

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
  const [drawerOpen, setDrawerOpen] = useState(true)
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(true)
  const [wobbleTrigger, setWobbleTrigger] = useState(0)
  const [randomFortune, setRandomFortune] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000) // update every second for clock
    return () => clearInterval(interval)
  }, [])

  // On mount
  useEffect(() => {
    if (FortunesData && FortunesData.length > 0) {
      const idx = Math.floor(Math.random() * FortunesData.length);
      setRandomFortune(FortunesData[idx].message); // <-- use .message
    }
  }, [])

  // Calculate day completion percentage
  const secondsSinceMidnight = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds()
  const dayPercent = ((secondsSinceMidnight / 86400) * 100).toFixed(2)

  const handleDrawerToggle = () => {
    setDrawerOpen(open => {
      const newOpen = !open;
      if (!newOpen) setWobbleTrigger(t => t + 1);
      return newOpen;
    });
  }

  const prevBottomDrawerOpen = usePrevious(bottomDrawerOpen);

  useEffect(() => {
    if (prevBottomDrawerOpen === undefined) return; // skip first render
    if (prevBottomDrawerOpen && !bottomDrawerOpen) {
      if (FortunesData && FortunesData.length > 0) {
        const idx = Math.floor(Math.random() * FortunesData.length);
        setRandomFortune(FortunesData[idx].message);
      }
    }
  }, [bottomDrawerOpen, prevBottomDrawerOpen]);

  return (
    <div className="app-wrapper">

      <Drawer open={drawerOpen} setOpen={setDrawerOpen} >
        <button
          onClick={handleDrawerToggle}
          style={{
            background: themeColors.bgColor,
            cursor: 'pointer',
            border: 'none',
            zIndex: 3,
            position: 'absolute',
            marginTop: '-30px',
            borderRadius: '5px',
            padding: '0px 0px',
          }}
        >
          <img src="src/assets/icon_drawer.png" alt="null" />
        </button>

        <img
          src={'src/assets/arrow.png'}
          alt="arrow"
          style={{
            width: '50px',
            position: 'absolute',
            zIndex: 4,
            marginTop: '-10px',
          }}
        />

        <div
          className="mask-half"
          style={{
            width: 400,
            height: 200,
            overflow: 'visible',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 3,
          }}
        >
          <WobblyClock targetAngle={-dayPercent * 3.6 - 180} wobbleTrigger={wobbleTrigger} />
        </div>
      </Drawer>

      <div
        className="clock-box"
        style={{
          background: themeColors.bgColor,
          borderRadius: '20px',
          boxShadow: '0px 0px 20px 0px #000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 2,
          position: 'relative',
        }}
      >
        <div style={{ padding: '60px 60px' }}>
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
      <BottomDrawer open={bottomDrawerOpen} setOpen={setBottomDrawerOpen} >
        <button
          style={{
            background: themeColors.bgColor,
            cursor: 'pointer',
            border: 'none',
            zIndex: 3,
            position: 'absolute',
            marginTop: '208px',
            borderRadius: '5px',
            padding: '0px 0px',
          }}
          onClick={() => setBottomDrawerOpen(open => !open)}
        >
          <img src="src/assets/icon_drawer.png" alt="null" />
        </button>
        <div style={{ marginTop: 48, color: themeColors.textColor, textAlign: 'center' }}>
          {randomFortune}
        </div>
      </BottomDrawer>
    </div>
  )
}

export default App