const court = document.getElementById("court"); // Получаем элемент "court"
const ball = document.getElementById("ball"); // Получаем элемент "ball"
const player1 = document.getElementById("player1"); // Получаем элемент "player1"
const player2 = document.getElementById("player2"); // Получаем элемент "player2"
const aiSwitch = document.getElementById("aiSwitch"); // Получаем элемент "aiSwitch"
const player1ScoreElement = document.getElementById("player1Score"); // Получаем элемент "player1Score"
const player2ScoreElement = document.getElementById("player2Score"); // Получаем элемент "player2Score"
const winMessage = document.getElementById("winMessage"); // Получаем элемент "winMessage"
const winText = document.getElementById("winText"); // Получаем элемент "winText"
const restartButton = document.getElementById("restartButton"); // Получаем элемент "restartButton"

let ballX = court.offsetWidth / 2; // Начальное положение мяча по горизонтали (в центре поля)
let ballY = court.offsetHeight / 2; // Начальное положение мяча по вертикали (в центре поля)
let ballSpeedX = getRandomDirection() * 10; // скорость мяча по горизонтали
let ballSpeedY = (Math.random() - 0.5) * 20; // скорость мяча по вертикали

let player1Y = (player2Y = (court.offsetHeight - player1.offsetHeight) / 2); // Начальное положение игроков по вертикали (в центре поля)
let player1Speed = 20; // скорость ракетки игрока 1
let player2Speed = 20; // скорость ракетки игрока 2

let player1Score = 0; // Счет игрока 1
let player2Score = 0; // Счет игрока 2

const winningScore = 10; // Очки для победы

let player1MovingUp = false; // Флаг, указывающий, двигается ли игрок 1 вверх
let player1MovingDown = false; // Флаг, указывающий, двигается ли игрок 1 вниз

function getRandomDirection() {
  return Math.random() < 0.5 ? -1 : 1; // Случайное направление (-1 или 1)
}

function movePlayerTowardsBall(playerY, player, playerSpeed) {
  const playerCenterY = playerY + player.offsetHeight / 2; // Центр ракетки по вертикали
  if (ballY < playerCenterY - 20) {
    // Если мяч выше ракетки
    playerY -= playerSpeed; // Ракетка двигается вверх
  } else if (ballY > playerCenterY + 20) {
    // Если мяч ниже ракетки
    playerY += playerSpeed; // Ракетка двигается вниз
  }
  return Math.max(
    0, // Минимальное положение ракетки (верх поля)
    Math.min(court.offsetHeight - player.offsetHeight, playerY) // Максимальное положение ракетки (низ поля)
  );
}

function updatePositions() {
  player1.style.top = player1Y + "px"; // Обновляем положение игрока 1
  player2.style.top = player2Y + "px"; // Обновляем положение игрока 2
}

function createParticles(collisionX, collisionY) {
  const numParticles = 150; // Количество частиц

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement("div"); // Создаем частицу
    particle.classList.add("particle"); // Добавляем класс "particle"

    const particleSize = Math.random() * 10 + 4; // Случайный размер частицы
    particle.style.width = particleSize + "px"; // Устанавливаем размер частицы
    particle.style.height = particleSize + "px"; // Устанавливаем размер частицы

    const angle = Math.random() * Math.PI * 2; // Случайный угол движения
    const speed = Math.random() * 10; // Случайная скорость движения
    const xOffset = Math.cos(angle) * speed; // Смещение по горизонтали
    const yOffset = Math.sin(angle) * speed; // Смещение по вертикали

    particle.style.left = collisionX + xOffset + "px"; // Положение частицы по горизонтали
    particle.style.top = collisionY + yOffset + "px"; // Положение частицы по вертикали

    court.appendChild(particle); // Добавляем частицу на поле

    setTimeout(() => {
      particle.style.left = `${parseFloat(particle.style.left) + xOffset}px`;
      particle.style.top = `${parseFloat(particle.style.top) + yOffset}px`; // Движение частицы
    }, 10);

    setTimeout(() => {
      court.removeChild(particle); // Удаление частицы с поля
    }, 500);
  }
}

