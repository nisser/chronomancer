import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import clockface from '../assets/clockface.png';

function WobblyClock({ targetAngle, wobbleTrigger }) {
  // Raw motion value (instantly set)
  const angle = useMotionValue(0);

  // Spring that wobbles toward angle
  const animatedAngle = useSpring(angle, {
    stiffness: 100,
    damping: 5,
  });

  // When targetAngle changes, update the motion value
  useEffect(() => {
    angle.set(targetAngle);
  }, [targetAngle]);

  // Wobble when drawer opens
  useEffect(() => {
    // Add a quick "kick" to the angle for wobble
    angle.set(targetAngle + 30);
    setTimeout(() => angle.set(targetAngle), 100);
  }, [wobbleTrigger]);

  return (
    <motion.div
      style={{
        width: '400px',
        height: '400px',
        backgroundImage: `url(${clockface})`,
        backgroundSize: 'cover',
        rotate: animatedAngle,
        marginTop: '180px',
        zIndex: 3,
      }}
    />
  );
}

export default WobblyClock;