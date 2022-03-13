// Returns a random number between an interval

const randomNumberBetweenInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default randomNumberBetweenInterval;