function moveBall() {
  ballX += ballSpeedX; // Обновляем положение мяча по горизонтали
  ballY += ballSpeedY; // Обновляем положение мяча по вертикали

  if (ballY < 0 || ballY > court.offsetHeight - ball.offsetHeight) {
    // Если мяч касается верхней или нижней границы поля
    ballSpeedY = -ballSpeedY; // Отскок мяча от стенки
    createParticles(ballX, ballY); // Создаем частицы
  }

  const player1RightEdge = player1.offsetLeft + player1.offsetWidth; // Правый край ракетки игрока 1
  const player2LeftEdge = player2.offsetLeft; // Левый край ракетки игрока 2

  if (
    ballX < player1RightEdge && // Если мяч пересекает правую границу ракетки игрока 1
    ballY > player1Y && // Если мяч находится на уровне ракетки игрока 1
    ballY < player1Y + player1.offsetHeight
  ) {
    ballSpeedX = -ballSpeedX; // Отскок мяча от ракетки
    ballSpeedY +=
      ((player1Speed / 2) * (ballY - (player1Y + player1.offsetHeight / 2))) /
      (player1.offsetHeight / 2); // Добавляем вертикальную скорость мяча
    createParticles(ballX, ballY); // Создаем частицы
  } else if (
    ballX + ball.offsetWidth > player2LeftEdge && // Если мяч пересекает левую границу ракетки игрока 2
    ballY > player2Y && // Если мяч находится на уровне ракетки игрока 2
    ballY < player2Y + player2.offsetHeight
  ) {
    ballSpeedX = -ballSpeedX; // Отскок мяча от ракетки
    ballSpeedY +=
      ((player2Speed / 2) * (ballY - (player2Y + player2.offsetHeight / 2))) /
      (player2.offsetHeight / 2); // Добавляем вертикальную скорость мяча
    createParticles(ballX, ballY); // Создаем частицы
  }

  if (ballX < 0) {
    // Если мяч вышел за левую границу поля
    player2Score++; // Увеличиваем счет игрока 2
    if (player2Score >= winningScore) {
      // Если игрок 2 набрал 10 очков
      showWinMessage("Player 2 Wins!"); // Показываем сообщение о победе
    } else {
      resetBall(); // Перезапускаем игру
    }
  } else if (ballX > court.offsetWidth) {
    // Если мяч вышел за правую границу поля
    player1Score++; // Увеличиваем счет игрока 1
    if (player1Score >= winningScore) {
      // Если игрок 1 набрал 10 очков
      showWinMessage("Player 1 Wins!"); // Показываем сообщение о победе
    } else {
      resetBall(); // Перезапускаем игру
    }
  }

  ball.style.left = ballX + "px"; // Обновляем положение мяча по горизонтали
  ball.style.top = ballY + "px"; // Обновляем положение мяча по вертикали
}

function resetBall() {
  ballX = court.offsetWidth / 2; // Начальное положение мяча по горизонтали
  ballY = court.offsetHeight / 2; // Начальное положение мяча по вертикали
  ballSpeedX = getRandomDirection() * 10; // скорость мяча  //
  ballSpeedY = (Math.random() - 0.5) * 20; // Увеличена скорость мяча
  player1ScoreElement.textContent = player1Score; // Обновляем счет игрока 1
  player2ScoreElement.textContent = player2Score; // Обновляем счет игрока 2
}

document.addEventListener("keydown", (event) => {
  // Слушаем нажатие клавиш
  if (!aiSwitch.checked) {
    // Если AI отключен
    if (event.key === "w") {
      // Если нажата клавиша "w"
      player1MovingUp = true; // Устанавливаем флаг "player1MovingUp" в true
    } else if (event.key === "s") {
      // Если нажата клавиша "s"
      player1MovingDown = true; // Устанавливаем флаг "player1MovingDown" в true
    }
  }
});

document.addEventListener("keyup", (event) => {
  // Слушаем отпускание клавиш
  if (!aiSwitch.checked) {
    // Если AI отключен
    if (event.key === "w") {
      // Если отпущена клавиша "w"
      player1MovingUp = false; // Устанавливаем флаг "player1MovingUp" в false
    } else if (event.key === "s") {
      // Если отпущена клавиша "s"
      player1MovingDown = false; // Устанавливаем флаг "player1MovingDown" в false
    }
  }
});

function gameLoop() {
  if (aiSwitch.checked) {
    // Если AI включен
    player1Y = movePlayerTowardsBall(player1Y, player1, player1Speed); // Двигаем игрока 1 к мячу
    player2Y = movePlayerTowardsBall(player2Y, player2, player2Speed); // Двигаем игрока 2 к мячу
  } else {
    // Если AI выключен
    player2Y = movePlayerTowardsBall(player2Y, player2, player2Speed); // Двигаем игрока 2 к мячу
    if (player1MovingUp && player1Y > 0) {
      // Если игрок 1 двигается вверх и не дошел до верхней границы
      player1Y -= player1Speed; // Двигаем игрока 1 вверх
    } else if (
      player1MovingDown &&
      player1Y < court.offsetHeight - player1.offsetHeight
    ) {
      // Если игрок 1 двигается вниз и не дошел до нижней границы
      player1Y += player1Speed; // Двигаем игрока 1 вниз
    }
  }

  updatePositions(); // Обновляем положения игроков
  moveBall(); // Двигаем мяч

  requestAnimationFrame(gameLoop); // Запускаем новый кадр анимации
}

aiSwitch.addEventListener("change", () => {
  // Слушаем изменение состояния переключателя AI
  if (!aiSwitch.checked) {
    // Если AI выключен
    player1Y = player2Y = (court.offsetHeight - player1.offsetHeight) / 2; // Устанавливаем начальное положение игроков
    updatePositions(); // Обновляем положения игроков
  }
});

gameLoop(); // Запускаем игру

// Скрываем сообщение о победе по умолчанию
winMessage.style.display = "none";

// Функция для показа сообщения о победе
function showWinMessage(message) {
  winText.textContent = message;
  winMessage.style.display = "block";
}

// Функция для скрытия сообщения о победе и перезапуска игры
function hideWinMessage() {
  winMessage.style.display = "none";
  player1Score = 0;
  player2Score = 0;
  player1ScoreElement.textContent = player1Score;
  player2ScoreElement.textContent = player2Score;
  resetBall();
}
restartButton.addEventListener("click", hideWinMessage); // Слушаем нажатие кнопки "Restart Game"
