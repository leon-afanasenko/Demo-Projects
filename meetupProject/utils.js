export function createDomElement({ tag, className, textValue = "", ...atrs }) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = textValue;
  Object.keys(atrs).forEach((atr) => {
    element.setAttribute(atr, atrs[atr]);
  });
  return element;
}
export function formatDate(date) {
  const newDate = new Date(date);
  const optionsDays = {
    weekday: "short",
    month: "short",
    day: "2-digit",
  };
  const optionsHours = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
    timeZoneName: "short",
  };
  const formatedDays = new Intl.DateTimeFormat("en-US", optionsDays).format(newDate);
  const formatedHours = new Intl.DateTimeFormat("en-US", optionsHours).format(newDate);
  return `${formatedDays} · ${formatedHours} `;
}
