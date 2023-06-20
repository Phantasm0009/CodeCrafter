function exportObj(obj, name) {
  const data =
    "text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(obj, null, 2));
  let a = document.createElement("a");
  a.href = "data:" + data;
  a.download = name + ".json";
  a.innerHTML = "download JSON";
  a.click();
  a.remove();
}

function importObj(input, onload, debug) {
  let file = input.files[0];
  let fileReader = new FileReader();

  if (debug) {
    alert(`File name: ${file.name}`);
    alert(`Last modified: ${file.lastModified}`);
  }

  fileReader.readAsText(file);

  fileReader.onload = function () {
    onload(fileReader.result);
  };

  fileReader.onerror = function () {
    alert("Error: " + fileReader.error);
  };
}
