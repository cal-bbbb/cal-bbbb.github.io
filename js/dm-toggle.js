const darkModeSwitch = document.getElementById("dm-switch");
const bttButton = document.getElementById("return-to-top");
const toggleClasses = document.getElementsByClassName("dm-toggle");
const bodyButtons = document.getElementsByClassName("body-button");

// Function to toggle dark class based on action and elements
const toggleDarkClass = (elements, action) => {
  for (let element of elements) {
    element.classList[action]("dark");
  }
};

const applyDarkMode = (isDark) => {
  const action = isDark ? "add" : "remove";
  toggleDarkClass([document.body, bttButton, ...bodyButtons, ...toggleClasses], action);
  darkModeSwitch.checked = isDark;
  localStorage.setItem("darkMode", isDark ? "true" : "false");
};

let darkMode = localStorage.getItem("darkMode");
if (!darkMode) {
  darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "true" : "false";
}

if (darkMode === "true") {
  applyDarkMode(true);
}

darkModeSwitch.addEventListener("change", () => {
  const isDark = darkModeSwitch.checked;
  applyDarkMode(isDark);
  localStorage.setItem("userToggled", "true"); // Set the userToggled flag
});

// Listener for system preferences
let darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

const updateDarkMode = () => {
  const userToggled = localStorage.getItem("userToggled") === "true";
  
  // If the user has manually toggled the switch, don't change the theme
  if (!userToggled) {
    const isDark = darkModeMediaQuery.matches;
    applyDarkMode(isDark);
  }
};

// Event listener for changes in the system's dark mode preference
darkModeMediaQuery.addEventListener("change", updateDarkMode);

// Initial update to match the current system preference
updateDarkMode();

if (darkMode) {
  localStorage.removeItem("userToggled");
}
