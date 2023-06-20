/* templates start */
class Settings {
  constructor(
    allowModalBGClick,
    allowAccordionClick,
    rememberIndex,
    showDebug
  ) {
    this.allowModalBGClick = allowModalBGClick;
    this.allowAccordionClick = allowAccordionClick;
    this.rememberIndex = rememberIndex;
    this.showDebug = showDebug;
  }
}
/* templates end */

const settingsStr = "settings";
let settings = getSettings();

function getSettings() {
  let ret = new Settings(false, false, false, false);

  if (localStorage.getItem(settingsStr) != null) {
    ret = JSON.parse(localStorage.getItem(settingsStr));
  }

  return ret;
}

function changeSettings(elem) {
  if (
    elem.tagName.toLowerCase() == "input" &&
    elem.type.toLowerCase() == "checkbox"
  ) {
    settings[elem.dataset.setting] = elem.checked;
  } else {
    settings[elem.dataset.setting] = elem.value;
  }
}

function saveSettings(showMessage) {
  localStorage.setItem(settingsStr, JSON.stringify(settings));
  settingsToScreen();

  if (showMessage) {
    showMsg("success", "<p>Settings saved!</p>");
  }
}

function screenToSettings() {
  document.querySelectorAll("*").forEach(function (node) {
    if (node.dataset.settings) {
      if (
        node.tagName.toLowerCase() == "input" &&
        node.type.toLowerCase() == "checkbox"
      ) {
        settings[node.dataset.setting] = node.checked;
      } else {
        settings[node.dataset.setting] = node.value;
      }
    }
  });

  saveSettings(true);
}

function settingsToScreen() {
  document.querySelectorAll("*").forEach(function (node) {
    if (node.dataset.settings) {
      if (
        node.tagName.toLowerCase() == "input" &&
        node.type.toLowerCase() == "checkbox"
      ) {
        node.checked = settings[node.dataset.setting];
      } else {
        node.value = settings[node.dataset.setting];
      }
    }
  });

  document.getElementById("lbl-settings").value = JSON.stringify(
    settings,
    null,
    2
  );
  document.getElementById("btn-tab-debug").style.display = settings.showDebug
    ? "block"
    : "none";
}

function clearSettings() {
  localStorage.removeItem(settingsStr);
  settings = getSettings();
  saveSettings(false);
}

function exportSettings() {
  exportObj(settings, "Snips-Settings.bak");
  showMsg("success", "<p>Settings exported to downloads folder</p>");
}

function onloadImportSettings(s) {
  settings = JSON.parse(s) || "{}";
  saveSettings(true);
}

function importSettings(input) {
  importObj(input, onloadImportSettings, false);
}

function saveSettingsFromText() {
  const s = document.getElementById("lbl-settings").value;
  onloadImportSettings(s);
}
