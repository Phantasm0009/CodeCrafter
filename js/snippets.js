/* templates start */
class Snippet {
  constructor(id, groupName, title, description, snippet, notes) {
    this.id = id;
    this.groupName = groupName;
    this.title = title;
    this.description = description;
    this.snippet = snippet;
    this.notes = notes;
  }
}
/* templates end */

const snippetsStr = "snippets";
const indexStr = "index";

let index = getIndex();
let snippets = getSnippets();

function getIndex() {
  let i = 0;

  if (settings.rememberIndex) {
    i = localStorage.getItem(indexStr) || 0;
  }

  return i;
}

function getSnippets() {
  let ret = [];

  if (localStorage.getItem(snippetsStr) != null) {
    ret = JSON.parse(localStorage.getItem(snippetsStr));
  }

  return ret;
}

function getGroupNames() {
  let ret = [];

  snippets.forEach(function (snippet) {
    ret.push(snippet.groupName);
  });

  ret.sort();
  return [...new Set(ret)];
}

function sortByTitle(a, b) {
  if (a.title < b.title) {
    return -1;
  } else if (a.title > b.title) {
    return 1;
  } else {
    return 0;
  }
}

function getSnippetsByGroupName(groupName) {
  let ret = [];

  snippets.forEach(function (snippet) {
    if (snippet.groupName == groupName) {
      ret.push(snippet);
    }
  });

  ret.sort(sortByTitle);
  return ret;
}

function getSnippetByID(id) {
  let ret;

  for (let i = 0; i < snippets.length; i++) {
    if (snippets[i].id == id) {
      ret = snippet[i];
      break;
    }
  }

  return ret;
}

function getIndexByID(id) {
  let ret = 0;

  for (let i = 0; i < snippets.length; i++) {
    if (snippets[i].id == id) {
      ret = i;
      break;
    }
  }

  return ret;
}

function nextSnippetID() {
  let ret = 1;

  snippets.forEach(function (snippet) {
    if (snippet.id >= ret) {
      ret = snippet.id + 1;
    }
  });

  return ret;
}

function snippetToModal(snippet, type) {
  let btn = document.getElementById("btn-snippet-modal-action");
  let header = document.getElementById("snippet-modal-header");
  let title = document.getElementById("lbl-title");
  let group = document.getElementById("lbl-group");
  let desc = document.getElementById("lbl-description");
  let snip = document.getElementById("lbl-snippet");
  let note = document.getElementById("lbl-notes");

  if (type == "add") {
    btn.dataset.id = 0;
    btn.dataset.type = "add";
    // btn.innerHTML = "add&nbsp;<i class='material-icons'>add</i>";
    header.innerHTML = "Add Snippet";

    title.value = "";
    group.value = "";
    desc.value = "";
    snip.value = "";
    note.value = "";
  } else {
    if (snippet == null) {
      showMsg("warning", "<p>No snippet to edit!</p><p>Did you mean add?</p>");
      return false;
    }

    btn.dataset.id = snippet.id;
    btn.dataset.type = "edit";
    // btn.innerHTML = "edit&nbsp;<i class='material-icons'>edit</i>";
    header.innerHTML = "Edit Snippet";

    title.value = snippet.title;
    group.value = snippet.groupName;
    desc.value = snippet.description;
    snip.value = snippet.snippet;
    note.value = snippet.notes;
  }

  showModal("add-snippet-modal");
}

function snippetToScreen() {
  const blank = "---";

  let title = document.getElementById("main-title");
  let group = document.getElementById("main-group-name");
  let desc = document.getElementById("main-description");
  let snip = document.getElementById("main-snippet");
  let note = document.getElementById("main-notes");

  if (snippets.length > 0) {
    title.innerHTML = snippets[index].title;
    group.innerHTML = "&lt" + snippets[index].groupName + "&gt";
    desc.innerHTML = snippets[index].description;
    snip.innerHTML = snippets[index].snippet;
    note.innerHTML = snippets[index].notes;
  } else {
    title.innerHTML = blank;
    group.innerHTML = blank;
    desc.innerHTML = blank;
    snip.innerHTML = blank;
    note.innerHTML = blank;
  }
}

