let metaballs = [];

function setup() {
  let canvas = createCanvas(256, 256);
  canvas.id("metaballCanvas"); // Para usar como textura en A-Frame

  // Crear varias metaballs
  for (let i = 0; i < 3; i++) {
    metaballs.push(new Metaball(random(width), random(height), random(30, 60)));
  }
  noStroke();
}

function draw() {
  background(0);
  let threshold = 100;

  loadPixels();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let sum = 0;
      for (let m of metaballs) {
        let dx = x - m.x;
        let dy = y - m.y;
        let dSq = dx * dx + dy * dy;
        if (dSq !== 0) {
          sum += (m.r * m.r) / dSq;
        }
      }

      let index = (x + y * width) * 4;
      let colorValue = sum >= threshold ? 255 : 0;
      pixels[index] = colorValue;
      pixels[index + 1] = 0;
      pixels[index + 2] = 255;
      pixels[index + 3] = 255;
    }
  }

  updatePixels();

  for (let m of metaballs) {
    m.move();
  }
}

class Metaball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = random(-1.5, 1.5);
    this.vy = random(-1.5, 1.5);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
}
