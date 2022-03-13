// Display in milliseconds if under 1 second or in seconds if above or equal to 1 second.

const TIME_LIMIT = 1000;

const displayTime = (time: number): string => {
  if (time < TIME_LIMIT) return `${time}ms`;
  return `${time / TIME_LIMIT}s`;
};

export default displayTime;
