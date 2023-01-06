let tasks = 0;
let time = 0;
let taskList = []
let taskchanger = 0

function addTask() {
    let tasksadded = 1;
    let tasksOut;
    if (document.getElementById("timeIn").value == "" || document.getElementById("taskIn").value == "") {
        alert("Please enter values into all of the fields!");
    } else {
        let taskObject = {id: tasks, desc: "", time: time};
        tasksOut = ""
        taskObject.time = Number(document.getElementById('timeIn').value);
        time += Math.round(Number(document.getElementById('timeIn').value) * 100) / 100;
        tasks += 1;
        taskObject.id = tasks;
        taskObject.desc = document.getElementById('taskIn').value.toString();
        taskList[taskList.length] = (JSON.stringify(taskObject, null, 2));
        document.getElementById('timeTotal').innerHTML = `Time: ${time}`;
        taskchanger += 1
        document.getElementById('taskTotal').innerHTML = `Tasks: ${Number(document.getElementById('taskTotal').innerHTML.replace("Tasks: ", "")) + 1}`;
        document.getElementById('output').innerHTML += `
            <div id=${taskObject.id} class="row my-1">
                <div class='col-1' style="text-align: right">${taskObject.id}.</div>
                <div class="col-5">${taskObject.desc}</div>
                <div id="${taskObject.id}time" class="col-2">${taskObject.time}</div>
                <div class="col-2"><button id="button${taskObject.id}" onclick="removeTask(this.id)">Complete</button></div>
            </div>
            `
        /*while(tasksadded < taskList.length) {
            tasksOut += string(taskList[tasksadded].desc)
            tasksadded += 1
        }
        do
        alert(tasksOut)*/

        document.getElementById('output').innerHTML
        console.log(taskList)
    }
}

function removeTask(clicked_id) {
    taskchanger = (Number(document.getElementById('taskTotal').innerHTML.replace("Tasks: ", "")) - 1)
    document.getElementById(String(clicked_id.replace("button", ""))).style.textDecoration = "line-through";
    document.getElementById(clicked_id).disabled = "true";
    document.getElementById(clicked_id).innerHTML = "Completed";
    document.getElementById('taskTotal').innerHTML = `Tasks: ${taskchanger}`;
    time -= Number(document.getElementById(String(clicked_id.replace("button", "")) + "time").innerHTML);
    document.getElementById('timeTotal').innerHTML = `Time: ${time}`;
}

function downloadTasks() {
    /*const exportTasks = []
    taskList.forEach(item => {
        exportTasks.push(Object.values(item))
    })
    const blob = new Blob([JSON.stringify(taskList, null, 2)], {type: 'text/csv;charset=utf-8,'})
    const objUrl = URL.createObjectURL(blob)
    document.getElementById('DLtasks').setAttribute('href', objUrl)
    document.getElementById('DLtasks').setAttribute('download', `${tasks} ${time}.txt`)
    document.getElementById('DLtasks').textContent = 'Download'
    */
    const blob = new Blob([document.getElementById('output').innerHTML], {type: 'text/html;charset=utf-8,'})
    const objUrl = URL.createObjectURL(blob)
    document.getElementById('DLtasks').setAttribute('href', objUrl)
    document.getElementById('DLtasks').setAttribute('download', `${tasks} ${time} .txt`)
    document.getElementById('DLtasks').textContent = 'Download'
}

function importTasks() {
    if (String(document.getElementById("output").innerHTML) === "") {
        additions = []
        document.getElementById('output').innerHTML += document.getElementById('textIn').value
        additions = document.getElementById('titleIn').value.split(" ")
        document.getElementById('taskTotal').innerHTML = `Tasks: ${Number(document.getElementById('taskTotal').innerHTML.split(" ")[1]) + Number(additions[0])}`
        document.getElementById('timeTotal').innerHTML = `Time: ${Number(document.getElementById('timeTotal').innerHTML.split(" ")[1]) + Number(additions[1])}`
        time = Number(additions[1])
        tasks = Number(additions[0])
    } else {
        alert("You can only import tasks to a blank tasklist!")
        return
    }
}

function resetTasks() {
    document.getElementById('output').innerHTML = ''
    document.getElementById('taskTotal').innerHTML = 'Tasks: 0'
    document.getElementById('timeTotal').innerHTML = 'Time: 0'
    tasks = 0
    time = 0
}