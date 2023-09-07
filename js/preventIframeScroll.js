let iframeClicked = false;

window.addEventListener('focus', function() {
  if (document.activeElement.tagName === 'IFRAME') {
    iframeClicked = true;
  } else {
    iframeClicked = false;
  }
});

document.querySelector('.body-wrapper').addEventListener("keydown", function (event) {
  // Check if the pressed key is an arrow key and an iframe was clicked
  if (
    iframeClicked &&
    ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(event.key)
  ) {
    // Prevent the default behavior (scrolling)
    event.preventDefault();
  }
});
