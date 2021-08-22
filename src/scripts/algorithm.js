async function init(size) {
  map = makeMap(size, 20);

  let best = Infinity;
  let bestPath;
  for (let i = 0; i < map.length; i++) {
    const ant = new Ant(map.slice(), i);
    const dist = await ant.travel();

    if (best > dist) {
      best = dist;
      bestPath = ant.path;

      drawBest(bestPath);
    }
  }
  console.log("end");
}

function Ant(cities, startingIndex) {
  this.path = [];
  this.cities = cities;
  //this.pos = this.cities.pop();
  this.pos = this.cities.splice(startingIndex, 1)[0];

  this.totalDistance = 0;

  this.travel = async () => {
    this.path.push(this.pos);
    if (do_draw) {
      draw(map, this.pos, this.path);
      await sleep(frameRate);
    }

    if (this.cities.length == 0) return this.totalDistance;

    let best = Infinity;
    let bestIndex;
    let i = 0;
    this.cities.forEach((city) => {
      const dist = distance(this.pos, city);

      if (dist < best) {
        bestIndex = i;
        best = dist;
      }

      i++;
    });
    this.totalDistance += best;
    this.pos = this.cities.splice(bestIndex, 1)[0];

    return this.travel();
  };
}

function drawBest(arr) {
  //reset
  bestCtx.fillStyle = "#202124";
  bestCtx.fillRect(0, 0, best.width, best.height);

  //draw ants path
  bestCtx.strokeStyle = "#bbb";
  bestCtx.beginPath();
  arr.forEach((city) => {
    bestCtx.lineTo(city.x, city.y);
  });
  bestCtx.stroke();
  bestCtx.closePath();

  //draw cities
  bestCtx.fillStyle = "#bbb";
  arr.forEach((city) => {
    bestCtx.beginPath();
    bestCtx.ellipse(city.x, city.y, node_radius, node_radius, 0, 0, 360);
    bestCtx.fill();
    bestCtx.closePath();
  });
}

function draw(cities, ant, antPath) {
  //reset
  ctx.fillStyle = "#202124";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //draw ants path
  ctx.strokeStyle = "#bbb";
  ctx.beginPath();
  antPath.forEach((city) => {
    ctx.lineTo(city.x, city.y);
  });
  ctx.stroke();
  ctx.closePath();

  //draw cities
  ctx.fillStyle = "#bbb";
  cities.forEach((city) => {
    ctx.beginPath();
    ctx.ellipse(city.x, city.y, node_radius, node_radius, 0, 0, 360);
    ctx.fill();
    ctx.closePath();
  });

  //draw ant
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.ellipse(ant.x, ant.y, node_radius, node_radius, 0, 0, 360);
  ctx.fill();
  ctx.closePath();

  //draw potential paths

  //draw desired path
}

function distance(a, b) {
  // √[(x2 − x1)2 + (y2 − y1)2]
  const dist = Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
  return Math.sqrt(dist);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeMap(size, margin) {
  let arr = [];

  for (let i = 0; i < size; i++) {
    arr.push({
      x: Math.floor(margin + Math.random() * (canvas.width - margin - margin)),
      y: Math.floor(margin + Math.random() * (canvas.height - margin - margin)),
    });
  }

  return arr;
}
