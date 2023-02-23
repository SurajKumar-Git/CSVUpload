const fileInputElement = document.getElementById("csvfilesinput");
const outputDiv = document.getElementById("selected-files");

document.addEventListener("DOMContentLoaded", () => {
  updateOutputDiv(fileInputElement.files);
});

fileInputElement.addEventListener("change", (event) => {
  updateOutputDiv(event.target.files);
});

function updateOutputDiv(files) {
  outputDiv.innerHTML = "";
  for (let i = 0; i < files.length; i++) {
    const pTag = document.createElement("p");
    pTag.innerHTML = `<i class="fa-solid fa-xmark red remove-file pointer"></i> ${
      files.item(i).name
    }`;
    pTag.firstChild.addEventListener("click", (event) =>
      removeFileFromSelectedList(event, i)
    );
    outputDiv.appendChild(pTag);
  }
}

function removeFileFromSelectedList(event, index) {
  const dt = new DataTransfer();
  const files = fileInputElement.files;
  for (let i = 0; i < files.length; i++) {
    if (i != index) {
      dt.items.add(files.item(i));
    }
  }
  fileInputElement.files = dt.files;
  updateOutputDiv(fileInputElement.files);
}
