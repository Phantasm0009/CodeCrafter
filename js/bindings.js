document.getElementById("btn-close-snippet-modal").onclick = function () {
  hideModal("add-snippet-modal");
};
document.getElementById("btn-close-settings-modal").onclick = function () {
  hideModal("settings-modal");
};
document.getElementById("btn-snippet-modal-action").onclick = function () {
  addEditSnippet();
};
document.getElementById("btn-tab-settings").onclick = function () {
  showPage(event, "Settings");
};
document.getElementById("btn-tab-data").onclick = function () {
  showPage(event, "Data");
};
document.getElementById("btn-tab-debug").onclick = function () {
  showPage(event, "Debug");
};
document.getElementById("btn-tab-about").onclick = function () {
  showPage(event, "About");
};
document.getElementById("btn-import-settings").onclick = function () {
  clickImportSettings();
};
document.getElementById("btn-export-settings").onclick = function () {
  exportSettings();
};
document.getElementById("btn-import-snippets").onclick = function () {
  clickImportSnippets();
};
document.getElementById("btn-export-snippets").onclick = function () {
  exportSnippets();
};
document.getElementById("btn-clear-settings").onclick = function () {
  clearSettings();
};
document.getElementById("btn-save-settings").onclick = function () {
  saveSettingsFromText();
};
document.getElementById("btn-clear-snippets").onclick = function () {
  clearSnippets();
};
document.getElementById("btn-save-snippets").onclick = function () {
  saveSnippetsFromText();
};
document.getElementById("btn-test-msg-success").onclick = function () {
  showMsg("success", "Test success");
};
document.getElementById("btn-test-msg-info").onclick = function () {
  showMsg("info", "Test info");
};
document.getElementById("btn-test-msg-warning").onclick = function () {
  showMsg("warning", "Test warning");
};
document.getElementById("btn-test-msg-error").onclick = function () {
  showMsg("error", "Test error");
};
document.getElementById("btn-save-all-settings").onclick = function () {
  screenToSettings();
};
document.getElementById("btn-close-nav").onclick = function () {
  closeNav();
};
document.getElementById("btn-open-nav").onclick = function () {
  openNav();
};
document.getElementById("btn-add-snippet").onclick = function () {
  snippetToModal(null, "add");
};
document.getElementById("btn-edit-snippet").onclick = function () {
  snippetToModal(snippets[index], "edit");
};
document.getElementById("btn-settings").onclick = function () {
  showModal("settings-modal");
};

document.getElementById("inp-import-settings").onchange = function () {
  importSettings(this);
};
document.getElementById("inp-import-snippets").onchange = function () {
  importSnippets(this);
};

/* global styles for msg box */
MSG_HEADER_FONT = "'Permanent Marker', serif";
MSG_CONTENT_FONT = "Verdana, sans-serif";
MSG_SUCCESS_COLOUR = "#474f67";
MSG_INFO_COLOUR = "#474f67";
MSG_WARNING_COLOUR = "#f07f21";
MSG_ERROR_COLOUR = "#630b0b";

document.getElementById("about-version").innerHTML = getMeta("version");
document.getElementById("about-year").innerHTML = new Date().getFullYear();

function clickImportSettings() {
  document.getElementById("inp-import-settings").click();
}

function clickImportSnippets() {
  document.getElementById("inp-import-snippets").click();
}

settingsToScreen();
snippetsToScreen();

//if installed as Chrome extension
if (isExtension()) {
  document.body.style.minWidth = "600px";
  document.body.style.minHeight = "800px";
}
