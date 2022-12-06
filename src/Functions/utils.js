let x;
let a;
let b;
let c;
let d;

export const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

export const getTranslationDistance = (
  element1,
  element2,
  spread = 80,
  maxDistance = 500
) => {
  const elCenter = {
    x: element1.offsetLeft + element1.offsetWidth / 2,
    y: element1.offsetTop + element1.offsetHeight / 2,
  };
  const elCenter2 = {
    x: element2.offsetLeft + element2.offsetWidth / 2,
    y: element2.offsetTop + element2.offsetHeight / 2,
  };

  spread = Math.max(
    map(getDistance(element1, element2), 0, maxDistance, spread, 0),
    0
  );

  const angle = Math.atan2(
    Math.abs(elCenter2.y - elCenter.y),
    Math.abs(elCenter2.x - elCenter.x)
  );

  let x = Math.abs(Math.cos(angle) * spread);
  let y = Math.abs(Math.sin(angle) * spread);

  return {
    x: elCenter.x < elCenter2.x ? x * -1 : x,
    y: elCenter.y < elCenter2.y ? y * -1 : y,
  };
};


export const getDistance = (element1, element2) => {
    const elCenter = {x: element1.offsetLeft + element1.offsetWidth/2, y: element1.offsetTop + element1.offsetHeight/2};
    const elCenter2 = {x: element2.offsetLeft + element2.offsetWidth/2, y: element2.offsetTop + element2.offsetHeight/2};
    return Math.hypot(elCenter.x - elCenter2.x, elCenter.y - elCenter2.y);
}

export const closestEdge = (x,y,w,h) => {
    const topEdgeDist = distMetric(x,y,w/2,0);
    const bottomEdgeDist = distMetric(x,y,w/2,h);
    const min = Math.min(topEdgeDist,bottomEdgeDist);
    return min === topEdgeDist ? 'top' : 'bottom';
}


export const distMetric = (x,y,x2,y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return (xDiff * xDiff) + (yDiff * yDiff);
}


export const lerp = (a, b, n) => (1 - n) * a + n * b;

export const calcWinsize = () => {
  return {width: window.innerWidth, height: window.innerHeight};
};

// Gets the mouse position
export const getMousePos = e => {
  return { 
      x : e.clientX, 
      y : e.clientY 
  };
};

export const distance = (x1,y1,x2,y2) => {
  var a = x1 - x2;
  var b = y1 - y2;

  return Math.hypot(a,b);
}

