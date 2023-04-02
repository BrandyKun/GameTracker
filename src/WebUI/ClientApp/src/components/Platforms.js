import React from "react";
import { ReactComponent as Blob1 } from "../assets/svgs/blob.svg";
import { ReactComponent as Blob2 } from "../assets/svgs/blob -tertiary.svg";
import { ReactComponent as Blob3 } from "../assets/svgs/blob (2).svg";
import { ReactComponent as Blob4 } from "../assets/svgs/blob (3).svg";
import psLogo from "../assets/pngs/ps-logo.webp";
import nintendoLOgo from "../assets/pngs/nintendo-logo.webp";
import xboxLogo from "../assets/pngs/xbox-logo.jpeg";
const Platforms = () => {
  return (
    <>
      <section className="platform-container">
        <div className="platform-container--width">
          <div className="blob-container img-blob--1">
            <Blob1 className="platform--blobs" />
            <div className="blob-img-container i">
              <img
                className="platform-blob--image blob-logo--1"
                src={xboxLogo}
                alt=""
              />
            </div>
          </div>
          <div className="blob-container img-blob--2">
            <Blob2 className="platform--blobs" />
            <div className="blob-img-container">
              <img
                className="platform-blob--image blob-logo--2"
                src={psLogo}
                alt=""
              />
            </div>
          </div>
          <div className="blob-container img-blob--3">
            <Blob3 className="platform--blobs" />
            <div className="blob-img-container">
              <img
                className="platform-blob--image blob-logo--3"
                src={nintendoLOgo}
                alt=""
              />
            </div>
          </div>
          {/* <Blob4 className="platform--blobs" /> */}
        </div>
      </section>
    </>
  );
};

export default Platforms;
