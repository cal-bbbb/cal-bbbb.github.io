const darkModeSwitch = document.getElementById("dm-switch");
const bttButton = document.getElementById("return-to-top");
const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");
const resumeDownload = document.getElementById("download-resume");

const toggleClasses = document.getElementsByClassName("dm-toggle");
const bodyButtons = document.getElementsByClassName("body-button");

// Function to add or remove dark class to elements in the HTMLCollection
const toggleDarkClass = (elements, action) => {
  for (let i = 0; i < elements.length; i++) {
    action === "add"
      ? elements[i].classList.add("dark")
      : elements[i].classList.remove("dark");
  }
};

let darkMode = localStorage.getItem("darkMode");
if (darkMode === null) {
  darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "true" : "false";
  darkModeSwitch = window.matchMedia("(prefers-color-scheme: dark)").matches;
}

if (darkMode === "true") {
  document.body.classList.add("dark");
  bttButton.classList.add("dark");
  bar1.classList.add("dark");
  bar2.classList.add("dark");
  bar3.classList.add("dark");
  resumeDownload.classList.add("dark");
  toggleDarkClass(bodyButtons, "add");
  toggleDarkClass(toggleClasses, "add");
  darkModeSwitch.checked = true;
}

darkModeSwitch.addEventListener("change", () => {
  if (darkModeSwitch.checked) {
    document.body.classList.add("dark");
    bttButton.classList.add("dark");
    bar1.classList.add("dark");
    bar2.classList.add("dark");
    bar3.classList.add("dark");
    resumeDownload.classList.add("dark");

    toggleDarkClass(bodyButtons, "add");
    toggleDarkClass(toggleClasses, "add");
    localStorage.setItem("darkMode", "true");
  } else {
    document.body.classList.remove("dark");
    bttButton.classList.remove("dark");
    bar1.classList.remove("dark");
    bar2.classList.remove("dark");
    bar3.classList.remove("dark");
    resumeDownload.classList.remove("dark");

    toggleDarkClass(bodyButtons, "remove");
    toggleDarkClass(toggleClasses, "remove");
    localStorage.setItem("darkMode", "false");
  }
});

/* Listener for system preferences-- need to update the state of the button if I implement */
// Get the user's system dark mode preference
let darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// Function to update the site's theme to match the system preference
const updateDarkMode = () => {
  if (darkModeMediaQuery.matches) {
    document.body.classList.add("dark");
    bttButton.classList.add("dark");
    bar1.classList.add("dark");
    bar2.classList.add("dark");
    bar3.classList.add("dark");
    resumeDownload.classList.add("dark");

    toggleDarkClass(bodyButtons, "add");
    toggleDarkClass(toggleClasses, "add");
    darkModeSwitch.checked = true;
    localStorage.setItem("darkMode", "true");
  } else {
    document.body.classList.remove("dark");
    bttButton.classList.remove("dark");
    bar1.classList.remove("dark");
    bar2.classList.remove("dark");
    bar3.classList.remove("dark");
    resumeDownload.classList.remove("dark");

    toggleDarkClass(bodyButtons, "remove");
    toggleDarkClass(toggleClasses, "remove");
    localStorage.setItem("darkMode", "false");
  }
}

// Event listener for changes in the system's dark mode preference
darkModeMediaQuery.addEventListener("change", updateDarkMode);

// Initial update to match the current system preference
updateDarkMode();
