import React, { useRef } from "react";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import {
  SiPlaystation4,
  SiPlaystation2,
  SiPlaystation,
  SiPlaystation3,
  SiPlaystation5,
  SiPlaystationvita,
  SiNintendo3Ds,
  SiNintendogamecube,
  SiNintendoswitch,
  SiNintendonetwork,
} from "react-icons/si";
import { useScroll, motion, useTransform } from "framer-motion";

const Platforms = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const maincontianerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const section1Opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const section2Opacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);
  const section3Opacity = useTransform(scrollYProgress, [0.65, 1], [0, 1]);

  const section1Y = useTransform(scrollYProgress, [0, 0.35], ["50%", "0%"]);
  const section2Y = useTransform(scrollYProgress, [0.35, 0.65], ["50%", "0%"]);
  const section3Y = useTransform(scrollYProgress, [0.65, 1], ["50%", "0%"]);

  return (
    <div ref={containerRef} className="platform-container">
      <motion.div
        className="platform-container-main"
        style={{ opacity: maincontianerOpacity }}
      >
        {/* <div> Fin any game from your favourite consoles</div> */}
        <motion.div
          className="platform-container--section"
          style={{
            opacity: section1Opacity,
            y: section1Y,
            background: "green",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="icons">
            <FaXbox className="icons-logo" />
          </div>
          <div className="icons-subs">
          </div>
        </motion.div>
        <motion.div
          className="platform-container--section"
          style={{ opacity: section2Opacity, y: section2Y, background: "blue" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="icons">
            <FaPlaystation className="icons-logo" />
          </div>
          <div className="icons-subs">
            <SiPlaystation className="icons-subs-logo" />
            <SiPlaystation2 className="icons-subs-logo" />
            <SiPlaystation3 className="icons-subs-logo" />
            <SiPlaystation4 className="icons-subs-logo" />
            <SiPlaystation5 className="icons-subs-logo" />
            <SiPlaystationvita className="icons-subs-logo" />
          </div>
        </motion.div>
        <motion.div
          className="platform-container--section"
          style={{
            opacity: section3Opacity,
            y: section3Y,
            background: "#CC2131",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="icons">
            <img
              className="nintendo-logo"
              src="/images/RigthNintendo.svg"
              alt="nintendo logo"
            />
          </div>
          <div className="icons-subs">
            <SiNintendo3Ds className="icons-subs-logo" />
            <SiNintendogamecube className="icons-subs-logo" />
            <SiNintendoswitch className="icons-subs-logo" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Platforms;
