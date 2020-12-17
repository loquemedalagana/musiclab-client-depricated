export const getUnreadElementsLength = (elements) => {
  if (elements.length === 0) return 0;
  return elements.filter((element) => element.isRead === false).length;
};

export const camelToSpace = (camelCase) =>
  camelCase.replace(
    /.[A-Z]/g,
    (match) => `${match[0]} ${match[1].toLowerCase()}`
  );
