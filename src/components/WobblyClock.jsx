import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import clockface from '../assets/clockface.png';

function WobblyClock({ targetAngle }) {
  // raw motion value (instantly set)
  const angle = useMotionValue(0);

  // spring that wobbles toward angle
  const animatedAngle = useSpring(angle, {
    stiffness: 80, // increase = snappier
    damping: 4,     // lower = more wobble
  });

  // when targetAngle changes, update the motion value
  useEffect(() => {
    angle.set(targetAngle);
  }, [targetAngle]);

  return (
    <motion.div
      style={{
        width: '380px',
        height: '380px',
        backgroundImage: `url(${clockface})`,
        backgroundSize: 'cover',
        rotate: animatedAngle,
        marginTop: '200px',
        zIndex: 3,
      }}
    />
  );
}

export default WobblyClock;