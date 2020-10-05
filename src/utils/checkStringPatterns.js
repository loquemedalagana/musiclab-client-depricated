export const numPattern = /[0-9]/; 
export const alphabetPattern = /[a-zA-Z]/; 
export const specialCharacterPattern = /[~!@#$%^&*()_+|<>?:{}]/;

export const checkSpace = str => {
    return str.search(/\s/) !== -1 ? true : false;
};

export const checkValidEmail = email => {
    return (/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(email))
}