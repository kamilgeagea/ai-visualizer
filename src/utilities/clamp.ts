// Puts a number between bounds

const clamp = (num: number, num1: number, num2: number): number => {
  const min = Math.min(num1, num2);
  const max = Math.max(num1, num2);

  return Math.min(Math.max(num, min), max);
};

export default clamp;
