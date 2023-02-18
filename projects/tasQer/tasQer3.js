let tasks = 0
let time = 0
let allTasks = []
let resetTurn = 0

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

function enterListener() {
  let taskField = document.getElementById("taskIn");
  taskField.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("addTask").click();
    }
  });
  let timeField = document.getElementById("timeIn");
  timeField.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("addTask").click();
    }
  });
}


function addTask() {
  if (document.getElementById("taskIn").value === "" || document.getElementById("timeIn").value.toString() === "") {
    console.log()
    alert("Please enter any missing values!")
  } else {
    let taskObject = {
      summary: document.getElementById("taskIn").value.toString(),
      id: tasks,
      time: Number(document.getElementById("timeIn").value),
      status: "incomplete"
    };
    time += Number(taskObject.time);
    tasks++;
    allTasks.push(taskObject);
    displayTasks();
  }
}

function displayTasks() {
  if (allTasks === []) {
    allTasks = decodeURIComponent(document.cookie)
    console.log(allTasks + "decoded")
  }
  tasks = 0
  time = 0
  document.getElementById("display").innerHTML = "";
  for (i in allTasks) {
    if (allTasks[i].status === "incomplete") {
      tasks++;
      if (allTasks[i].time < 0) {
        allTasks[i].time = Math.abs(allTasks[i].time)
      }
      if (isNaN(allTasks[i].time) === false) {
        time += Number(allTasks[i].time)
      }
    }
    if (allTasks[i].status === "incomplete") {
      part1 = `
            <div class="row" style="text-decoration:none;">
                <p style="text-align: right" class="col-1">${Number(i) + 1}.</p>
                <div class="col-1"><button id=${i + "button"} type="button" onclick="completeTask(this.id)"><span class="material-icons-sharp">check_box_outline_blank</span></button></div>
            `
    } else {
      part1 = `
                <div class="row" style="text-decoration:line-through;">
                <p style="text-align: right" class="col-1">${Number(i) + 1}.</p>
                <div class="col-1"><button id=${i + "button"} type="button" onclick="completeTask(this.id)"><span class="material-icons-sharp">check_box</span></button></div>
            `
    }
    document.getElementById("display").innerHTML += `
        ${part1}
            <p id=${i + "summary"} onclick="editTask(this.id)" class="col-8">${allTasks[i].summary}</p>
            <p id=${i + "time"} onclick="editTask(this.id)" class="col-1">${Math.floor(allTasks[i].time / 60)}:${(allTasks[i].time % 60).toString().padStart(2, "0")}</p>
            <div class="col-1"><button id=${i + "delete"} type="button" onclick="deleteTask(this.id)"><span class="material-icons-sharp">delete</span></button></div>
        </div>
        `
  }
  if (allTasks === []) {
    time = 0
    tasks = 0
  }
  document.getElementById("timeOut").innerHTML = `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, "0")}`;
  document.getElementById("tasksOut").innerHTML = tasks;
  document.getElementById("displaytest").innerHTML = JSON.stringify(allTasks);
  document.cookie = `taskList = ${allTasks}; expires=Wed, 18 Feb 2063 12:00:00 UTC; path=/`
  console.log(document.cookie)
  console.log(allTasks)
}

function completeTask(clicked_id) {
  console.log(clicked_id.replace("button", ""));
  console.log(JSON.stringify(allTasks[Number(clicked_id.replace("button", ""))].status))
  if (allTasks[Number(clicked_id.replace("button", ""))].status === "complete") {
    allTasks[Number(clicked_id.replace("button", ""))].status = "incomplete"
  } else {
    allTasks[Number(clicked_id.replace("button", ""))].status = "complete"
  }
  displayTasks();
}

function deleteTask(clicked_id) {
  allTasks.splice(Number(clicked_id.replace("delete", "")), 1);
  displayTasks();
}

const sortTimeTasks = () => {
  allTasks.sort(function(a, b) { return a.time - b.time });
  console.log(JSON.stringify(allTasks))
  displayTasks();
};

function reverseTasks() {
  allTasks.reverse();
  displayTasks();
}

