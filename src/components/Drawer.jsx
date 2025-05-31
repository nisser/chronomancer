import { motion, useMotionValue, animate } from 'framer-motion';
import { useEffect } from 'react';

function Drawer({ open, setOpen , children}) {
  const y = useMotionValue(open ? 0 : -200);

  useEffect(() => {
    animate(y, open ? 0 : -200, { type: 'spring', stiffness: 300, damping: 30 });
  }, [open, y]);

  return (

      <motion.div
        style={{
          y,
          position: 'fixed',
          boxShadow: '0px 0px 20px 0px #000000 inset',
          transform: 'translateX(-50%)',
          width: '400px',
          height: '200px',
          borderRadius: '200px 200px 0 0',
          background: 'transparent',//'#00443e',
          alignItems: 'center',
          marginTop: '-30px', // change this
          display: 'flex',
          flexDirection: 'column',
          overflow: 'visible',
          zIndex: 2,

        }}>
        {children}
      </motion.div>

  );
}

export default Drawer;
