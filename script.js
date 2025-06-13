// Animate skill bars when skills section enters viewport
document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skill");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skill = entry.target;
          const percent = skill.getAttribute("data-percent");
          const progressBar = skill.querySelector(".skill-progress");
          progressBar.style.width = percent + "%";
          obs.unobserve(skill);
        }
      });
    },
    {
      threshold: 0.6,
    }
  );

  skills.forEach(skill => observer.observe(skill));
});


// Canvas background animation - subtle connecting dots network
const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("3d");
let width, height;
let dots = [];
const DOT_COUNT = 50;
const MAX_DIST = 150;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener("resize", resize);
resize();

class Dot {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.radius = 2;
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "rgba(243, 156, 18, 0.8)";
    ctx.shadowColor = "#f39c12";
    ctx.shadowBlur = 5;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function connectDots(dot1, dot2) {
  const dist = Math.hypot(dot1.x - dot2.x, dot1.y - dot2.y);
  if (dist < MAX_DIST) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(243, 156, 18, ${1 - dist / MAX_DIST})`;
    ctx.lineWidth = 1;
    ctx.moveTo(dot1.x, dot1.y);
    ctx.lineTo(dot2.x, dot2.y);
    ctx.stroke();
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  dots.forEach(dot => {
    dot.move();
    dot.draw();
  });
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      connectDots(dots[i], dots[j]);
    }
  }
  requestAnimationFrame(animate);
}

function initDots() {
  dots = [];
  for (let i = 0; i < DOT_COUNT; i++) {
    dots.push(new Dot());
  }
}
initDots();
animate();

// Certificates clickable logic (open link with low opacity effect)
document.querySelectorAll(".certificate").forEach(cert => {
  cert.addEventListener("click", () => {
    const url = cert.getAttribute("data-link");
    if (url) window.open(url, "_blank");
  });
});
