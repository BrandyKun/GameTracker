import React, { useRef } from "react";
import { ReactComponent as Blob1 } from "../assets/svgs/blob.svg";
import { ReactComponent as Blob2 } from "../assets/svgs/blob -tertiary.svg";
import { ReactComponent as Blob3 } from "../assets/svgs/blob (2).svg";
import psLogo from "../assets/pngs/ps-logo.webp";
import nintendoLOgo from "../assets/pngs/nintendo-logo.webp";
import xboxLogo from "../assets/pngs/xbox-logo.jpeg";
import { useScroll, motion, useTransform } from "framer-motion";
const Platforms = () => {
  const containerref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerref,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [0, 1, 1]);

  return (
    <>
      <section className="platform-container">
        {/* <div className="platform-container--width">
          <Blob1 className="platform--blobs img-blob--1" />
          <img
            className="platform-blob--image blob-logo--1"
            src={xboxLogo}
            alt="Xbox Logo"
          />
          <Blob2 className="platform--blobs img-blob--2" />
          <img
            className="platform-blob--image blob-logo--2"
            src={psLogo}
            alt="Playstation Logo"
          />
          <Blob3 className="platform--blobs img-blob--3" />
          <img
            className="platform-blob--image blob-logo--3"
            src={nintendoLOgo}
            alt="Nintendo Logo"
          />
        </div> */}
        <motion.div style={{ opacity }} ref={containerref} className="platform-container-main">
          <motion.div className="platform-container--section-1"></motion.div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "100%",
            }}
          >
            <motion.div variantsclassName="platform-container--section-2"></motion.div>
            <motion.div className="platform-container--section-2"></motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Platforms;
