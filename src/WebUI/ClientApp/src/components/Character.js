import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAsync } from "./Service";
import Loader from "./ReUsable/Loader";

const Character = () => {
  const [character, setCharacter] = useState();
  const [loading, setLoading] = useState(false);
  const [id, setCharacterId] = useState();
  const { characterId } = useParams();

  useEffect(() => {
    if (characterId) {
      setCharacterId(characterId);
    }
  }, [characterId]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (id) {
        const endpoint = `game/character/${id}`;
        const query = `fields akas,checksum,country_name,created_at, description,games,gender,mug_shot,name,slug,species,updated_at,url; where id = ${id};`;
        const limit = "1";
        const date = "";
        const response = await getAsync(endpoint, query, date, limit);
        // ...
        console.log(response, "character");
        setCharacter(response);
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
          {character && (
            <div className="info-platform-container">
              <p>{character.name}</p>
              <div className="platform-inf">
                <div className="platform-inf-img">
                  <img
                  // src={`//images.igdb.com/igdb/image/upload/t_1080p/${character.characterLogo?.value?.imageId}.jpeg`}
                  // alt=""
                  />
                </div>
                <div className="platfom-inf-description">
                  <p>Alterantive name:</p>
                  {/* {character.alternativeName} */}
                  <p>characterFamily:</p>
                  {/* {character.characterFamily?.value?.name} */}
                  <p>Alterantive name:</p>
                  {/* {character.alternativeName} */}
                  <p>Alterantive name:</p>
                  {/* {character.alternativeName} */}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Character;
