// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask(save = true) {
        const taskText = taskInput.value.trim(); // ✅ Trimmed input

        // ✅ Check if taskText is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // ✅ Create list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // ✅ Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // ✅ Remove task and update local storage
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            removeFromLocalStorage(taskText);
        };

        // ✅ Append task
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // ✅ Clear input
        taskInput.value = '';

        // ✅ Save to local storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to load tasks from local storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(function (task) {
            taskInput.value = task;
            addTask(false);
        });
        taskInput.value = '';
    }

    // Function to remove task from local storage
    function removeFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // ✅ Event listeners
    addButton.addEventListener('click', function () {
        addTask();
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // ✅ Load tasks on page load
    loadTasks();
});