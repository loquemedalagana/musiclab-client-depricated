const numPattern = /[0-9]/;
const alphabetPattern = /[a-zA-Z]/;
const specialCharacterPattern = /[~!@#$%^&*()_+|<>?:{}]/;

export const checkNumber = (str) => numPattern.test(str);
export const checkAlphabet = (str) => alphabetPattern.test(str);
export const checkSpecialChar = (str) => specialCharacterPattern.test(str);

export const checkSpace = (str) => {
  return str.search(/\s/) !== -1 ? true : false;
};

export const checkValidEmail = (email) => {
  return /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(email);
};
