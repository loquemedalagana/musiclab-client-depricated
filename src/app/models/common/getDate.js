export const getDateKor = (dateformat) => {
  return `${dateformat.substring(0, 4)}년 ${dateformat.substring(
    5,
    7
  )}월 ${dateformat.substring(8, 10)}일`;
};
