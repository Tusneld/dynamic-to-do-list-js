document.addEventListener('DOMContentLoaded', function() {

    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Create the addTask Function (Defined here to ensure strict scope)
    function addTask() {
        // Inside addTask, retrieve and trim the value from the task input field.
        let taskText = taskInput.value.trim();

        // Check if taskText is not empty (""). If it is empty, use alert.
        if (taskText === "") {
            alert("Please enter a task"); // Minor: Removed the period to be safe
            return;
        }

        // --- Task Creation and Removal Logic ---

        // Create a new li element. Set its textContent to taskText.
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a new button element for removing the task.
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            // Removes the li element from taskList.
            taskList.removeChild(listItem);
        };

        // Append the remove button to the li element, then append the li to taskList.
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear the task input field.
        taskInput.value = "";
    }

    // Attach Event Listeners

    // Add an event listener to addButton that calls addTask when the button is clicked.
    addButton.addEventListener('click', addTask);

    // Add an event listener to taskInput for the ‘keypress’ event.
    taskInput.addEventListener('keypress', function(event) {
        // Check if event.key is equal to ‘Enter’ before calling addTask.
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

