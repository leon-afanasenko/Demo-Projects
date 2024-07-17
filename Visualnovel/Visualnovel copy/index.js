document.addEventListener("DOMContentLoaded", function () {
  const storyText = document.getElementById("story-text");
  const rightCharacterImg = document.getElementById("right-character-img");
  const choicesDiv = document.getElementById("choices");
  const background = document.getElementById("background");

  let isTyping = false;
  const normalDelay = 150;
  const fastDelay = 30;
  let currentDelay = normalDelay;

  const story = [
    {
      id: 1,
      text: "Завтра мы отправимся на важное задание. Судьба нашей деревни зависит от нашего успеха.",
      rightCharacter: "img/character1.png",
      background: "img/background1.webp",
      choices: [
        { text: "Спросить о плане", nextPart: 1 },
        { text: "Выразить решимость", nextPart: 2 },
      ],
    },
    {
      id: 2,
      text: "План прост, но опасен. Мы проникнем в лагерь врага на рассвете, когда их оборона будет слабее всего.",
      rightCharacter: "img/character2.png",
      background: "img/background2.jpg",
      choices: [
        { text: "Узнать о подстраховке", nextPart: 3 },
        { text: "Показать уверенность", nextPart: 4 },
      ],
    },
    {
      id: 3,
      text: "Я готов. Наша деревня будет в безопасности. Мы готовились к этому дню.",
      rightCharacter: "img/character2.png",
      background: "img/background2.jpg",
      choices: [
        { text: "Подготовить оружие", nextPart: 3 },
        { text: "Собрать команду", nextPart: 4 },
      ],
    },
    {
      id: 4,
      text: "Наша подстраховка уже на месте. Они ждут сигнала.",
      rightCharacter: "img/character2.png",
      background: "img/background3.jpg",
      choices: [
        { text: "Начать операцию", nextPart: 5 },
        { text: "Проверить всё ещё раз", nextPart: 6 },
      ],
    },
    {
      id: 5,
      text: "Мы справимся. Я уверен в этом.",
      rightCharacter: "img/character2.png",
      background: "img/background3.jpg",
      choices: [
        { text: "Начать операцию", nextPart: 5 },
        { text: "Проверить всё ещё раз", nextPart: 6 },
      ],
    },
    {
      id: 6,
      text: "Операция началась. Мы пробираемся через лес к лагерю врага.",
      rightCharacter: "img/character4.png",
      background: "img/background4.jpg",
      choices: [
        { text: "Двигаться дальше", nextPart: 7 },
        { text: "Остановиться и оценить обстановку", nextPart: 8 },
      ],
    },
    {
      id: 7,
      text: "Мы проверили всё ещё раз и убедились, что всё готово.",
      rightCharacter: "img/character4.png",
      background: "img/background4.jpg",
      choices: [
        { text: "Начать операцию", nextPart: 7 },
        { text: "Оценить обстановку", nextPart: 8 },
      ],
    },
    {
      id: 8,
      text: "Мы пробрались в лагерь врага и видим их командиров.",
      rightCharacter: "img/character5.png",
      background: "img/background5.jpg",
      choices: [
        { text: "Атаковать командиров", nextPart: 9 },
        { text: "Подслушать их разговор", nextPart: 10 },
      ],
    },
    {
      id: 9,
      text: "Мы остановились, чтобы оценить обстановку. Враг может быть где угодно.",
      rightCharacter: "img/character5.png",
      background: "img/background5.jpg",
      choices: [
        { text: "Двигаться дальше", nextPart: 9 },
        { text: "Вернуться назад", nextPart: 10 },
      ],
    },
    {
      id: 10,
      text: "Мы атаковали командиров и одержали победу. Наша деревня спасена.",
      rightCharacter: "img/character6.png",
      background: "img/background6.jpg",
      choices: [
        { text: "Двигаться дальше", nextPart: 11 },
        { text: "Вернуться назад", nextPart: 12 },
      ],
    },
    {
      id: 11,
      text: "Мы подслушали их разговор и узнали о их планах.",
      rightCharacter: "img/character6.png",
      background: "img/background6.jpg",
      choices: [
        { text: "Сообщить команде", nextPart: 11 },
        { text: "Продолжать подслушивать", nextPart: 12 },
      ],
    },
    {
      id: 12,
      text: "Мы вернулись в деревню с хорошими новостями. Наша деревня в безопасности.",
      rightCharacter: "img/character7.png",
      background: "img/background7.jpg",
      choices: [
        { text: "Сообщить команде", nextPart: 13 },
        { text: "Продолжать подслушивать", nextPart: 14 },
      ],
    },
    {
      id: 13,
      text: "Мы продолжили подслушивать и узнали ещё больше.",
      rightCharacter: "img/character7.png",
      background: "img/background7.jpg",
      choices: [
        { text: "Сообщить команде", nextPart: 13 },
        { text: "Продолжать подслушивать", nextPart: 14 },
      ],
    },
  ];

  function typeText(text, index, callback) {
    if (index === 0) {
      isTyping = true;
    }

    if (index < text.length) {
      storyText.textContent += text.charAt(index);
      setTimeout(() => typeText(text, index + 1, callback), currentDelay);
    } else {
      storyText.textContent = text;
      isTyping = false;
      callback();
    }
  }

  function updateStory(partIndex) {
    const part = story[partIndex];
    storyText.textContent = "";
    rightCharacterImg.src = part.rightCharacter;
    background.style.backgroundImage = `url(${part.background})`;

    typeText(part.text, 0, () => {
      choicesDiv.innerHTML = "";
      part.choices.forEach((choice) => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.classList.add("choice-button");
        button.addEventListener("click", () => updateStory(choice.nextPart));
        choicesDiv.appendChild(button);
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && isTyping) {
      currentDelay = fastDelay;
    }
  });

  document.addEventListener("keyup", function (event) {
    if (event.code === "Space") {
      currentDelay = normalDelay;
    }
  });

  document.addEventListener("mousedown", function () {
    if (isTyping) {
      currentDelay = fastDelay;
    }
  });

  document.addEventListener("mouseup", function () {
    currentDelay = normalDelay;
  });

  updateStory(0);
  createParticlesEffect();
});

function createParticlesEffect() {
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");
  let particlesArray = [];
  const numberOfParticles = 100;
  const colors = ["#ffffff", "#ffddcc", "#ffccaa"];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5 + 1;
      this.baseSize = this.size; // Базовый размер частицы для пульсации
      this.sizeIncrement = 0.025; // Уменьшенная скорость изменения размера
      this.speedX = Math.random() * 0.3 - 0.1; // Уменьшена скорость в 3 раза
      this.speedY = Math.random() * 0.3 - 0.1; // Уменьшена скорость в 3 раза
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Изменение размера для создания эффекта пульсации
      if (this.size > this.baseSize * 1.5 || this.size < this.baseSize * 0.5) {
        this.sizeIncrement = -this.sizeIncrement; // Меняем направление изменения размера
      }
      this.size += this.sizeIncrement;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }

  function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
  }

  init();
  animate();
}
