export const reduceArrayToString = (array) => {
  return array.reduce((prev, curr) => prev.concat(curr)).join(',');
};

export const charCounter = (str, char) => {
  return str.toLowerCase().split(char).length - 1;
};

export const getLastItemUrl = (url) => {
  return url.substring(url.lastIndexOf('/') + 1);
};
