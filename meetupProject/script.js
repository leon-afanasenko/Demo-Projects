const eventsStore = [
  {
    title: "INFJ Personality Type - Coffee Shop Meet & Greet",
    description: "Being an INFJ",
    date: new Date(2024, 2, 23, 15),
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w",
    type: "offline",
    attendees: 99,
    category: "Hobbies and Passions",
    distance: 50,
  },
  {
    title:
      "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
    description: "New York AI Users",
    date: new Date(2024, 2, 23, 11, 30),
    image:
      "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "offline",
    attendees: 43,
    category: "Technology",
    distance: 25,
  },
  {
    title: "Book 40+ Appointments Per Month Using AI and Automation",
    description: "New Jersey Business Network",
    date: new Date(2024, 2, 16, 14),
    image:
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    category: "Technology",
    distance: 10,
  },
  {
    title: "Dump writing group weekly meetup",
    description: "Dump writing group",
    date: new Date(2024, 2, 13, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 77,
    category: "Business",
    distance: 100,
  },
  {
    title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
    description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 140,
    category: "Social Activities",
    distance: 75,
  },
  {
    title: "All Nations - Manhattan Missions Church Bible Study",
    description: "Manhattan Bible Study Meetup Group",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "offline",
    category: "Health and Wellbeing",
    distance: 15,
  },
];

const typeFilter = document.querySelector(".type-filter");
const distanceFilter = document.querySelector(".distance-filter");
const categoryFilter = document.querySelector(".category-filter");
const eventList = document.querySelector(".event-list");

typeFilter.addEventListener("change", filterEvents);
distanceFilter.addEventListener("change", filterEvents);
categoryFilter.addEventListener("change", filterEvents);

function filterEvents() {
  const selectedType = typeFilter.value;
  const selectedDistance = distanceFilter.value;
  const selectedCategory = categoryFilter.value;

  const filteredEvents = eventsStore.filter((event) => {
    return (
      (selectedType === "" || event.type === selectedType) &&
      (selectedDistance === "" || event.distance <= selectedDistance) &&
      (selectedCategory === "" || event.category === selectedCategory)
    );
  });

  eventList.innerHTML = "";
  filteredEvents.forEach((event) => {
    const eventItem = document.createElement("div");
    const eventText = document.createElement("div");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const image = document.createElement("img");
    const date = document.createElement("p");
    const attendees = document.createElement("p");

    title.textContent = event.title;
    description.textContent = event.description;
    image.src = event.image;
    image.alt = event.title;
    date.textContent = `Date: ${event.date.toLocaleDateString()}`;
    attendees.textContent = `Attendees: ${event.attendees}`;

    eventItem.appendChild(image);
    eventText.appendChild(title);
    eventText.appendChild(description);
    eventText.appendChild(date);
    eventText.appendChild(attendees);
    eventItem.appendChild(eventText);

    eventList.appendChild(eventItem);
  });
}

filterEvents();

/*------------------------------------------------------------*/

const searchEventInput = document.querySelector(".search-events-input");
const searchCityInput = document.querySelector(".search-city-input");
const searchButton = document.querySelector(".searchBtn");
const searchButtonTwo = document.querySelector(".searchBtnTwo");
const whiteSpanOne = document.querySelector(".whiteOne");
const whiteSpanTwo = document.querySelector(".whiteTwo");

searchEventInput.addEventListener("input", () => {
  updateButtonStyles();
});

searchCityInput.addEventListener("input", () => {
  updateButtonStylesTwo();
});

function updateButtonStyles() {
  if (searchEventInput.value) {
    searchButton.style.backgroundColor = "#F65858";
    whiteSpanOne.style.color = "white";
  } else {
    searchButton.style.backgroundColor = "transparent";
    whiteSpanOne.style.color = "#707070";
  }
}

function updateButtonStylesTwo() {
  if (searchCityInput.value) {
    searchButtonTwo.style.backgroundColor = "#F65858";
    whiteSpanTwo.style.color = "white";
  } else {
    searchButtonTwo.style.backgroundColor = "transparent";
    whiteSpanTwo.style.color = "#707070";
  }
}

/*-------------------------------------------------------------------*/

const homeImage = document.querySelector(".homePage");

homeImage.addEventListener("click", function () {
  window.location.href = "/mainPage.html";
});
