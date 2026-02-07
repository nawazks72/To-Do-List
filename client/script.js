const apiBase = '/api/tasks';
let allTasks = [];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCalendarControls();
    initFilters();
    initSettings();
    updateDate();
    fetchTasks();

    const addBtn = document.getElementById('addBtn');
    const taskInput = document.getElementById('taskInput');

    addBtn.addEventListener('click', handleAddTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAddTask();
    });

    // Landing Page Logic
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            document.getElementById('landing-view').classList.remove('active');
            document.getElementById('dashboard-view').classList.add('active');
            document.getElementById('mainSidebar').style.display = 'flex';
        });
    }
});

function initNavigation() {
    const navItems = {
        'nav-dashboard': 'dashboard-view',
        'nav-all-tasks': 'all-tasks-view',
        'nav-calendar': 'calendar-view',
        'nav-settings': 'settings-view'
    };

    for (const [navId, viewId] of Object.entries(navItems)) {
        document.getElementById(navId).addEventListener('click', (e) => {
            e.preventDefault();
            // Update Nav Active State
            document.querySelectorAll('.sidebar nav li').forEach(li => li.classList.remove('active'));
            document.getElementById(navId).classList.add('active');

            // Update View Active State
            document.querySelectorAll('.view-section').forEach(view => view.classList.remove('active'));
            document.getElementById(viewId).classList.add('active');

            // Refresh views if needed
            if (viewId === 'calendar-view') renderCalendar();
            if (viewId === 'all-tasks-view') renderAllTasks();
        });
    }
}

function initCalendarControls() {
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
}

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchTasks');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderAllTasks();
        });
    });

    searchInput.addEventListener('input', renderAllTasks);
}

function initSettings() {
    document.getElementById('clearDataBtn').addEventListener('click', async () => {
        if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone.')) {
            // Delete all tasks one by one (or backend could have a clear endpoint)
            // For now, let's just loop delete or create a clear endpoint. 
            // Standard way: fetch delete loop.
            for (const task of allTasks) {
                await fetch(`${apiBase}/${task.id}`, { method: 'DELETE' });
            }
            fetchTasks();
            alert('All data cleared.');
        }
    });
}

function updateDate() {
    const dateElement = document.getElementById('dateDisplay');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString("en-US", options);
}

async function fetchTasks() {
    try {
        const response = await fetch(apiBase);
        const data = await response.json();
        allTasks = data.data; // Store globally
        renderDashboardTasks(allTasks.slice(0, 5)); // Show recent 5 on dashboard
        renderAllTasks();
        renderCalendar();
        updateStats(allTasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

async function handleAddTask() {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('taskDateInput');
    const text = taskInput.value.trim();
    const due_date = dateInput.value;

    if (text) {
        try {
            const response = await fetch(apiBase, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, due_date })
            });
            if (response.ok) {
                taskInput.value = '';
                dateInput.value = '';
                fetchTasks();
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }
}

async function toggleTask(id, currentStatus) {
    try {
        const response = await fetch(`${apiBase}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !currentStatus })
        });
        if (response.ok) fetchTasks();
    } catch (error) {
        console.error('Error toggling task:', error);
    }
}

async function deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
        const response = await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
        if (response.ok) fetchTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

function updateStats(tasks) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById('totalCount').textContent = total;
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('pendingCount').textContent = pending;
}

function renderDashboardTasks(tasks) {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    if (tasks.length === 0) {
        list.innerHTML = '<li style="background:none; box-shadow:none; justify-content:center; color:#999;">No tasks found.</li>';
        return;
    }
    tasks.forEach(task => list.appendChild(createTaskElement(task)));
}

function renderAllTasks() {
    const list = document.getElementById('allTaskList');
    const filter = document.querySelector('.filter-btn.active').dataset.filter;
    const search = document.getElementById('searchTasks').value.toLowerCase();

    list.innerHTML = '';

    const filtered = allTasks.filter(task => {
        const matchesSearch = task.text.toLowerCase().includes(search);
        const matchesFilter = filter === 'all' ||
            (filter === 'completed' && task.completed) ||
            (filter === 'pending' && !task.completed);
        return matchesSearch && matchesFilter;
    });

    if (filtered.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:#999; margin-top:20px;">No matching tasks found.</p>';
        return;
    }

    filtered.forEach(task => list.appendChild(createTaskElement(task)));
}

function createTaskElement(task) {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const checkIcon = task.completed ? '<i class="fas fa-undo"></i>' : '<i class="fas fa-check"></i>';
    const checkBtn = document.createElement('button');
    checkBtn.className = 'btn-action btn-check';
    checkBtn.innerHTML = checkIcon;
    checkBtn.onclick = () => toggleTask(task.id, task.completed);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'task-content';

    const textSpan = document.createElement('div');
    textSpan.textContent = task.text;
    textSpan.style.fontWeight = '500';

    const dateSpan = document.createElement('div');
    if (task.due_date) {
        dateSpan.textContent = new Date(task.due_date).toLocaleDateString();
        dateSpan.style.fontSize = '0.8rem';
        dateSpan.style.color = '#7f8c8d';
    }

    contentDiv.appendChild(textSpan);
    if (task.due_date) contentDiv.appendChild(dateSpan);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-action btn-delete';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.onclick = () => deleteTask(task.id);

    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.appendChild(checkBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(contentDiv);
    li.appendChild(actions);
    return li;
}

function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const monthYear = document.getElementById('currentMonthYear');
    grid.innerHTML = '';

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay(); // 0 is Sunday

    monthYear.textContent = firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // Header Row
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.textContent = day;
        grid.appendChild(header);
    });

    // Empty slots before first day
    for (let i = 0; i < startingDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day empty';
        grid.appendChild(empty);
    }

    // Days
    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';

        const todayStr = new Date().toISOString().split('T')[0];
        if (dateStr === todayStr) dayCell.classList.add('today');

        dayCell.innerHTML = `<span class="day-number">${i}</span>`;

        // Find tasks for this day
        // Note: fetch date might be ISO string time, simplistic match here
        const dayTasks = allTasks.filter(t => t.due_date === dateStr);

        dayTasks.forEach(task => {
            const marker = document.createElement('div');
            marker.className = 'day-task-marker';
            if (task.completed) marker.classList.add('completed');
            marker.textContent = task.text;
            marker.title = task.text;
            dayCell.appendChild(marker);
        });

        grid.appendChild(dayCell);
    }
}
