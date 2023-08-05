const darkModeSwitch = document.getElementById("dm-switch");
const bttButton = document.getElementById("return-to-top");
const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");

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

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  bttButton.classList.add("dark");
  bar1.classList.add("dark");
  bar2.classList.add("dark");
  bar3.classList.add("dark");
  toggleDarkClass(bodyButtons, "add");
  darkModeSwitch.checked = true;
}

darkModeSwitch.addEventListener("change", () => {
  if (darkModeSwitch.checked) {
    document.body.classList.add("dark");
    bttButton.classList.add("dark");
    bar1.classList.add("dark");
    bar2.classList.add("dark");
    bar3.classList.add("dark");
    toggleDarkClass(bodyButtons, "add");
    localStorage.setItem("darkMode", "true");
  } else {
    document.body.classList.remove("dark");
    bttButton.classList.remove("dark");
    bar1.classList.remove("dark");
    bar2.classList.remove("dark");
    bar3.classList.remove("dark");
    toggleDarkClass(bodyButtons, "remove");
    localStorage.setItem("darkMode", "false");
  }
});
