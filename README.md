# TO-DO-LIST
This project serves as both a practical productivity solution and a foundational example 
for web development learners. Its structure and logic are simple enough to be understood 
by beginners, yet the implementation demonstrates essential principles such as event
driven programming, DOM manipulation, and responsive design. The app is entirely 
browser-based, making it a lightweight, install-free, and offline-compatible task manager.

# Main Features of the Code 
### 1. Task Addition Functionality
 Users can enter a task using the input box and click the "Add Task" button to insert it into the table. Input validation prevents blank tasks from being added.

### 2. Tabular Task Layout
Tasks are displayed in a clean, structured table with four columns: 
Task Name, Completed, Date Added, and Action (Delete).

Inspired by Notion-like organization for improved readability.
   
 ### 3. Task Completion with Checkbox
Each task includes a checkbox to mark it as complete.
Completed tasks are visually indicated with a line-through style and a faded color (text-decoration: line-through).

### 4. Auto Date Insertion
Each task row automatically includes the current date when added.
Uses JavaScript's Date object and toLocaleDateString() for formatted output.

### 5. Delete Task Option
Each row contains a "Delete" button to remove tasks from the table. 
Task removal happens dynamically without a page refresh.

### 6. Responsive Design
CSS media queries ensure proper layout adaptation on smaller screens like phones and tablets.
Input elements stack vertically on small devices (max-width: 600px).

### 7. Modern UI/UXo
Clean, modern design with soft colors, subtle shadows, and smooth rounded corners.Styled using pure CSS for simplicity and compatibility.

### 8. JavaScript-Powered Interactivity
All dynamic behaviors (add/delete/mark complete) are handled using vanilla JavaScript.
DOM manipulation is used for creating and managing table rows. 
