import React, { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

const Platforms = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const section1Opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const section2Opacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);
  const section3Opacity = useTransform(scrollYProgress, [0.65, 1], [0, 1]);

  const section1Y = useTransform(scrollYProgress, [0, 0.35], ["50%", "0%"]);
  const section2Y = useTransform(scrollYProgress, [0.35, 0.65], ["50%", "0%"]);
  const section3Y = useTransform(scrollYProgress, [0.65, 1], ["50%", "0%"]);

  return (
    <div ref={containerRef} className="platform-container">
      <div className="platform-container-main">
        <motion.div 
          className="platform-container--section"
          style={{ opacity: section1Opacity, y: section1Y }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          Section 1
        </motion.div>
        <motion.div 
          className="platform-container--section"
          style={{ opacity: section2Opacity, y: section2Y }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          Section 2
        </motion.div>
        <motion.div 
          className="platform-container--section"
          style={{ opacity: section3Opacity, y: section3Y }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          Section 3
        </motion.div>
      </div>
    </div>
  );
};

export default Platforms;
