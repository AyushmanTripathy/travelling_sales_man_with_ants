const canvas = document.querySelector("#trying");
const best = document.querySelector("#best");
const ctx = canvas.getContext("2d");
const bestCtx = best.getContext("2d");

const node_radius = 5;
let frameRate = 50;

let do_draw = true;
let city_count = 10;

let map;

start();

function start() {
  init(city_count);
}

function changeFrameRate(num) {
  frameRate = num;
}

function changeDrawStatus(status) {
  do_draw = do_draw ? false : true;
  console.log(do_draw);
}

function changeNumber(num) {
  city_count = num;
}
