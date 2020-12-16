export const getUnreadElementsLength = (elements) => {
  if (elements.length === 0) return 0;
  return elements.filter((element) => element.isRead === false).length;
};

export const getDateKor = (dateformat) => {
  return `${dateformat.substring(0, 4)}년 ${dateformat.substring(
    5,
    7
  )}월 ${dateformat.substring(8, 10)}일`;
};

export const camelToSpace = (camelCase) =>
  camelCase.replace(
    /.[A-Z]/g,
    (match) => `${match[0]} ${match[1].toLowerCase()}`
  );
