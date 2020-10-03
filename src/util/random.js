export const getRandomString = () => {
  return window.btoa(new Date().getMilliseconds().toString());
};