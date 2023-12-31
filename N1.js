function allowDrop(event) 
{
  event.preventDefault();
}
function drag(event, element)
 {
  event.dataTransfer.setData("text", element);
}
function clearFormPreview() {
  var previewForm = document.getElementById('preview-form');
  previewForm.innerHTML = '';
}
document.getElementById('clear-button').addEventListener('click', clearFormPreview);

function drop(event)
 {
  event.preventDefault();
  const element = event.dataTransfer.getData("text");
  const formPreview = document.getElementById("preview-form");

  if (element === "Layout") 
  {
    const layoutDiv = document.createElement("div");
    layoutDiv.className = "layout";
    formPreview.appendChild(layoutDiv);
    const section1 = document.createElement("div");
    section1.className = "layout-section";
    layoutDiv.appendChild(section1);
    const section2 = document.createElement("div");
    section2.className = "layout-section";
    layoutDiv.appendChild(section2);
  } 
  else if (element === "Label")
   {
    const label = document.createElement("label");
    label.innerText = "Label Text:";
    const input = document.createElement("input");
    input.type = "text";
    formPreview.appendChild(label);
    formPreview.appendChild(input);
  } 
  else if (element === "Text Box")
   {
    const textBox = document.createElement("input");
    textBox.type = "text";
    formPreview.appendChild(textBox);
  } 
  else if (element === "Button")
   {
    const button = document.createElement("button");
    button.innerText = "Button";
    formPreview.appendChild(button);
  }
   else if (element === "Check Box") 
   {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    formPreview.appendChild(checkbox);
    const label = document.createElement("label");
    label.innerText = "Check Box Label";
    formPreview.appendChild(label);
  } 
  else if (element === "Radio Button")
   {
    const radio = document.createElement("input");
    radio.type = "radio";
    formPreview.appendChild(radio);
    const label = document.createElement("label");
    label.innerText = "Radio Button Label";
    formPreview.appendChild(label);
  } 
  else if (element === "Table") 
  {
    createTable();
  }
  else if (element === "Navigation") 
  {
    const link = document.createElement("a");
    link.href = "#";
    link.innerText = "Navigation Link";
    formPreview.appendChild(link);
  } 
  else if (element === "Image")
   {
    const image = document.createElement("img");
    image.src = "path_to_your_image.jpg";
    formPreview.appendChild(image);
  }
}

function loadPreview()
 {
  const formPreview = document.getElementById("form-preview");
  const previewContent = formPreview.innerHTML;

  const newTab = window.open();
  newTab.document.open();
  newTab.document.write("<html><head><title>Form Preview</title></head><body>");
  newTab.document.write('<div id="preview-content">');
  newTab.document.write(previewContent);
  newTab.document.write("</div></body></html>");
  newTab.document.close();
}

function createTable() {
  const formPreview = document.getElementById("preview-form");
  let numRows;
  let numCols;
  while (true) {
    const numRowsInput = prompt("Enter the number of rows for the table:");
    if (numRowsInput === null) {
      return;
    }
    if (isNaN(numRowsInput) || numRowsInput <= 0) {
      alert("Please enter a valid number of rows.");
    } else {
      numRows = parseInt(numRowsInput);
      break;
    }
  }
  while (true) {
    const numColsInput = prompt("Enter the number of columns for the table:");
    if (numColsInput === null) {
      return;
    }
    if (isNaN(numColsInput) || numColsInput <= 0) {
      alert("Please enter a valid number of columns.");
    } else {
      numCols = parseInt(numColsInput);
      break;
    }
  }

  const table = document.createElement("table");
  table.border = "1";

  const headerRow = table.insertRow(0);
  for (let i = 0; i < numCols; i++) {
    const headerCell = headerRow.insertCell(i);
    const headerInput = document.createElement("input");
    headerInput.type = "text";
    headerInput.placeholder = `Header ${i + 1}`;
    headerCell.appendChild(headerInput);
  }

  for (let i = 0; i < numRows; i++) {
    const dataRow = table.insertRow(i + 1);
    for (let j = 0; j < numCols; j++) {
      const dataCell = dataRow.insertCell(j);
      const cellInput = document.createElement("input");
      cellInput.type = "text";
      cellInput.placeholder = `Data ${i + 1}-${j + 1}`;
      dataCell.appendChild(cellInput);
    }
  }

  formPreview.appendChild(table);
}

function savePage() {
  const userChoice = window.prompt("Choose the format to save (JSON or CSV):");
  if (userChoice) {
    if (userChoice.toLowerCase() === "json") {
      saveAsJSON();
    } else if (userChoice.toLowerCase() === "csv") {
      saveAsCSV();
    } else {
      alert("Invalid choice. Please enter 'JSON' or 'CSV'.");
    }
  }
}

function saveAsJSON() {
  const data = {
    key1: "value1",
    key2: "value2",
    key3: "value3",
  };
  const jsonData = JSON.stringify(data);
  const blob = new Blob([jsonData], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "data.json";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function saveAsCSV() {
  const data = [
    { name: "John", age: 30, city: "New York" },
    { name: "Jane", age: 25, city: "Los Angeles" },
    { name: "Bob", age: 35, city: "Chicago" },
  ];
  const csvContent =
    "data:text/csv;charset=utf-8," +
    data.map((item) => Object.values(item).join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "data.csv";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
