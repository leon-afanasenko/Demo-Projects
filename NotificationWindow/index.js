const navMenu = document.getElementById("navMenu");
const openButton = document.getElementById("openButton");
const closeButton = document.getElementById("closeButton");
const notificationsContainer = document.getElementById(
  "notificationsContainer"
);

const menuItems = document.querySelectorAll(".nav-menu__item");

const toggleMenu = () => {
  navMenu.classList.toggle("nav-menu--open");
};

openButton.addEventListener("click", () => {
  toggleMenu();
});

closeButton.addEventListener("click", () => {
  toggleMenu();
});

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    toggleSubmenu(index);
  });
});

const createSubmenu = () => {
  const submenu = document.createElement("div");
  submenu.classList.add("submenu");

  const subItem1 = document.createElement("div");
  subItem1.classList.add("submenu__item");
  subItem1.textContent = "Подпункт 1";
  submenu.appendChild(subItem1);

  const subItem2 = document.createElement("div");
  subItem2.classList.add("submenu__item");
  subItem2.textContent = "Подпункт 2";
  submenu.appendChild(subItem2);

  const subItem3 = document.createElement("div");
  subItem3.classList.add("submenu__item");
  subItem3.textContent = "Подпункт 3";
  submenu.appendChild(subItem3);

  return submenu;
};

const toggleSubmenu = (index) => {
  const item = menuItems[index];
  let submenu = item.nextElementSibling;

  if (submenu && submenu.classList.contains("submenu")) {
    submenu.style.display = submenu.style.display === "flex" ? "none" : "flex";
  } else {
    submenu = createSubmenu();
    item.parentNode.insertBefore(submenu, item.nextElementSibling);
    submenu.style.display = "flex";
  }
};

function createOrder(e) {
  e.preventDefault();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Данные получены");
    }, 2000);
  });
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  await createOrder(e);

  showNotifications();

  notificationsContainer.insertAdjacentHTML(
    "afterbegin",
    constructNotification(
      "Заказ создан",
      "Ожидайте дальнейшей информации",
      "success"
    )
  );
});

const getNotificationError = (type) => {
  switch (type) {
    case "success":
      return "<span class='material-symbols-rounded'> done </span>";
    case "info":
      return "<span class='material-symbols-rounded'>info</span>";
    case "error":
      return "<span class='material-symbols-rounded'>error</span>";
    default:
      return "<span class='material-symbols-rounded'> done </span>";
  }
};

const constructNotification = (title, text, type) => {
  const notification = `
    <div class="notification notification--${type}">
      <div class="notification__icon">
        ${getNotificationError(type)}
      </div>
      <div class="notification__data">
        <div class="notification__title">${title}</div>
        <div class="notification__text">${text}</div>
      </div>
      <span class="material-symbols-rounded notification__close" onclick="closeNotification(this)">
        close
      </span>
    </div>
  `;
  return notification;
};

const closeNotification = (notification) => {
  notification.parentElement.classList.add("notification--hidden");
  setTimeout(() => {
    notification.parentElement.remove();
  }, 300);
};

const buttonsContainer = document.querySelector("#buttons");
buttonsContainer.classList.remove("buttons--hidden");

document.querySelector("#buttonPaid").addEventListener("click", () => {
  showNotifications();

  notificationsContainer.insertAdjacentHTML(
    "afterbegin",
    constructNotification(
      "Заказ оплачен",
      "Ваш заказ был успешно оплачен",
      "success"
    )
  );
});

document.querySelector("#buttonInDelivery").addEventListener("click", () => {
  showNotifications();
  notificationsContainer.insertAdjacentHTML(
    "afterbegin",
    constructNotification("Доставляется", "Ваш заказ в пути", "info")
  );
});

document.querySelector("#buttonError").addEventListener("click", () => {
  showNotifications();

  notificationsContainer.insertAdjacentHTML(
    "afterbegin",
    constructNotification("Ошибка", "Произошла ошибка с вашим заказом", "error")
  );
});

const showNotifications = () => {
  notificationsContainer.classList.remove("notifications-container--hidden");
};
