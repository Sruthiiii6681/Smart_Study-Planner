// script.js
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const notes = document.getElementById('notes');
    const saveButton = document.getElementById('saveNote');
    const clearButton = document.getElementById('clearNote');
    const statusMessage = document.getElementById('statusMessage');

    // Function to hide all sections
    function hideSections() {
        sections.forEach(section => {
            section.style.display = 'none';
        });
    }

    // Function to show a specific section
    function showSection(sectionId) {
        hideSections();
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'block';
        }
    }

    // Event listener for each button
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const sectionId = button.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Initially show the "planner" section
    showSection('planner');
});



// Planner
const monthName = document.getElementById('monthName');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const daysGrid = document.getElementById('daysGrid');

let currentDate = new Date();

function renderCalendar(date) {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0); // 0 gets the last day of the previous month

    monthName.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    daysGrid.innerHTML = ''; // Clear previous days

    // Add empty days from previous month
    let dayCounter = 1 - firstDay.getDay(); // Start from Sunday (0)
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('empty');
        daysGrid.appendChild(emptyDay);
        dayCounter++;
    }

    // Add days of the current month
    while (dayCounter <= lastDay.getDate()) {
        const day = document.createElement('div');
        day.textContent = dayCounter;
        if (dayCounter === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()) {
            day.classList.add('current-day');
        }
        daysGrid.appendChild(day);
        dayCounter++;
    }

    // Add empty days after the current month
    const remainingDays = 42 - daysGrid.children.length; // Assuming a 6-week grid (adjust if needed)
    for (let i = 0; i < remainingDays; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('empty');
        daysGrid.appendChild(emptyDay);
    }
}

prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

renderCalendar(currentDate); // Render initial calendar

  // DOM Elements
const newTodo = document.getElementById('todoInput');
const addTodoButton = document.getElementById('addTask');
const todoList = document.getElementById('todoList');
const toggleThemeButton = document.getElementById('toggleTheme');
const progressBar = document.getElementById('progressBar');
const prioritySelect = document.getElementById('priorityLevel');

// Toggle Dark Mode
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Save tasks to localStorage
const saveTasks = () => {
    const tasks = [];
    todoList.querySelectorAll('li').forEach((li) => {
        const task = {
            text: li.querySelector('.task-text').textContent,
            completed: li.classList.contains('completed'),
            priority: li.dataset.priority
        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Load tasks from localStorage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach((task) => {
            const li = document.createElement('li');
            li.classList.toggle('completed', task.completed);
            li.dataset.priority = task.priority;

            const taskText = document.createElement('span');
            taskText.classList.add('task-text');
            taskText.textContent = task.text;
            li.appendChild(taskText);

            // Add Delete button
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                li.remove();
                updateProgress();
                saveTasks();
            });
            li.appendChild(deleteButton);

            // Mark task as completed
            li.addEventListener('click', () => {
                li.classList.toggle('completed');
                updateProgress();
                saveTasks();
            });

            todoList.appendChild(li);
        });
    }
};

// Add new task
addTodoButton.addEventListener('click', () => {
    const taskText = newTodo.value.trim();
    if (taskText) {
        const priority = prioritySelect.value;
        const li = document.createElement('li');
        li.dataset.priority = priority;

        const taskTextSpan = document.createElement('span');
        taskTextSpan.classList.add('task-text');
        taskTextSpan.textContent = taskText;
        li.appendChild(taskTextSpan);

        // Add Delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            li.remove();
            updateProgress();
            saveTasks();
        });
        li.appendChild(deleteButton);

        // Mark task as completed
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            updateProgress();
            saveTasks();
        });

        todoList.appendChild(li);
        newTodo.value = ""; // Clear input
        updateProgress();
        saveTasks();
    }
});

// Update progress bar
const updateProgress = () => {
    const tasks = todoList.querySelectorAll('li');
    const completedTasks = todoList.querySelectorAll('.completed');
    const progress = (completedTasks.length / tasks.length) * 100;
    progressBar.style.width = progress + '%';
};

// Load saved tasks on page load
window.addEventListener('load', loadTasks);


   // Timer/Stopwatch
let timerInterval;
let stopwatchInterval;
let timerRunning = false;
let stopwatchRunning = false;
let startTime;

const durationInput = document.getElementById('duration');
const timerDisplay = document.getElementById('timerDisplay');
const startTimerButton = document.getElementById('startTimer');
const stopTimerButton = document.getElementById('stopTimer');
const resetTimerButton = document.getElementById('resetTimer');

const stopwatchDisplay = document.getElementById('stopwatchDisplay');
const startStopwatchButton = document.getElementById('startStopwatch');
const stopStopwatchButton = document.getElementById('stopStopwatch');
const resetStopwatchButton = document.getElementById('resetStopwatch');

// Timer functionality
startTimerButton.addEventListener('click', () => {
    if (!timerRunning) {
        const durationMinutes = parseInt(durationInput.value, 10);
        let timeLeft = durationMinutes * 60; // Convert to seconds
        timerRunning = true;

        timerInterval = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerRunning = false;
                alert("Time's up!");
            }
        }, 1000);
    }
});

stopTimerButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerRunning = false;
});

resetTimerButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerRunning = false;
    const durationMinutes = parseInt(durationInput.value, 10);
    timerDisplay.textContent = `${durationMinutes.toString().padStart(2, '0')}:00`;
});

// Stopwatch functionality
startStopwatchButton.addEventListener('click', () => {
    if (!stopwatchRunning) {
        startTime = Date.now();
        stopwatchRunning = true;

        stopwatchInterval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const seconds = Math.floor(elapsedTime / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);

            const formattedSeconds = (seconds % 60).toString().padStart(2, '0');
            const formattedMinutes = (minutes % 60).toString().padStart(2, '0');
            const formattedHours = hours.toString().padStart(2, '0');

            stopwatchDisplay.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }, 1000);
    }
});

stopStopwatchButton.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
});

resetStopwatchButton.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchDisplay.textContent = "00:00:00";
});


   // Load saved notes from localStorage (if available)
   function loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        notes.value = savedNotes;
        statusMessage.textContent = 'Notes loaded successfully!';
        statusMessage.style.color = 'green';
    } else {
        statusMessage.textContent = 'No saved notes found.';
        statusMessage.style.color = 'orange';
    }
}

// Save notes to localStorage
function saveNotes() {
    const noteContent = notes.value.trim();
    if (noteContent) {
        localStorage.setItem('notes', noteContent);
        statusMessage.textContent = 'Notes saved successfully!';
        statusMessage.style.color = 'green';
    } else {
        statusMessage.textContent = 'Cannot save empty notes!';
        statusMessage.style.color = 'red';
    }
}

// Clear notes from textarea and localStorage
function clearNotes() {
    notes.value = '';
    localStorage.removeItem('notes');
    statusMessage.textContent = 'Notes cleared successfully!';
    statusMessage.style.color = 'blue';
}

// Load notes when Notepad section is shown
document.getElementById('notepad').addEventListener('click', loadNotes);

// Event listeners for Save and Clear buttons
saveButton.addEventListener('click', saveNotes);
clearButton.addEventListener('click', clearNotes); 