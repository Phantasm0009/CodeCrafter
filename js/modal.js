function showModal(id) {
  document.getElementById(id).style.display = "block";
}

function hideModal(id) {
  document.getElementById(id).style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (settings.allowModalBGClick) {
    if (
      event.target.id == "settings-modal" ||
      event.target.id == "add-snippet-modal"
    ) {
      hideModal(event.target.id);
    }
  }
};

//if installed as Chrome extension
if (typeof isExtension === "function" && isExtension()) {
  let modals = document.getElementsByClassName("modal");
  let i;

  for (i = 0; i < modals.length; i++) {
    modals[i].style.paddingTop = "10px";
  }
}
