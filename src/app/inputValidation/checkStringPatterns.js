const numPattern = /[0-9]/;
const alphabetPattern = /[a-zA-Z]/;
const specialCharacterPattern = /[~!@#$%^&*()_+|<>?:{}]/;

export const checkNumber = (str) => numPattern.test(str);
export const checkAlphabet = (str) => alphabetPattern.test(str);
export const checkSpecialChar = (str) => specialCharacterPattern.test(str);

export const checkSpace = (str) => {
  return str.search(/\s/) !== -1 ? true : false;
};
