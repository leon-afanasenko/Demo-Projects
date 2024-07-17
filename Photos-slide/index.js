const root = document.querySelector("#root");
let slider_index = 0;
const images = [
  "https://www.vinterier.ru/pictures/shop/krasivyiy-peiyzag-kartina-maslom-40x30.jpg",
  "https://kartin.papik.pro/uploads/posts/2023-07/thumbs/1688461053_kartin-papik-pro-p-kartinki-priroda-leto-krasivie-v-khoroshem-56.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Altdorfer-Donau.jpg/220px-Altdorfer-Donau.jpg",
  "https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=600&h=400",
];

const frame = document.createElement("div");
const cards = document.createElement("div");
frame.classList.add("frame");
cards.classList.add("cards");

for (let i = 0; i < images.length; i++) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundImage = `url("${images[i]}")`;
  cards.append(card);
}
frame.append(cards);
root.append(frame);

function create_rounds() {
  const container = document.createElement("div");
  container.classList.add("rounds");
  for (let i = 0; i < images.length; i++) {
    const button = document.createElement("button");
    if (i === 0) {
      button.classList.add("active");
    }
    container.append(button);
    button.addEventListener("click", function () {
      slider_index = i;
      updateSlider();
    });
  }
  frame.append(container);
}

const left_btn = document.createElement("button");
const right_btn = document.createElement("button");
const triggers = document.createElement("div");
left_btn.innerText = "<";
right_btn.innerText = ">";
triggers.classList.add("triggers");
triggers.append(left_btn, right_btn);
frame.append(triggers);

function go_left() {
  if (slider_index !== 0) {
    slider_index--;
    updateSlider();
  }
}

function go_right() {
  if (slider_index < images.length - 1) {
    slider_index++;
    updateSlider();
  }
}

function updateSlider() {
  cards.style.left = `${-1 * slider_index * 500}px`;

  const allButtons = document.querySelectorAll(".rounds button");
  allButtons.forEach((button, index) => {
    if (index === slider_index) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

left_btn.addEventListener("click", go_left);
right_btn.addEventListener("click", go_right);

create_rounds();
