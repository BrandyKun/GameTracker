import React from "react";
import { motion } from "framer-motion";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import {
  SiPlaystation,
  SiPlaystation2,
  SiPlaystation3,
  SiPlaystation4,
  SiPlaystation5,
  SiPlaystationvita,
  SiNintendo3Ds,
  SiNintendogamecube,
  SiNintendoswitch,
} from "react-icons/si";
import { useNavigate } from "react-router-dom";

const Platform = ({ platform, opacity, yTransform, index }) => {
  const navigate = useNavigate();

  const getBackgroundColor = () => {
    switch (platform.name) {
      case "Xbox":
        return "green";
      case "PlayStation":
        return "blue";
      case "Nintendo":
        return "#CC2131";
      default:
        return "gray";
    }
  };

  const getMainIcon = () => {
    switch (platform.name) {
      case "Xbox":
        return <FaXbox className="icons-logo" />;
      case "PlayStation":
        return <FaPlaystation className="icons-logo" />;
      case "Nintendo":
        return (
          <img
            className="nintendo-logo"
            src="/images/RigthNintendo.svg"
            alt="nintendo logo"
          />
        );
      default:
        return null;
    }
  };

  const getSubIcons = () => {
    switch (platform.name) {
      case "PlayStation":
        return (
          <>
            <SiPlaystation className="icons-subs-logo" />
            <SiPlaystation2 className="icons-subs-logo" />
            <SiPlaystation3 className="icons-subs-logo" />
            <SiPlaystation4 className="icons-subs-logo" />
            <SiPlaystation5 className="icons-subs-logo" />
            <SiPlaystationvita className="icons-subs-logo" />
          </>
        );
      case "Nintendo":
        return (
          <>
            <SiNintendo3Ds className="icons-subs-logo" />
            <SiNintendogamecube className="icons-subs-logo" />
            <SiNintendoswitch className="icons-subs-logo nintendo-logo" />
          </>
        );
      default:
        return null;
    }
  };

  const handlePlatformClick = (e) => {
    e.preventDefault();
    navigate("/search", {
      state: {
        platformId: platform.id,
        platformName: platform.name,
        type: "platform"
      }
    });
  };

  return (
    <motion.div
      className="platform-container--section"
      style={{
        opacity: opacity,
        y: yTransform,
        background: getBackgroundColor(),
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div onClick={handlePlatformClick} className="platform-link">
        <div className="icons">{getMainIcon()}</div>
        <div className="icons-subs">{getSubIcons()}</div>
      </div>
    </motion.div>
  );
};

export default Platform;
