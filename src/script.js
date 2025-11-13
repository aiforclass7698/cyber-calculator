// === 背景光點效果 ===
const c = document.createElement('canvas');
document.body.appendChild(c);
const ctx = c.getContext('2d');
let w, h, particles = [];

function resize() {
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function createParticles(num) {
  for (let i = 0; i < num; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    });
  }
}
createParticles(120);

function animate() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(0,255,255,0.6)";
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

// === 自訂游標與軌跡 ===
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

let trail = [];
window.addEventListener('mousemove', (e) => {
  trail.push({ x: e.clientX, y: e.clientY, alpha: 1 });
  if (trail.length > 20) trail.shift();
});

function drawTrail() {
  trail.forEach((p, i) => {
    const span = document.createElement('span');
    span.style.position = 'fixed';
    span.style.left = p.x + 'px';
    span.style.top = p.y + 'px';
    span.style.width = '10px';
    span.style.height = '10px';
    span.style.borderRadius = '50%';
    span.style.background = 'rgba(0,255,255,' + p.alpha + ')';
    span.style.boxShadow = '0 0 10px #00ffff';
    span.style.pointerEvents = 'none';
    span.style.zIndex = '998';
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 60);
  });
  if (trail.length > 0) {
    const last = trail[trail.length - 1];
    cursor.style.transform = `translate(${last.x - 10}px, ${last.y - 10}px)`;
  }
  requestAnimationFrame(drawTrail);
}
drawTrail();

// === 計算機邏輯 ===
let display = document.getElementById("display");

function press(value) {
  display.value += value;
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}

function clearDisplay() {
  display.value = "";
}
