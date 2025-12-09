document.addEventListener('DOMContentLoaded', function() {

    // Select DOM Elements (Using const for immutable references)
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Create the addTask Function (Defined explicitly)
    function addTask() {
        // Retrieve and trim the value from the task input field. Store in const.
        const taskText = taskInput.value.trim(); 

        // Check if taskText is not empty (""). If it is empty, use alert.
        if (taskText === "") {
            // Using the exact wording requested in the prompt's failure description
            alert("Please enter a task"); 
            return;
        }

        // --- Task Creation and Removal Logic (runs if taskText is not empty) ---

        // 1. Create a new li element. Set its textContent to taskText.
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // 2. Create a new button element for removing the task.
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // 3. Assign an onclick event to the remove button
        removeButton.onclick = function() {
            // Removes the li element from taskList.
            taskList.removeChild(listItem);
        };

        // 4. Append the remove button to the li element.
        listItem.appendChild(removeButton);
        
        // 5. Append the li to taskList.
        taskList.appendChild(listItem);

        // 6. Clear the task input field.
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
