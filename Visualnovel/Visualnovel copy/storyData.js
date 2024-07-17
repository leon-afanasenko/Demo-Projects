// storyData.js
const story = [
  {
    id: 1,
    text: "Tomorrow, we embark on a crucial mission. The fate of our village depends on our success.",
    rightCharacter: "img/character1.png",
    background: "img/background1.webp",
    choices: [
      { text: "Ask about the plan", nextPart: 2 },
      { text: "Express determination", nextPart: 3 },
    ],
  },
  {
    id: 2,
    text: "The plan is simple but dangerous. We'll infiltrate the enemy's camp at dawn, when their defenses are weakest.",
    rightCharacter: "img/character2.png",
    background: "img/background2.jpg",
    choices: [
      { text: "Inquire about backup", nextPart: 4 },
      { text: "Show confidence", nextPart: 5 },
    ],
  },
  {
    id: 3,
    text: "I'm ready. Our village will be safe. We have trained for this day.",
    rightCharacter: "img/character2.png",
    background: "img/background2.jpg",
    choices: [
      { text: "Prepare weapons", nextPart: 4 },
      { text: "Gather the team", nextPart: 5 },
    ],
  },
  {
    id: 4,
    text: "привет пидор",
    rightCharacter: "img/character2.png",
    background: "img/background3.jpg",
    choices: [
      { text: "Inquire about backup", nextPart: 6 },
      { text: "Show confidence", nextPart: 7 },
    ],
  },
  {
    id: 5,
    text: "хуй",
    rightCharacter: "img/character2.png",
    background: "img/background3.jpg",
    choices: [
      { text: "Prepare weapons", nextPart: 6 },
      { text: "Gather the team", nextPart: 7 },
    ],
  },
  {
    id: 6,
    text: "лох",
    rightCharacter: "img/character1.png",
    background: "img/background4.jpg",
    choices: [
      { text: "Inquire about backup", nextPart: 4 },
      { text: "Show confidence", nextPart: 5 },
    ],
  },
  {
    id: 7,
    text: "I'm ready.",
    rightCharacter: "img/character1.png",
    background: "img/background4.jpg",
    choices: [
      { text: "Prepare weapons", nextPart: 6 },
      { text: "Gather the team", nextPart: 7 },
    ],
  },
];

export default story;
