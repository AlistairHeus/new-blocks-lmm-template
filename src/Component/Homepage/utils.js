// Map number x from range [a, b] to [c, d]
export const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

// Linear interpolation
export const lerp = (a, b, n) => (1 - n) * a + n * b;

export const calcWinsize = () => {
  return { width: window.innerWidth, height: window.innerHeight };
};

export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Gets the mouse position
export const getMousePos = (e) => {
  return {
    x: e.clientX,
    y: e.clientY,
  };
};
