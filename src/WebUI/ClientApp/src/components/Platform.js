import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAsync } from "./Service";
import Loader from "./ReUsable/Loader";

const Platform = () => {
  const [platform, setPlatform] = useState();
  const [loading, setLoading] = useState(false);
  const [id, setPlatformId] = useState();
  const { platformId } = useParams();

  useEffect(() => {
    if (platformId) {
      setPlatformId(platformId);
    }
  }, [platformId]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (id) {
        const endpoint = `game/platform/${id}`;
        const query = `fields abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family.*,platform_logo.*,slug,summary,updated_at,url,versions.*,websites; where id = ${id};`;
        const limit = "1";
        const date = "";
        const response = await getAsync(endpoint, query, date, limit);
        // ...
        console.log(response, "platform");
        setPlatform(response);
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {platform && (
            <div className="info-platform-container">
              <p>{platform.name}</p>
              <div className="platform-inf">
                <div className="platform-inf-img">
                  <img
                    src={`//images.igdb.com/igdb/image/upload/t_1080p/${platform.platformLogo?.value?.imageId}.jpeg`}
                    alt=""
                  />
                </div>
                <div className="platfom-inf-description">
                  <p>Alterantive name:</p>
                  {platform.alternativeName}
                  <p>PlatformFamily:</p>
                  {platform.platformFamily?.value?.name}
                  <p>Alterantive name:</p>
                  {platform.alternativeName}
                  <p>Alterantive name:</p>
                  {platform.alternativeName}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Platform;
