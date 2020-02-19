'use strict';

let intervalId;
const rules = [
  (p, q, r) => 0,
  (p, q, r) => ((1 + p) * (1 + q) * (1 + r)) % 2,
  (p, q, r) => ((1 + p) * (1 + q) * r) % 2,
  (p, q, r) => ((1 + p) * (1 + q)) % 2,
  (p, q, r) => ((1 + p) * q * (1 + r)) % 2,
  (p, q, r) => ((1 + p) * (1 + r)) % 2,
  (p, q, r) => ((1 + p) * (q + r)) % 2,
  (p, q, r) => ((1 + p) * (1 + q * r)) % 2,
  (p, q, r) => ((1 + p) * q * r) % 2,
  (p, q, r) => ((1 + p) * (1 + q + r)) % 2,
  (p, q, r) => ((1 + p) * r) % 2,
  (p, q, r) => ((1 + p) * (1 + q + q * r)) % 2,
  (p, q, r) => ((1 + p) * q) % 2,
  (p, q, r) => ((1 + p) * (1 + r + q * r)) % 2,
  (p, q, r) => ((1 + p) * (q + r + q * r)) % 2,
  (p, q, r) => (1 + p) % 2,
  (p, q, r) => (p * (1 + q) * (1 + r)) % 2,
  (p, q, r) => ((1 + q) * (1 + r)) % 2,
  (p, q, r) => ((1 + q) * (p + r)) % 2,
  (p, q, r) => ((1 + q) * (1 + p * r)) % 2,
  (p, q, r) => ((p + q) * (1 + r)) % 2,
  (p, q, r) => ((1 + p * q) * (1 + r)) % 2,
  (p, q, r) => (p + q + r + p * q * r) % 2,
  (p, q, r) => (1 + p * q + p * r + q * r) % 2,
  (p, q, r) => (p + p * q + p * r + q * r) % 2,
  (p, q, r) => (1 + q + r + p * q * r) % 2,
  (p, q, r) => (p + p * q + r + p * q * r) % 2,
  (p, q, r) => (1 + q + p * r + q * r) % 2,
  (p, q, r) => (p + q + p * r + p * q * r) % 2,
  (p, q, r) => (1 + p * q + r + q * r) % 2,
  (p, q, r) => (p + q + r + q * r) % 2,
  (p, q, r) => (1 + p * q + p * r + p * q * r) % 2,
  (p, q, r) => (p * (1 + q) * r) % 2,
  (p, q, r) => ((1 + q) * (1 + p + r)) % 2,
  (p, q, r) => ((1 + q) * r) % 2,
  (p, q, r) => ((1 + q) * (1 + p + p * r)) % 2,
  (p, q, r) => (q + p * q + p * r + q * r) % 2,
  (p, q, r) => (1 + p + r + p * q * r) % 2,
  (p, q, r) => (q + p * q + r + p * q * r) % 2,
  (p, q, r) => (1 + p + p * r + q * r) % 2,
  (p, q, r) => ((p + q) * r) % 2,
  (p, q, r) => (1 + p + q + p * q + r + p * q * r) % 2,
  (p, q, r) => ((1 + p * q) * r) % 2,
  (p, q, r) => (1 + p + q + p * q + p * r + q * r) % 2,
  (p, q, r) => (q + p * q + p * r + p * q * r) % 2,
  (p, q, r) => (1 + p + r + q * r) % 2,
  (p, q, r) => (q + p * q + r + q * r) % 2,
  (p, q, r) => (1 + p + p * r + p * q * r) % 2,
  (p, q, r) => (p * (1 + q)) % 2,
  (p, q, r) => ((1 + q) * (1 + r + p * r)) % 2,
  (p, q, r) => ((1 + q) * (p + r + p * r)) % 2,
  (p, q, r) => (1 + q) % 2,
  (p, q, r) => (p + q + q * r + p * q * r) % 2,
  (p, q, r) => (1 + p * q + r + p * r) % 2,
  (p, q, r) => (p + q + r + p * r) % 2,
  (p, q, r) => (1 + p * q + q * r + p * q * r) % 2,
  (p, q, r) => (p + p * q + q * r + p * q * r) % 2,
  (p, q, r) => (1 + q + r + p * r) % 2,
  (p, q, r) => (p + p * q + r + p * r) % 2,
  (p, q, r) => (1 + q + q * r + p * q * r) % 2,
  (p, q, r) => (p + q) % 2,
  (p, q, r) => (1 + p * q + r + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (p + q + r + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (1 + p * q) % 2,
  (p, q, r) => (p * q * (1 + r)) % 2,
  (p, q, r) => ((1 + p + q) * (1 + r)) % 2,
  (p, q, r) => (p * q + r + p * r + q * r) % 2,
  (p, q, r) => (1 + p + q + p * q * r) % 2,
  (p, q, r) => (q * (1 + r)) % 2,
  (p, q, r) => ((1 + p + p * q) * (1 + r)) % 2,
  (p, q, r) => (q + r + p * r + p * q * r) % 2,
  (p, q, r) => (1 + p + p * q + q * r) % 2,
  (p, q, r) => (q * (p + r)) % 2,
  (p, q, r) => (1 + p + q + r + p * r + p * q * r) % 2,
  (p, q, r) => (p * q + r + p * r + p * q * r) % 2,
  (p, q, r) => (1 + p + q + q * r) % 2,
  (p, q, r) => (q * (1 + p * r)) % 2,
  (p, q, r) => (1 + p + p * q + r + p * r + q * r) % 2,
  (p, q, r) => (q + r + p * r + q * r) % 2,
  (p, q, r) => (1 + p + p * q + p * q * r) % 2,
  (p, q, r) => (p * (1 + r)) % 2,
  (p, q, r) => ((1 + q + p * q) * (1 + r)) % 2,
  (p, q, r) => (p + r + q * r + p * q * r) % 2,
  (p, q, r) => (1 + q + p * q + p * r) % 2,
  (p, q, r) => ((p + q + p * q) * (1 + r)) % 2,
  (p, q, r) => (1 + r) % 2,
  (p, q, r) => (p + q + p * q + r) % 2,
  (p, q, r) => (1 + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (p + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (1 + q + p * q + r) % 2,
  (p, q, r) => (p + r) % 2,
  (p, q, r) => (1 + q + p * q + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (p + q + p * q + p * r) % 2,
  (p, q, r) => (1 + r + q * r + p * q * r) % 2,
  (p, q, r) => (p + q + p * q + r + q * r + p * q * r) % 2,
  (p, q, r) => (1 + p * r) % 2,
  (p, q, r) => (p * (q + r)) % 2,
  (p, q, r) => (1 + p + q + r + q * r + p * q * r) % 2,
  (p, q, r) => (p * q + r + q * r + p * q * r) % 2,
  (p, q, r) => (1 + p + q + p * r) % 2,
  (p, q, r) => (q + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (1 + p + p * q + r) % 2,
  (p, q, r) => (q + r) % 2,
  (p, q, r) => (1 + p + p * q + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (p * q + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (1 + p + q + r) % 2,
  (p, q, r) => (p * q + r) % 2,
  (p, q, r) => (1 + p + q + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (q + p * r) % 2,
  (p, q, r) => (1 + p + p * q + r + q * r + p * q * r) % 2,
  (p, q, r) => (q + r + q * r + p * q * r) % 2,
  (p, q, r) => (1 + p + p * q + p * r) % 2,
  (p, q, r) => (p * (1 + q * r)) % 2,
  (p, q, r) => (1 + q + p * q + r + p * r + q * r) % 2,
  (p, q, r) => (p + r + p * r + q * r) % 2,
  (p, q, r) => (1 + q + p * q + p * q * r) % 2,
  (p, q, r) => (p + q + p * q + q * r) % 2,
  (p, q, r) => (1 + r + p * r + p * q * r) % 2,
  (p, q, r) => (p + q + p * q + r + p * r + p * q * r) % 2,
  (p, q, r) => (1 + q * r) % 2,
  (p, q, r) => (p + q * r) % 2,
  (p, q, r) => (1 + q + p * q + r + p * r + p * q * r) % 2,
  (p, q, r) => (p + r + p * r + p * q * r) % 2,
  (p, q, r) => (1 + q + p * q + q * r) % 2,
  (p, q, r) => (p + q + p * q + p * q * r) % 2,
  (p, q, r) => (1 + r + p * r + q * r) % 2,
  (p, q, r) => (p + q + p * q + r + p * r + q * r) % 2,
  (p, q, r) => (1 + p * q * r) % 2,
  (p, q, r) => p * q * r,
  (p, q, r) => (1 + p + q + p * q + r + p * r + q * r) % 2,
  (p, q, r) => ((1 + p + q) * r) % 2,
  (p, q, r) => (1 + p + q + p * q + p * q * r) % 2,
  (p, q, r) => (q * (1 + p + r)) % 2,
  (p, q, r) => (1 + p + r + p * r + p * q * r) % 2,
  (p, q, r) => (q + p * q + r + p * r + p * q * r) % 2,
  (p, q, r) => (1 + p + q * r) % 2,
  (p, q, r) => q * r,
  (p, q, r) => (1 + p + q + p * q + r + p * r + p * q * r) % 2,
  (p, q, r) => ((1 + p + p * q) * r) % 2,
  (p, q, r) => (1 + p + q + p * q + q * r) % 2,
  (p, q, r) => (q * (1 + p + p * r)) % 2,
  (p, q, r) => (1 + p + r + p * r + q * r) % 2,
  (p, q, r) => (q + p * q + r + p * r + q * r) % 2,
  (p, q, r) => (1 + p + p * q * r) % 2,
  (p, q, r) => (p * (1 + q + r)) % 2,
  (p, q, r) => (1 + q + r + q * r + p * q * r) % 2,
  (p, q, r) => (p + p * q + r + q * r + p * q * r) % 2,
  (p, q, r) => (1 + q + p * r) % 2,
  (p, q, r) => (p + q + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (1 + p * q + r) % 2,
  (p, q, r) => (p + q + r) % 2,
  (p, q, r) => (1 + p * q + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (p + p * q + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (1 + q + r) % 2,
  (p, q, r) => (p + p * q + r) % 2,
  (p, q, r) => (1 + q + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (p + q + p * r) % 2,
  (p, q, r) => (1 + p * q + r + q * r + p * q * r) % 2,
  (p, q, r) => (p + q + r + q * r + p * q * r) % 2,
  (p, q, r) => (1 + p * q + p * r) % 2,
  (p, q, r) => p * r,
  (p, q, r) => (1 + p + q + p * q + r + q * r + p * q * r) % 2,
  (p, q, r) => ((1 + q + p * q) * r) % 2,
  (p, q, r) => (1 + p + q + p * q + p * r) % 2,
  (p, q, r) => (q + p * q + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (1 + p + r) % 2,
  (p, q, r) => (q + p * q + r) % 2,
  (p, q, r) => (1 + p + p * r + q * r + p * q * r) % 2,
  (p, q, r) => ((p + q + p * q) * r) % 2,
  (p, q, r) => (1 + p + q + p * q + r) % 2,
  (p, q, r) => r,
  (p, q, r) => (1 + p + q + p * q + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (q + p * q + p * r) % 2,
  (p, q, r) => (1 + p + r + q * r + p * q * r) % 2,
  (p, q, r) => (q + p * q + r + q * r + p * q * r) % 2,
  (p, q, r) => (1 + p + p * r) % 2,
  (p, q, r) => (p * (1 + q + q * r)) % 2,
  (p, q, r) => (1 + q + r + p * r + q * r) % 2,
  (p, q, r) => (p + p * q + r + p * r + q * r) % 2,
  (p, q, r) => (1 + q + p * q * r) % 2,
  (p, q, r) => (p + q + q * r) % 2,
  (p, q, r) => (1 + p * q + r + p * r + p * q * r) % 2,
  (p, q, r) => (p + q + r + p * r + p * q * r) % 2,
  (p, q, r) => (1 + p * q + q * r) % 2,
  (p, q, r) => (p + p * q + q * r) % 2,
  (p, q, r) => (1 + q + r + p * r + p * q * r) % 2,
  (p, q, r) => (p + p * q + r + p * r + p * q * r) % 2,
  (p, q, r) => (1 + q + q * r) % 2,
  (p, q, r) => (p + q + p * q * r) % 2,
  (p, q, r) => (1 + p * q + r + p * r + q * r) % 2,
  (p, q, r) => (p + q + r + p * r + q * r) % 2,
  (p, q, r) => (1 + p * q + p * q * r) % 2,
  (p, q, r) => p * q,
  (p, q, r) => (1 + p + q + r + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (p * q + r + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (1 + p + q) % 2,
  (p, q, r) => (q * (1 + r + p * r)) % 2,
  (p, q, r) => (1 + p + p * q + r + p * r) % 2,
  (p, q, r) => (q + r + p * r) % 2,
  (p, q, r) => (1 + p + p * q + q * r + p * q * r) % 2,
  (p, q, r) => (q * (p + r + p * r)) % 2,
  (p, q, r) => (1 + p + q + r + p * r) % 2,
  (p, q, r) => (p * q + r + p * r) % 2,
  (p, q, r) => (1 + p + q + q * r + p * q * r) % 2,
  (p, q, r) => q,
  (p, q, r) => (1 + p + p * q + r + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (q + r + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (1 + p + p * q) % 2,
  (p, q, r) => (p * (1 + r + q * r)) % 2,
  (p, q, r) => (1 + q + p * q + r + q * r) % 2,
  (p, q, r) => (p + r + q * r) % 2,
  (p, q, r) => (1 + q + p * q + p * r + p * q * r) % 2,
  (p, q, r) => (p + q + p * q + p * r + q * r) % 2,
  (p, q, r) => (1 + r + p * q * r) % 2,
  (p, q, r) => (p + q + p * q + r + p * q * r) % 2,
  (p, q, r) => (1 + p * r + q * r) % 2,
  (p, q, r) => (p + p * r + q * r) % 2,
  (p, q, r) => (1 + q + p * q + r + p * q * r) % 2,
  (p, q, r) => (p + r + p * q * r) % 2,
  (p, q, r) => (1 + q + p * q + p * r + q * r) % 2,
  (p, q, r) => (p + q + p * q + p * r + p * q * r) % 2,
  (p, q, r) => (1 + r + q * r) % 2,
  (p, q, r) => (p + q + p * q + r + q * r) % 2,
  (p, q, r) => (1 + p * r + p * q * r) % 2,
  (p, q, r) => (p * (q + r + q * r)) % 2,
  (p, q, r) => (1 + p + q + r + q * r) % 2,
  (p, q, r) => (p * q + r + q * r) % 2,
  (p, q, r) => (1 + p + q + p * r + p * q * r) % 2,
  (p, q, r) => (q + p * r + q * r) % 2,
  (p, q, r) => (1 + p + p * q + r + p * q * r) % 2,
  (p, q, r) => (q + r + p * q * r) % 2,
  (p, q, r) => (1 + p + p * q + p * r + q * r) % 2,
  (p, q, r) => (p * q + p * r + q * r) % 2,
  (p, q, r) => (1 + p + q + r + p * q * r) % 2,
  (p, q, r) => (p * q + r + p * q * r) % 2,
  (p, q, r) => (1 + p + q + p * r + q * r) % 2,
  (p, q, r) => (q + p * r + p * q * r) % 2,
  (p, q, r) => (1 + p + p * q + r + q * r) % 2,
  (p, q, r) => q + r - q * r,
  (p, q, r) => (1 + p + p * q + p * r + p * q * r) % 2,
  (p, q, r) => p,
  (p, q, r) => (1 + q + p * q + r + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (p + r + p * r + q * r + p * q * r) % 2,
  (p, q, r) => (1 + q + p * q) % 2,
  (p, q, r) => (p + q + p * q + q * r + p * q * r) % 2,
  (p, q, r) => (1 + r + p * r) % 2,
  (p, q, r) => (p + q + p * q + r + p * r) % 2,
  (p, q, r) => (1 + q * r + p * q * r) % 2,
  (p, q, r) => (p + q * r + p * q * r) % 2,
  (p, q, r) => (1 + q + p * q + r + p * r) % 2,
  (p, q, r) => p + r - p * r,
  (p, q, r) => (1 + q + p * q + q * r + p * q * r) % 2,
  (p, q, r) => p + q - p * q,
  (p, q, r) => (1 + r + p * r + q * r + p * q * r) % 2,
  (p, q, r) => q + p * (-1 + q) * (-1 + r) + r - q * r,
  (p, q, r) => 1,
];


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
  return states.map((element, index, array) => rule(array[index - 1] || 0, element, array[index + 1] || 0));
}

function clearCanvas(canvas) {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function run(canvas, N, rule, rate) {
  const context = canvas.getContext('2d');
  const cellSize = canvas.width/N;
  const stopStep = canvas.height/cellSize;
  let step = 0;
  let board = newBoard(N);
  clearInterval(intervalId);
  clearCanvas(canvas);
  intervalId = setInterval(() => {
    if (step > stopStep) clearInterval(intervalId);
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
  run(canvas, N, rules[rule], rate);
}

function init() {
  const select = document.getElementById('rule');
  const container = document.getElementsByTagName('body')[0];
  const canvas = document.getElementById('canvas');
  canvas.width = container.clientWidth;
  canvas.height = 1000;
  rules.forEach((rule, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    select.appendChild(option);
  });
}
