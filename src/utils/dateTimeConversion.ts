// Calculate times
export const calcDays = (timeRemaining: any) => {
  return Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
};
export const calcHours = (timeRemaining: any) => {
  return Math.floor(
    Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  );
};

export const calcMins = (timeRemaining: any) => {
  return Math.floor(
    ((timeRemaining % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) / (60 * 1000)
  );
};
export const calcSecs = (timeRemaining: any) => {
  return Math.floor(
    (((timeRemaining % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) %
      (60 * 1000)) /
      1000
  );
};
