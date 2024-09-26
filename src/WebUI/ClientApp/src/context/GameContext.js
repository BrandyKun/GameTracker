import { createContext, useState, useEffect } from "react";

const getPlatformFilters = (searches) => {
  let platforms = [];
  if (Array.isArray(searches)) {
    searches.forEach((search) => {
      if (Array.isArray(search?.platforms)) {
        search.platforms.forEach((platform) => {
          if (platform && platform.name) {
            platforms.push(platform.name);
          }
        });
      }
    });
    platforms = [...new Set(platforms)];
    console.log(platforms.sort());
  }
  return platforms;
};

export const GameContext = createContext({
  searchResults: {},
  setSearchResults: () => {},
});

export const GameProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState();
  const [platformFilter, setPlatformFilters] = useState([]);
  const [screenshots, setScreenshots] = useState();
  const [imageIndex, setImageIndex] = useState(false);
  const [showModal, setModal] = useState(false);
  const [selectedImage, setImageClicked] = useState();

  useEffect(() => {
    if (searchResults) {
      const plFilter = getPlatformFilters(searchResults);
      setPlatformFilters(plFilter);
    }
  }, [searchResults]);

  const toggleModal = (image, index) => {
    setImageClicked(image);
    setModal(!showModal);
    setImageIndex(index);
  };

  const value = {
    searchResults,
    platformFilter,
    imageIndex,
    screenshots,
    showModal,
    selectedImage,
    setSearchResults,
    setPlatformFilters,
    setImageIndex,
    setScreenshots,
    setModal,
    setImageClicked,
    toggleModal,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
