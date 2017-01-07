'use strict';

let intervalId;
const rules = [];
rules[0] = [];
rules[1] = [0x000];
rules[2] = [0x001];
rules[3] = [0x001, 0x000];
rules[4] = [0x010];
rules[7] = [0x010, 0x001, 0x000];
rules[48] = [0x101,0x100];
rules[73] = [0x110,0x011,0x000];
rules[86] = [0x110,0x100,0x010, 0x001];
rules[90] = [0x110, 0x100, 0x011, 0x001];
rules[121] = [0x110,0x101,0x100,0x011,0x000];
rules[126] = [0x110,0x101,0x100,0x011,0x010,0x001];
rules[137] = [0x111, 0x011, 0x000];

function newBoard(n) {
  return window.crypto.getRandomValues(new Uint8Array(n)).map(x => !!(x & 1));
}

function drawLine(context, step, cellSize, states) {
  const y = step*cellSize;
  states.forEach((state, i) => {
    context.fillStyle = state ? 'black' : 'white';
    context.fillRect(cellSize*i, y, cellSize, cellSize);
  });
}

function doStep(states, rule) {
  return states.map((cur, i) => rule.apply(null, states.slice(i - 1, i + 2)));
}

function makeRule(actives) {
  return function(prev, cur, next) {
    const x = (prev << 8) | (cur << 4) | next;
    return actives.indexOf(x) >= 0;
  };
}

function clearCanvas(canvas) {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function run(canvas, N, rule, rate) {
  const context = canvas.getContext('2d');
  const cellSize = canvas.width/N;
  let step = 0;
  let board = newBoard(N);
  clearInterval(intervalId);
  clearCanvas(canvas);
  intervalId = setInterval(() => {
    drawLine(context, step++, cellSize, board);
    board = doStep(board, rule);
  }, rate);
}

function start() {
  const canvas = document.getElementById('canvas');
  if (!canvas.getContext) return false;
  const rule = Number.parseInt(document.getElementById('rule').value);
  const N = Number.parseInt(document.getElementById('N').value);
  const rate = Number.parseInt(document.getElementById('rate').value);
  run(canvas, N, makeRule(rules[rule]), rate);
}

function init() {
  const select = document.getElementById('rule');
  rules.forEach((rule, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    select.appendChild(option);
  });
}
