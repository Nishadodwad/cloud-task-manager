const AUTH = "https://cloud-task-manager-476h.onrender.com/";
const TASK = "https://cloud-task-manager-1.onrender.com/";


// -------- REGISTER ----------
function register() {
  fetch(`${AUTH}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("u").value,
      password: document.getElementById("p").value
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      if (data.message === "Registration successful") {
        window.location.href = "/login.html";
      }
    })
    .catch(err => {
      console.error("Register error:", err);
      alert("Registration failed");
    });
}


// -------- LOGIN ----------
function login() {
  fetch(`${AUTH}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("u").value,
      password: document.getElementById("p").value
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem("user", data.username);
        window.location.href = "/tasks.html";
      } else {
        alert("Invalid credentials");
      }
    })
    .catch(err => {
      console.error("Login error:", err);
      alert("Login failed");
    });
}

// -------- TASK PAGE LOGIC ----------
function initTasksPage() {
  const user = localStorage.getItem("user");

  if (!user) {
    alert("Please login first");
    window.location.href = "/login.html";
    return;
  }

  document.getElementById("welcome").innerText = `Welcome ${user}`;
  loadTasks();
}

// -------- CREATE ----------
function addTask() {
  const user = localStorage.getItem("user");

  fetch(`${TASK}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: document.getElementById("taskInput").value,
      username: user
    })
  }).then(() => {
    document.getElementById("taskInput").value = "";
    loadTasks();
  });
}

// -------- READ ----------
function loadTasks() {
  const user = localStorage.getItem("user");

  fetch(`${TASK}/tasks/${user}`)
    .then(res => res.json())
    .then(tasks => {
      const list = document.getElementById("taskList");
      list.innerHTML = "";

      tasks.forEach(t => {
        list.innerHTML += `
          <li>
            <span id="text-${t._id}">${t.title}</span>

            <div>
              <button onclick="editTask('${t._id}')">Edit</button>
              <button onclick="deleteTask('${t._id}')">Delete</button>
            </div>
          </li>
        `;
      });
    });
}

// -------- DELETE ----------
function deleteTask(id) {
  fetch(`${TASK}/tasks/${id}`, { method: "DELETE" })
    .then(() => loadTasks());
}

// -------- LOGOUT ----------
function logout() {
  localStorage.removeItem("user");
  window.location.href = "/login.html";
}

function editTask(id) {
  const span = document.getElementById(`text-${id}`);
  const oldText = span.innerText;

  span.innerHTML = `
    <input id="edit-${id}" value="${oldText}">
    <button onclick="updateTask('${id}')">Save</button>
  `;
}

function updateTask(id) {
  const newText = document.getElementById(`edit-${id}`).value;

  fetch(`${TASK}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newText })
  })
    .then(() => loadTasks());
}

