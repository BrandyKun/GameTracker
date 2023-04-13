import moment from "moment";
moment.locale(document.documentElement.lang);

export const getAsync = async (endpoint, query, date, limit) => {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      query: query,
      limit: limit,
    }),
  }).then((response) => response.json());
  return res;
};

export const getAsyncNoParams = async (endpoint) => {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: "",
  }).then((response) => response.json());
  return res;
};

export const changeImageSize = (url, size) => {
  let newURL = "";
  if (url != null) {
   newURL = url.replace(/t_thumb/, size);
  } else {
    newURL = "https://publications.iarc.fr/uploads/media/default/0001/02/thumb_1240_default_publication.jpeg"
  }
  return newURL;
};


export const getGames =async () => {
   // console.log(games, "this are the game");
   const endpoint = "game/popular";
   // You can await here
   const response = await getAsyncNoParams(endpoint);

   return response;
}
