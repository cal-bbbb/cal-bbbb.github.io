// Get the modal
var modal = document.getElementById('customModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('custom-close')[0];

// When the user clicks on <span> (x), close the modal and remember this in localStorage
span.onclick = function() {
    modal.style.display = "none";
    localStorage.setItem("modalClosed", "true");
}

// When the site loads, open the modal if it hasn't been closed before
window.onload = function() {
    if (localStorage.getItem("modalClosed") !== "true") {
        modal.style.display = "block";
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        localStorage.setItem("modalClosed", "true");
    }
}
