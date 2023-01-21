import moment from "moment";
moment.locale(document.documentElement.lang);
export const dateToMilliseconds = (date) => {
  var newdate = new Date();
  debugger;
  let ISODate = moment(date).toISOString();
  return ISODate.getTime();
};

moment("23-6-2019").format();

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
