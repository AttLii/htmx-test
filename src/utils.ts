export const makeid = (length: number) => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  while (result.length !== length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// https://stackoverflow.com/a/12034334
export const buildSanitizer = (rules: Record<string, string>) => {
  return (unsanitized: string) => {
    return unsanitized.replace(/[&<>"'`=\/]/g, (s) => rules[s]);
  };
};
