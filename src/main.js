import Player from "./player.js";
import Projectile from "./projectile.js";
import Enemy from "./enemy.js";
import Particle from "./particle.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let score = 0;
const scoreElem = document.querySelector("#score");
const bigScoreEl = document.querySelector("#bigScoreEl");
const startGameBtn = document.querySelector("#startGameBtn");
const modalEl = document.querySelector("#modalEl");

canvas.width = innerWidth;
canvas.height = innerHeight;

const player = new Player(canvas.width / 2, canvas.height / 2, 30, "white");

let projectiles = [];
let enemies = [];
let particles = [];

function spawnEnemies() {
  setInterval(() => {
    const radius = Math.random() * (30 - 4) + 34;
    let x, y;

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? -radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? -radius : canvas.height + radius;
    }
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };

    const enemy = new Enemy(x, y, radius, color, velocity);
    enemies.push(enemy);
  }, 1000);
}

let animationId;

function increaseScore() {
  score += 100;
  scoreElem.innerHTML = score;
}

function animate() {
  animationId = requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);

  particles.forEach((particle, idx) => {
    if (particle.alpha <= 0) {
      particles.splice(idx, 1);
    } else {
      particle.update(ctx);
    }
  });

  projectiles.forEach((projectile, idx) => {
    projectile.update();
    projectile.draw(ctx);

    // remove projectiles from game if they are off screen
    if (
      projectile.positionX + projectile.radius < 0 ||
      projectile.positionX - projectile.radius > canvas.width ||
      projectile.positionY + projectile.radius < 0 ||
      projectile.positionY - projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        projectiles.splice(idx, 1);
      }, 0);
    }
  });

  enemies.forEach((enemy, idx) => {
    enemy.update();

    const distPlayer = Math.hypot(
      player.positionX - enemy.positionX,
      player.positionY - enemy.positionY
    );

    // end game
    if (distPlayer - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationId);
      modalEl.style.display = "flex";
      bigScoreEl.innerHTML = score;
    }

    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(
        projectile.positionX - enemy.positionX,
        projectile.positionY - enemy.positionY
      );

      // Enemy projectiles hit
      if (dist - enemy.radius - projectile.radius < 1) {
        increaseScore();

        // Create explosions
        for (let i = 0; i < enemy.radius * 2; i++) {
          particles.push(
            new Particle(
              projectile.positionX,
              projectile.positionY,
              Math.random() * 2,
              enemy.color,
              {
                x: (Math.random() - 0.6) * (Math.random() * 6),
                y: (Math.random() - 0.6) * (Math.random() * 6),
              }
            )
          );
        }

        if (enemy.radius - 10 > 5) {
          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1);
          }, 0);
        } else {
          setTimeout(() => {
            enemies.splice(idx, 1);
            projectiles.splice(projectileIndex, 1);
          }, 0);
        }
      }
    });

    enemy.draw(ctx);
  });
}

addEventListener("click", (event) => {
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const radius = 8;
  const color = "white";
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  const velocity = {
    x: Math.cos(angle) * 7,
    y: Math.sin(angle) * 7,
  };
  const projectile = new Projectile(x, y, radius, velocity, color);
  projectiles.push(projectile);
});

function initGame() {
  projectiles = [];
  enemies = [];
  particles = [];
  score = 0;
  scoreElem.innerHTML = score;
  bigScoreEl.innerHTML = score;
}

startGameBtn.addEventListener("click", (event) => {
  initGame();
  animate();
  spawnEnemies();
  modalEl.style.display = "none";
});
