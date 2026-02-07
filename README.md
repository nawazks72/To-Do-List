# TaskMaster - Modern To-Do & Productivity Dashboard

A powerful, full-stack task management application designed to help you organize your work and life. Built with Node.js, Express, and a modern frontend interface.

![TaskMaster Screenshot](https://via.placeholder.com/800x400?text=TaskMaster+Dashboard+Preview)

## 🚀 Features

### 1. **Dashboard Overview**
-   **Stats at a Glance**: View total, pending, and completed tasks instantly.
-   **Quick Add**: innovative task input with date selection.
-   **Recent Tasks**: See your latest activity.

### 2. **Calendar View** 📅
-   **Monthly Overview**: Visual calendar grid to see your schedule.
-   **Task Integration**: Tasks appear directly on their due dates.
-   **Navigation**: Easily switch between months.

### 3. **Smart Task Management** ✅
-   **All Tasks View**: Search and filter tasks by status (Pending/Completed).
-   **Due Dates**: Set deadlines to keep track of priorities.
-   **Status Tracking**: Mark tasks as complete with a satisfying click.

### 4. **Settings & Data Control** ⚙️
-   **Data Management**: Clear all application data with a single click.
-   **Persistent Storage**: All data is safely stored in a local SQLite database.

## 🛠️ Tech Stack

-   **Frontend**: HTML5, CSS3 (Custom Properties, Flexbox/Grid), Vanilla JavaScript (ES6+).
-   **Backend**: Node.js, Express.js.
-   **Database**: SQLite (Persistent local storage).

## 📦 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/nawazks72/To-Do-List.git
    cd To-Do-List
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start the Server**
    ```bash
    npm start
    # OR for development with nodemon:
    # npm run dev
    ```

4.  **Access the App**
    Open your browser and navigate to: `http://localhost:3000`

## 📂 Project Structure

```
To-Do-List/
├── client/              # Frontend files
│   ├── index.html       # Single Page Application entry
│   ├── style.css        # Global styles and themes
│   └── script.js        # UI logic, API calls, Navigation
├── server/              # Backend files
│   ├── index.js         # Entry point, Server configuration
│   ├── database.js      # SQLite connection & Schema
│   └── routes.js        # API Endpoints (GET, POST, PUT, DELETE)
├── .gitignore           # Git exclusions
├── package.json         # Dependencies and Scripts
└── README.md            # Project Documentation
```

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request.

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
