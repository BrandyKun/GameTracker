import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const BatchAnimation = ({ children, index, className}) => {
  const ref = useRef(null);
  const isView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    console.log(isView);
    if (isView) {
      mainControls.start("visible");
    }
  }, [isView]);

  return (
    <div
      ref={ref}
      style={{
        height: "auto",
        width: "100%",
        overflow: "hidden",
      }}
      className={className}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default BatchAnimation;
