import React, { useEffect, useRef, useState } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import { getAsyncNoParams } from "./Service";
import Platform from "./Platform";

const Platforms = () => {
  const containerRef = useRef(null);
  const [platforms, setPlatforms] = useState([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const fetchPlatforms = async () => {
      const endpoint = 'game/platformFamily';
      const response = await getAsyncNoParams(endpoint);
      const filteredPlatforms = response.filter(platform => 
        ['PlayStation', 'Xbox', 'Nintendo'].includes(platform.name)
      );
      setPlatforms(filteredPlatforms);
    };
    fetchPlatforms();
  }, []);

  // Adjust the opacity and y-transform ranges
  const maincontainerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const section1Opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const section2Opacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const section3Opacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);

  const section1Y = useTransform(scrollYProgress, [0, 0.25], ["50%", "0%"]);
  const section2Y = useTransform(scrollYProgress, [0.25, 0.5], ["50%", "0%"]);
  const section3Y = useTransform(scrollYProgress, [0.5, 0.75], ["50%", "0%"]);

  // Add a new transform for the entire container
  const containerY = useTransform(scrollYProgress, [0.75, 1], ["0%", "-100%"]);

  return (
    <div ref={containerRef} className="platform-container">
      <motion.div
        className="platform-container-main"
        style={{ 
          opacity: maincontainerOpacity,
          y: containerY
        }}
      >
        {platforms.map((platform, index) => (
          <Platform
            key={platform.id}
            platform={platform}
            opacity={[section1Opacity, section2Opacity, section3Opacity][index]}
            yTransform={[section1Y, section2Y, section3Y][index]}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Platforms;