function sortAlphabeticallyTasks() {
  allTasks.sort(function(a, b) {
    let x = a.summary.toLowerCase();
    let y = b.summary.toLowerCase();
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  });
  displayTasks();
}

function resetTasks() {
  allTasks = [];
  time = 0;
  tasks = 0;
  displayTasks();
  document.getElementById("timeIn").value = "";
  document.getElementById("taskIn").value = "";
}

function downloadTasks() {
  const blob = new Blob([JSON.parse(JSON.stringify((allTasks)))], { type: 'application/json;charset=utf-8,' })
  const objUrl = URL.createObjectURL(blob)
  document.getElementById('DLtasks').setAttribute('href', objUrl)
  document.getElementById('DLtasks').setAttribute('download', `${tasks} ${time}.json`)
  document.getElementById('DLtasks').textContent = 'Download'
  document.getElementById('DLtasks').style.display = "inline"
}

function importTasks() {
  newTasks = allTasks.concat(document.getElementById("textIn").value);
  allTasks = newTasks;
  console.log(JSON.stringify(document.getElementById("textIn").value))
  displayTasks();
}

document.getElementById('fileIn').addEventListener('change', getFile)

function getFile(event) {
  const input = event.target
  if ('files' in input && input.files.length > 0) {
    placeFileContent(
      document.getElementById('textIn').value = JSON.parse(input.files[0]))
    console.log(JSON.parse(input.files[0]));
    document.getElementById('titleIn').value = input.files[0].name;
  }
}

function placeFileContent(target, file) {
  readFileContent(file).then(content => {
    target.value = content
  }).catch(error => console.log(error))
}

function readFileContent(file) {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}

function deleteSelf() {
  document.getElementById("DLtasks").style.display = "none";
}

function save() {
  window.alert("step 1");
  var jsonBlob = new Blob([JSON.stringify(allTasks)], { type: 'application/javascript;charset=utf-8' });
  window.alert("step 2");
  var link = window.URL.createObjectURL(jsonBlob);
  /*window.location=link;*/
  window.alert("step 3");
  document.getElementById('DLtasks').setAttribute('href', link)
  document.getElementById('DLtasks').setAttribute('download', `${tasks} ${time}.json`)
  document.getElementById('DLtasks').textContent = 'Download'
  document.getElementById('DLtasks').style.display = "inline"
}

function editTask(clicked_id) {
  if (clicked_id.includes("summary") === true) {
    newValue = prompt("Please enter a new value");
    if (newValue != null && newValue !== "") {
      allTasks[Number(clicked_id.replace("summary", "").replace("time", ""))].summary = newValue;
      console.log(newValue)
    } else {
      return;
    }
  } else if (clicked_id.includes("time") === true) {
    newValue = prompt("Please enter a new value");
    if (isNaN(newValue) === false && Number(newValue) > 0) {
      allTasks[Number(clicked_id.replace("summary", "").replace("time", ""))].time = newValue;
    } else {
      return;
    }
  }
  displayTasks();
}

function completeAllTasks() {
  if (resetTurn === 0) {
    for (i in allTasks) {
      allTasks[i].status = "complete"
    }
    resetTurn = 1;
    document.getElementById("completeAll").innerHTML = '<span class="material-icons-sharp">check_box</span>'
  } else if (resetTurn === 1) {
    for (i in allTasks) {
      allTasks[i].status = "incomplete"
    }
    resetTurn = 0;
    document.getElementById("completeAll").innerHTML = '<span class="material-icons-sharp">check_box_outline_blank</span>'
  }
  displayTasks();
}

function changeTheme() {
  // Obtains an array of all <link>
  // elements.
  // Select your element using indexing.
  let theme = document.getElementsByTagName('link')[5];

  // Change the value of href attribute 
  // to change the css sheet.
  if (theme.getAttribute('href') == 'light.css') {
    theme.setAttribute('href', 'dark.css');
    document.getElementById("themebutton").innerHTML = '<span class="material-icons-sharp">light_mode</span>'

  } else {
    theme.setAttribute('href', 'light.css');
    document.getElementById("themebutton").innerHTML = '<span class="material-icons-sharp">dark_mode</span>'
  }
}