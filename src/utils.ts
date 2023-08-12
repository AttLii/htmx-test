export const makeid = (length: number) => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  while (result.length !== length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
