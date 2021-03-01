const monthHumanize = (numberOfMonth) => {
  const month = {
    1: "Januari",
    2: "Februari",
    3: "Maret",
    4: "April",
    5: "Mei",
    6: "Juni",
    7: "Juli",
    8: "Agustus",
    9: "September",
    10: "Oktober",
    11: "November",
    12: "Desember",
  };
  return month[numberOfMonth];
};
/**
 *
 * @param {object} acc
 * @param {object} current
 * @example property of current
 * ```json
 * {
 *  "id":100,
 *  "name":"Pasta",
 *  "cost":27815,
 *  "created_at":"2021-02-10 12:34:37"
 * }
 * ```
 */
const reducerByDate = (acc, current) => {
  // convert property of {created_at} to date
  const date = new Date(current.created_at);
  // create key for returned object
  const key = `${date.getDate()}_${monthHumanize(
    date.getMonth() + 1
  )}`;
  if (!acc[key]) {
    acc[key] = [current];
  } else {
    acc[key].push(current);
  }
  return acc;
};

export const keyHumanize = (key) => {
  return `${key}`.replace(/_/g, " ");
};
export const getTotal = (data) =>
  data.reduce((acc, current) => (acc += current.cost), 0);
export const groupByDate = (data) => data.reduce(reducerByDate, {});
export const formatIDR = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "decimal",
    currency: "IDR",
    currencyDisplay: "symbol",
  }).format(number);
