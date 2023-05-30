import { createContext, useEffect, useState } from "react";

const getPlatformFilters = (searches) => {
  let platforms = [];
  if (searches.length > 0) {
    searches.forEach((search) => {
      search?.platforms?.forEach((platform) => {
        platforms.push(platform.name);
      });

      // platfroms.forEach((value) => { value?.platforms?.forEach((plt) => { platform.push(plt.name)})});
    });
    platforms = [...new Set(platforms)];
    console.log(platforms.sort());
  }
  return platforms;
};
const getGenresFilters = (searches) => {
  let genres = [];
  if (searches.length > 0) {
    searches.forEach((search) => {
      search?.genres?.forEach((genre) => {
        genres.push(genre.name);
      });

      // platfroms.forEach((value) => { value?.platforms?.forEach((plt) => { platform.push(plt.name)})});
    });
    genres = [...new Set(genres)];
    console.log(genres.sort());
  }
  return genres;
};

export const GameContext = createContext({
  searchResults: {},
  setSearchResults: () => {},
  filterResults: () => {},
});

export const GameProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState();
  const [platformFilter, setPlatformFilters] = useState();
  const [filter, SetFilter] = useState([]);
  const [screenshots, setScreenshots] = useState();
  const [genreFilters, setGenreFilters] = useState();
  const [imageIndex, setImageIndex] = useState(false);


  useEffect(() => {
    if (searchResults) {
      const plFilter = getPlatformFilters(searchResults);
      setPlatformFilters(plFilter);
      const grnFilters = getGenresFilters(searchResults);
      setGenreFilters(grnFilters);
    }
  }, [searchResults]);

  const filterResults = (e) => {
    //To Do
    let boolName = e.target.id;
    let filterToSet = [...filter];
    // let classToToggle = document.querySelector(`#${boolName}`);
    //if filter has e.text = remove it if not add it. then filter the searchResults based if isgame etch and return that
    if (!filterToSet.includes(boolName)) {
      filterToSet.push(boolName);
    //   classToToggle.classList.add("active");
    } else {
      let foundIndex = filterToSet.indexOf(boolName);
      if (foundIndex > -1) filterToSet.splice(foundIndex, 1);
    //   classToToggle.classList.remove("active");
    }
    SetFilter(filterToSet);
    console.log(filter);
  };
  const filterBy = (e) => {
    //To Do
    let boolName = e.target.value;
    let filterToSet = [...filter];
    // let classToToggle = document.querySelector(`#${boolName}`);
    //if filter has e.text = remove it if not add it. then filter the searchResults based if isgame etch and return that
    if (!filterToSet.includes(boolName)) {
      filterToSet.push(boolName);
    //   classToToggle.classList.add("active");
    } else {
      let foundIndex = filterToSet.indexOf(boolName);
      if (foundIndex > -1) filterToSet.splice(foundIndex, 1);
    //   classToToggle.classList.remove("active");
    }
    SetFilter(filterToSet);
    console.log(filter);
  };

  const value = {
    searchResults,
    platformFilter,
    genreFilters,
    filter,
    imageIndex,
    screenshots,
    setSearchResults,
    setPlatformFilters,
    setGenreFilters,
    SetFilter,
    filterResults,
    setImageIndex,
    setScreenshots,
  };
  return <GameContext.Provider value={value}> {children}</GameContext.Provider>;
};
