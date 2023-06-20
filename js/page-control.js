function showPage(evt, pageName) {
  let i, tabContent, tabLinks, modalFooter;

  tabContent = document.getElementsByClassName("tabcontent");

  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  tabLinks = document.getElementsByClassName("tablinks");

  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  modalFooter = document.getElementById("settings-modal-footer");

  if (pageName.toLowerCase() == "settings") {
    modalFooter.style.display = "block";
  } else {
    modalFooter.style.display = "none";
  }

  document.getElementById(pageName).style.display = "block";
  evt.currentTarget.className += " active";
}
