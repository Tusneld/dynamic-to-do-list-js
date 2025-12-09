document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements: Store references in constants named addButton, taskInput, and taskList.
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Create the addTask Function
    function addTask() {
        // Inside addTask, retrieve and trim the value from the task input field.
        let taskText = taskInput.value.trim();

        // Check if taskText is not empty (""). If it is empty, use alert.
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Task Creation and Removal (only runs if taskText is not empty)

        // 1. Create a new li element. Set its textContent to taskText.
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // 2. Create a new button element for removing the task.
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // 3. Assign an onclick event to the remove button
        // When triggered, it removes the li element from taskList.
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
        };

        // 4. Append the remove button to the li element, 
        listItem.appendChild(removeButton);
        
        // 5. then append the li to taskList.
        taskList.appendChild(listItem);

        // 6. Clear the task input field by setting taskInput.value to an empty string.
        taskInput.value = "";
    }

    // Attach Event Listeners

    // 1. Add an event listener to addButton that calls addTask when clicked.
    addButton.addEventListener('click', addTask);

    // 2. Add an event listener to taskInput for the 'keypress' event.
    taskInput.addEventListener('keypress', function(event) {
        // Check if event.key is equal to 'Enter' before calling addTask.
        if (event.key === 'Enter') {
            addTask();
        }
    });

    
});