function snippetsToNavBar() {
  let cont = document.getElementById("side-nav-container");

  if (cont) {
    cont.innerHTML = "";

    let btnHeader, btnContent, div, p;
    let groupNames = getGroupNames(snippets);

    for (let i = 0; i < groupNames.length; i++) {
      btnHeader = document.createElement("button");
      btnHeader.classList.add(
        "accordion",
        "accordion-header",
        "font-branded",
        "font-lg",
        "bg-clr-dark",
        "font-clr-light"
      );
      btnHeader.innerHTML = groupNames[i];
      cont.appendChild(btnHeader);

      div = document.createElement("div");
      div.classList.add(
        "panel",
        "font-branded",
        "font-clr-light",
        "bg-clr-dark"
      );

      s = getSnippetsByGroupName(groupNames[i]);

      for (let j = 0; j < s.length; j++) {
        p = document.createElement("p");

        btnContent = document.createElement("button");
        btnContent.classList.add(
          "accordion",
          "accordion-item",
          "font-branded",
          "font-sm",
          "bg-clr-dark",
          "font-clr-light"
        );
        btnContent.innerHTML = s[j].title;
        btnContent.dataset.id = s[j].id;

        p.appendChild(btnContent);
        div.appendChild(p);
      }

      cont.appendChild(div);
    }

    setAccordionEvents();
    setAccordionItemEvents();
  }
}

function snippetsToScreen() {
  document.getElementById("lbl-snippets").value = JSON.stringify(
    snippets,
    null,
    2
  );
  snippetsToNavBar();
  snippetToScreen();
}

function saveIndex() {
  localStorage.setItem(indexStr, JSON.stringify(index));
}

function saveSnippets(showMessage) {
  localStorage.setItem(snippetsStr, JSON.stringify(snippets));
  snippetsToScreen();
  snippetToScreen();

  if (showMessage) {
    showMsg("success", "<p>Snippets saved</p>");
  }
}

function clearSnippets() {
  localStorage.removeItem(indexStr);
  index = getIndex();
  saveIndex();

  localStorage.removeItem(snippetsStr);
  snippets = getSnippets();
  saveSnippets(false);
}

function exportSnippets() {
  exportObj(snippets, "Snips-Snippets.bak");
  showMsg("success", "<p>Snippets exported to downloads folder</p>");
}

function onloadImportSnippets(s) {
  snippets = JSON.parse(s) || "[]";
  saveSnippets(true);
}

function importSnippets(input) {
  importObj(input, onloadImportSnippets, false);
}

function saveSnippetsFromText() {
  const s = document.getElementById("lbl-snippets").value;
  onloadImportSnippets(s);
}

function addEditSnippet() {
  let btn = document.getElementById("btn-snippet-modal-action");

  //validation
  let ctrls = document.getElementsByClassName("snippet-control");
  let i;

  for (i = 0; i < ctrls.length; i++) {
    if (ctrls[i].required && ctrls[i].value == "") {
      showMsg("error", "<p>Missing required field: " + ctrls[i].name + "</p>");
      return false;
    }
  }

  let title = document.getElementById("lbl-title");
  let group = document.getElementById("lbl-group");
  let desc = document.getElementById("lbl-description");
  let snip = document.getElementById("lbl-snippet");
  let note = document.getElementById("lbl-notes");

  if (btn.dataset.type == "add") {
    snippet = new Snippet(
      nextSnippetID(),
      group.value,
      title.value,
      desc.value,
      snip.value,
      note.value
    );

    snippets.push(snippet);
    saveSnippets(true);
    hideModal("add-snippet-modal");
  } else {
    snippets[index].title = title.value;
    snippets[index].groupName = group.value;
    snippets[index].description = desc.value;
    snippets[index].snippet = snip.value;
    snippets[index].notes = note.value;

    saveSnippets(true);
    hideModal("add-snippet-modal");
  }
}
