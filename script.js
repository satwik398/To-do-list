const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');

let tasks = [];

// Load tasks from local storage
const storedTasks = JSON.parse(localStorage.getItem('tasks'));
if (storedTasks) {
    tasks = storedTasks;
    renderTasks();
}

// Add new task
addTaskButton.addEventListener('click', () => {
    const newTaskValue = newTaskInput.value.trim();
    if (newTaskValue) {
        const newTask = {
            id: Date.now(),
            text: newTaskValue,
            completed: false,
        };

        tasks.push(newTask);
        renderTasks();
        newTaskInput.value = '';

        // Save tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';

    for (const task of tasks) {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    }
}

// Create a task element
function createTaskElement(task) {
    const taskElement = document.createElement('li');
    taskElement.id = task.id;

    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.checked = task.completed;
    taskCheckbox.addEventListener('change', () => {
        task.completed = !task.completed;
        renderTasks();

        // Save tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    const taskText = document.createTextNode(task.text);
    taskElement.appendChild(taskCheckbox);
    taskElement.appendChild(taskText);

    return taskElement;
}
