const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const bikeImage = new Image();
bikeImage.src = "img/photo_2024-07-13_15-09-41-removebg-preview (2).png";
let bikeX = 50;
let bikeY = 50;
let bikeSpeed = 5; // Увеличим скорость для более быстрого перемещения
let bikeAngle = 0;
let jumpHeight = 0;
let isJumping = false;
let jumpSpeed = 4;
let gravity = 0.2;

function drawBike() {
  ctx.save();
  ctx.translate(bikeX, bikeY - jumpHeight);
  ctx.rotate(bikeAngle);
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(
    bikeImage,
    -bikeImage.width / 4,
    -bikeImage.height / 4,
    bikeImage.width / 2,
    bikeImage.height / 2
  );
  ctx.globalCompositeOperation = "destination-in";
  ctx.fillRect(
    -bikeImage.width / 4,
    -bikeImage.height / 4,
    bikeImage.width / 2,
    bikeImage.height / 2
  );

  ctx.restore();
}

function update() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (isJumping) {
    jumpHeight += jumpSpeed;
    if (jumpHeight >= 100) {
      isJumping = false;
    }
  } else {
    if (bikeY - jumpHeight < canvas.height - 50) {
      jumpHeight -= gravity;
    } else {
      jumpHeight = 0;
    }
  }
  if (keysDown["w"]) {
    bikeX += bikeSpeed * Math.cos(bikeAngle);
    bikeY += bikeSpeed * Math.sin(bikeAngle);
  }
  if (keysDown["s"]) {
    bikeX -= bikeSpeed * Math.cos(bikeAngle);
    bikeY -= bikeSpeed * Math.sin(bikeAngle);
  }
  if (keysDown["a"]) {
    bikeAngle -= 0.1;
  }
  if (keysDown["d"]) {
    bikeAngle += 0.1;
  }

  if (bikeX + bikeImage.width / 4 < 0) {
    bikeX = canvas.width - bikeImage.width / 4;
  } else if (bikeX - bikeImage.width / 4 > canvas.width) {
    bikeX = 0 - bikeImage.width / 4;
  }
  if (bikeY + bikeImage.height / 4 < 0) {
    bikeY = canvas.height - bikeImage.height / 4;
  } else if (bikeY - bikeImage.height / 4 > canvas.height) {
    bikeY = 0 - bikeImage.height / 4;
  }

  drawBike();
  requestAnimationFrame(update);
}

const keysDown = {};
window.addEventListener("keydown", function (e) {
  keysDown[e.key] = true;
  if (e.key === " ") {
    if (!isJumping) {
      isJumping = true;
    }
  }
});
window.addEventListener("keyup", function (e) {
  delete keysDown[e.key];
});

bikeImage.onload = function () {
  update();
};
