const modal = document.getElementById("modal");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeModal");
const hamster = document.getElementById("hamster");

let isModalOpen = false;

const openModal = () => {
  if (isModalOpen) return; // Прерываем функцию, если модальное окно уже открыто

  isModalOpen = true;

  hamster.classList.remove("hamster--hidden");
  hamster.style.top = "-200px";

  setTimeout(() => {
    hamster.style.top = `${
      openModalButton.offsetTop +
      openModalButton.offsetHeight / 2 -
      hamster.clientHeight / 2
    }px`;
  }, 100);

  setTimeout(() => {
    openModalButton.style.transform = "scale(0.95)";
  }, 1900);

  setTimeout(() => {
    openModalButton.style.transform = "scale(1)";
  }, 2000);

  // Открываем  окно и скрываем хомяка
  setTimeout(() => {
    modal.classList.remove("modal--hidden");
    hamster.classList.add("hamster--hidden");
  }, 2100);
};

const closeModal = () => {
  modal.classList.add("modal--hidden");
  isModalOpen = false;
};

openModalButton.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
