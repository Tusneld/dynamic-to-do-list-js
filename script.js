document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // --- Core Task Management Function (Modified to handle Local Storage saving) ---
    /**
     * Creates a new list item for a task and optionally saves it to Local Storage.
     * @param {string} taskText - The text content of the task.
     * @param {boolean} [save=true] - Whether to save the task to Local Storage.
     */
    function addTask(taskText, save = true) {
        // Retrieve and trim the value from the task input field only if called from the button/keypress
        if (typeof taskText === 'undefined') {
            taskText = taskInput.value.trim();
        }

        // Check if taskText is not empty (""). If it is empty, use alert.
        if (taskText === "") {
            // Only alert if the function was called from user input, not during page load
            if (save) {
                alert("Please enter a task");
            }
            return;
        }

        // --- Task Creation and Removal Logic ---

        // 1. Create a new li element. Set its textContent to taskText.
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        listItem.classList.add('todo-item'); // Retaining the fix from the previous step

        // 2. Create a new button element for removing the task.
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // 3. Assign an onclick event to the remove button
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(listItem);

            // Implement Task Removal with Local Storage Update:
            // Get current tasks array, filter out the task text, and save the updated array.
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        };

        // 4. Append the remove button to the li element.
        listItem.appendChild(removeButton);

        // 5. Append the li to taskList.
        taskList.appendChild(listItem);

        // Clear the task input field, but only if we are dealing with user input (not loading).
        if (save) {
            taskInput.value = "";

            // Update Task Addition Functionality: Save new task to Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // --- Local Storage Loading Function ---

    /**
     * Initializes the application by loading tasks from localStorage.
     */
    function loadTasks() {
        // Initialize and Load Tasks: Check Local Storage for an existing list of tasks.
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Populate the task list on the page.
        // The 'false' argument ensures the task is added to the DOM but NOT saved back to storage.
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // --- Attach Event Listeners ---

    // Add an event listener to addButton that calls addTask (without arguments, triggering user input mode)
    addButton.addEventListener('click', () => addTask());

    // Add an event listener to taskInput for the ‘keypress’ event.
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Invoke Load Function: Load tasks on DOMContentLoaded
    loadTasks();
});
