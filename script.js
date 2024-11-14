const canvas = document.querySelector("#div__particles canvas");
const ctx = canvas.getContext("2d");
const branding = `rgba(20, 117, 188, ${Math.random() * 0.3 + 0.3})`;
const particles = [];
const particleCount = 50;

let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);

class Particle {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = branding;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > w || this.x < 0) this.speedX *= -1;
    if (this.y > h || this.y < 0) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animate);
}

init();
animate();

const constraints = {
  name: {
    presence: { allowEmpty: false },
  },
  email: {
    presence: { allowEmpty: false },
    email: true,
  },
  message: {
    presence: { allowEmpty: false },
  },
};

// ==================== FORM =============================

const form = document.getElementById("contact-form");

form.addEventListener(
  "submit",
  function (event) {
    const formValues = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      message: form.elements.message.value,
    };

    const errors = validate(formValues, constraints);

    if (errors) {
      event.preventDefault();
      const errorMessage = Object.values(errors)
        .map(function (fieldValues) {
          return fieldValues.join(", ");
        })
        .join("\n");

      sweetAlert("Oops...", errorMessage, "error");
    }
  },
  false
);
