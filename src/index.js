const {random, PI, cos, sin} = Math;
const defaultOptions = {
  lineOpacity: 0.1,
  pointOpacity: 0.5,
  lineColor: [255, 255, 255],
  pointColor: [255, 255, 255]
};

export function drawLight(context, light, lineColorString, pointColorString) {
  const {x, y} = light;
  context.fillStyle = pointColorString;
  context.fillRect(x, y, 1, 1);
  light.lines.forEach(line => {
    const {alpha, size} = line;
    context.strokeStyle = lineColorString;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + cos(alpha) * size, y + sin(alpha) * size);
    context.stroke();
  });
}

export function renderer(context, options) {
  if (!(context instanceof CanvasRenderingContext2D)) {
    throw new TypeError('context is not a CanvasRenderingContext2D valid object');
  }
  const {lineOpacity, pointOpacity, lineColor, pointColor} = Object.assign({}, defaultOptions, options);
  const pointRGB = pointColor.join();
  const lineRGB = lineColor.join();
  const pointColorString = `rgba(${pointRGB},${pointOpacity})`;
  const lineColorString = `rgba(${lineRGB},${lineOpacity})`;
  return function draw(light, opacity) {
    if (opacity) {
      const pc = `rgba(${pointRGB},${pointOpacity * opacity})`;
      const lc = `rgba(${lineRGB},${lineOpacity * opacity})`;
      drawLight(context, light, pc, lc);
    } else {
      drawLight(context, light, lineColorString, pointColorString);
    }
  };
}


export function lightGenerator(options = {}) {
  const GAMMA = PI / 32;
  const {MAX_SIZE = 17, DELTA = 1, MIN_SIZE = 5, lineLimit = 5} = options;

  function create(x, y) {
    const lines = [];
    for (let i = 0; i < lineLimit; i++) {
      lines.push({
        alpha: random() * PI * 2,
        size: random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE,
        delta: random() > 0.5 ? DELTA : -DELTA,
        gamma: random() > 0.5 ? GAMMA * random() : -GAMMA * random()
      });
    }
    return {
      x,
      y,
      lines
    };
  }

  function update(light) {
    light.lines.forEach(line => {
      const {size, gamma} = line;
      if (size > MAX_SIZE) {
        line.delta = -DELTA;
      } else if (size < MIN_SIZE) {
        line.delta = DELTA;
      }
      line.size += line.delta;
      line.alpha += gamma;
    });
    return light;
  }
  return {
    create,
    update
  };
}
