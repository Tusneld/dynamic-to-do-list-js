document.addEventListener('DOMContentLoaded', function() {
    // 1. Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // --- Helper Functions for Local Storage ---

    /**
     * Retrieves the current tasks array from localStorage.
     * @returns {string[]} An array of task strings.
     */
    function getTasksFromStorage() {
        // Retrieve and parse the JSON string, defaulting to an empty array if null
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    /**
     * Saves the provided tasks array back into localStorage.
     * @param {string[]} tasks - The array of task strings to save.
     */
    function saveTasksToStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // --- Core Task Management Functions ---

    /**
     * Creates and appends a single task <li> element to the DOM.
     * @param {string} taskText - The text content of the task.
     * @param {boolean} [save=true] - Whether to save the task to localStorage. Used to prevent re-saving when loading.
     */
    function createListItem(taskText, save = true) {
        // 2. Task Creation
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create Remove Button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // 3. Assign an onclick event to the remove button
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(listItem);
            
            // 4. Implement Task Removal with Local Storage Update
            let storedTasks = getTasksFromStorage();
            // Filter out the task text from the array
            storedTasks = storedTasks.filter(task => task !== taskText);
            saveTasksToStorage(storedTasks);
        };

        // Append elements to the list item and the task list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
        
        // 5. Update Local Storage for Addition
        if (save) {
            const storedTasks = getTasksFromStorage();
            storedTasks.push(taskText);
            saveTasksToStorage(storedTasks);
        }
    }

    /**
     * Handles the logic for adding a new task (from user input).
     */
    function addTask() {
        // Retrieve and trim the value from the task input field
        const text = taskInput.value.trim();

        // Check if taskText is not empty ("")
        if (text === "") {
            alert("Please enter a task.");
            return;
        }

        // Create the task element and save to storage
        createListItem(text);

        // Clear the task input field
        taskInput.value = "";
    }

    /**
     * Initializes the application by loading tasks from localStorage.
     * This function is called once on page load.
     */
    function loadTasks() {
        const storedTasks = getTasksFromStorage();
        // For each stored task, create the list item but set save=false 
        // to avoid saving it again to localStorage during load.
        storedTasks.forEach(taskText => createListItem(taskText, false));
    }

    // --- Attach Event Listeners ---

    // 6. Attach Event Listener to 'Add Task' button
    addButton.addEventListener('click', addTask);

    // 7. Attach Event Listener for 'Enter' keypress in the input field
    taskInput.addEventListener('keypress', function(event) {
        // Check if event.key is equal to 'Enter'
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
    // 8. Load existing tasks when the page is fully loaded
    loadTasks();
});