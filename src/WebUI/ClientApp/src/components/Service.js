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
    body: '',
  }).then((response) => response.json());
  return res;
};


export const changeImageSize =(url, size) => {
  let newURL = url.replace(/t_thumb/, size);
  return newURL;
}