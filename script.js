const editable_form = document.getElementById("editable-form");
let addedElements = [];


// Adding eventListeners for input buttons
document.getElementById("input-btn").addEventListener("click", () => addInput("input"));
document.getElementById("select-btn").addEventListener("click", () => addInput("select"));
document.getElementById("textarea-btn").addEventListener("click", () => addInput("textarea"));

// Function to add input element
function addInput(type) {
  const div = document.createElement("div");
  // Adding draggable attriutes and their values to rearrange divs
  div.classList.add("draggable");
  div.draggable = true;
  div.addEventListener('dragstart', drag);
  div.addEventListener('dragover', allowDrop);
  div.addEventListener('drop', drop);
  // generating id from UUID
  div.id = uuidv4();
  
  if (type === "input") {
    div.innerHTML = `
      <div class="label d-flex">
          <label ><h3>Input</h3></label>
          <i onclick="deleteItem(this)" class="fa-solid fa-trash"></i>
      </div>
      <input data-label="Input" data-type="text" type="text" placeholder="Some Placeholder">
      `
    div.classList.add("added-element");
    editable_form.appendChild(div);
    return;
  }
  else if (type === "select") {
    div.innerHTML = `
    <div class="label d-flex">
        <label ><h3>Select</h3></label>
        <i onclick="deleteItem(this)" class="fa-solid fa-trash"></i>
    </div>
    <select data-label="Select" data-type="select" value="Select Value">
      <option value="Sample Option" selected>Select</option>
      <option value="Sample Option">Option 1</option>
      <option value="Sample Option">Option 2</option>
      <option value="Sample Option">Option 3</option>
    </select>
    `
    div.classList.add("added-element");
    editable_form.appendChild(div);
    return;
  }
  else {
    div.innerHTML = `
    <div class="label d-flex">
        <label ><h3>Textarea</h3></label>
        <i onclick="deleteItem(this)" class="fa-solid fa-trash"></i>
    </div>
    <textarea data-label="Textarea" data-type="text"  type="text" placeholder="Textarea Placeholder" rows="10" />
    `
    div.classList.add("added-element");
    editable_form.appendChild(div);
  }
}



function save() {
  addedElements.length = 0;
  Array.from(editable_form.children).forEach((child) => {
    // Creating an emptyobject to store all the information required 
    let obj = {};
    obj.id = child.id;
    obj.label = child.children[1].getAttribute("data-label");
    obj.type = child.children[1].getAttribute("data-type");
    obj.placeholder = child.children[1].placeholder !== undefined ? child.children[1].placeholder : child.children[1].value
    // Adding each object to array
    addedElements.push(obj);
  })
  if (addedElements.length === 0) {
    alert("Please add some Components to save your Document");
    return;
  }
  alert("Document Saved");
  console.log(addedElements)
}


//  Function to delete the input component
function deleteItem(e) {
  let confirmation = confirm("Do you want to delete?");
  if (confirmation) {
    const parentDiv = e.parentElement.parentElement
    // Getting parentDiv index to update the array
    const index = Array.from(editable_form.children).indexOf(parentDiv);
    // Removing the corresponding element from DOM
    editable_form.removeChild(parentDiv);
    // alert("Successfully Deleted");
  }
}

// code for rearrnging the elements
let dragged;

function drag(event) {
  dragged = event.target;
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  if (event.target.classList.contains('draggable')) {
    event.target.parentElement.insertBefore(dragged, event.target);
  } else if (event.target.parentElement.classList.contains('draggable')) {
    event.target.parentElement.parentElement.insertBefore(dragged, event.target.parentElement);
  }
}