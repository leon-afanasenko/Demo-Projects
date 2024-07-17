const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

const buttons = document.querySelectorAll("button");
const youtubeLinks = [
  "https://www.youtube.com/watch?v=H6tNm72cMA8",
  "https://www.youtube.com/watch?v=2o8R59QPZQ0",
  "https://www.youtube.com/watch?v=NytUttpc2pQ",
  "https://www.youtube.com/watch?v=9Npd8QS5eIc",
  "https://www.youtube.com/watch?v=21f6LE8V7WE&list=RD21f6LE8V7WE&start_radio=1",
];

buttons.forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.style.cursor = "pointer";
  });

  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "pink";
  });

  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = "";
  });

  button.addEventListener("mousedown", () => {
    button.style.backgroundColor = "pink";
  });

  button.addEventListener("mouseup", () => {
    button.style.backgroundColor = "pink";
  });

  button.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * youtubeLinks.length);
    const randomLink = youtubeLinks[randomIndex];

    window.location.href = randomLink;
  });
});
localStorage.clear();
