function clipBrd(elemID) {
  let copyText = document.getElementById(elemID);

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  try {
    navigator.clipboard.writeText(copyText.value);
    console.log("Copy text: " + copyText);
  } catch (err) {
    console.error("Oops, unable to copy", err);
  }
}
