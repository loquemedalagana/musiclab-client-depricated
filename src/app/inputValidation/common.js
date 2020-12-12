export const haveSpace = (input) => /\s+/g.test(input);
export const getInputResult = (ok, message) => ({
  ok,
  message,
});
export const isEmptyInput = (input) => input.length === 0;
