import moment from "moment";
export const dateToMilliseconds = (date) => {

    debugger
    let ISODate = moment(date).toISOString();
    return ISODate.getTime();
}