import { motion, useMotionValue, animate } from 'framer-motion';
import { useEffect } from 'react';

function Drawer({ open, setOpen , children}) {
  const y = useMotionValue(open ? 0 : -200);

  useEffect(() => {
    animate(y, open ? 0 : -180, { type: 'spring', stiffness: 200, damping: 20 });
  }, [open, y]);

  return (

      <motion.div
        style={{
          y,
          position: 'fixed',
          boxShadow: '0px 0px 20px 0px #000000',
          transform: 'translateX(-50%)',
          width: '380px',
          height: '200px',
          borderRadius: '200px 200px 0 0',
          alignItems: 'center',
          marginTop: '-30px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2,
        }}>
        {children}
      </motion.div>

  );
}

export default Drawer;
