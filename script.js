const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

// Add task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  saveTask(task);
  createTaskElement(task);

  taskInput.value = "";
}

// Create task in UI
function createTaskElement(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;

  if (task.completed) {
    li.classList.add("completed");
  }

  const span = document.createElement("span");
  span.textContent = task.text;

  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTask(task.id);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    deleteTask(task.id);
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get tasks
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Load tasks
function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(createTaskElement);
}

// Update task completion
function updateTask(id) {
  const tasks = getTasks();
  const updatedTasks = tasks.map(task =>
    task.id == id ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// Delete task
function deleteTask(id) {
  const tasks = getTasks();
  const filteredTasks = tasks.filter(task => task.id != id);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}