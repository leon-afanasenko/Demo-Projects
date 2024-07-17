const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

document.addEventListener("keydown", function (event) {
  if (
    (event.code === "Space" || event.code === "Enter") &&
    !dino.classList.contains("jumping")
  ) {
    dino.classList.add("jumping");

    setTimeout(() => {
      dino.classList.remove("jumping");
    }, 500);
  }
});

function startGame() {
  let isAlive = setInterval(function () {
    let dinoTop = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top")
    );
    let cactusLeft = parseInt(
      window.getComputedStyle(cactus).getPropertyValue("left")
    );

    if (
      cactusLeft < 50 &&
      cactusLeft > 0 &&
      dinoTop >= 140 &&
      !dino.classList.contains("jumping")
    ) {
      alert("GAME OVER!");
      clearInterval(isAlive);
      startGame();
    }
  }, 10);
  return isAlive;
}
let isAlive = startGame();
