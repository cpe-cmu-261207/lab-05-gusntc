const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;
  //your code here
  if (inputAdd.value === "") {
    alert("Todo cannot be empty");
  } else {
    addTodo(inputAdd.value, false);
  }
  // const div = document.createElement("div");
  // div.innerText = inputAdd.value;
  // todoCtn.appendChild(div);
  // inputAdd.value = "";
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";
  //div.innerText = title;
  todoCtn.appendChild(div);

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";
  div.appendChild(span);
  inputAdd.value = "";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";
  div.appendChild(doneBtn);
  doneBtn.style.display = "none";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";
  div.appendChild(deleteBtn);
  deleteBtn.style.display = "none";

  //your code here
  //append todo to HTML...
  //define buttons event...
  div.onmouseover = () => {
    doneBtn.style.display = "";
    deleteBtn.style.display = "";
  };

  div.onmouseout = () => {
    doneBtn.style.display = "none";
    deleteBtn.style.display = "none";
  };
  doneBtn.onclick = () => {
    if (span.style.textDecoration === "line-through") {
      span.style.textDecoration = "";
    } else {
      span.style.textDecoration = "line-through";
    }
    saveTodo();
  };
  deleteBtn.onclick = () => {
    todoCtn.removeChild(div);
    saveTodo();
    //div.localStorage.removeItem('title');
  };
  saveTodo();
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    const obj = {};
    obj.title = todoDiv.children[0].innerText;
    obj.completed =
      todoDiv.children[0].style.textDecoration === "line-through"
        ? true
        : false;
    data.push(obj);
    //console.log(obj);
    //your code here
  }
  // console.log(data);
  const dataString = JSON.stringify(data);
  localStorage.setItem("ListTodo", dataString);
  //your code here
}

function loadTodo() {
  //your code here
  const dataString = localStorage.getItem("ListTodo");
  const data = JSON.parse(dataString);
  //console.log(data);
  for (const obj of data) {
    addTodo(obj.title, obj.completed);
  }
}

loadTodo();
