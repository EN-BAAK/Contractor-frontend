# Contractor-frontend

This project is the frontend for the Contractor Management System. It is built using:

- Vite
- React
- TypeScript
- SASS
- Bootstrap 5

The website is fully responsive and designed for all screen sizes. The primary language of the website is Arabic, with an option to toggle the language.

## Features

### General

- **Login Page**:
  - Login form for all users using:
    - Phone number
    - Password
  - Button to change the language.

### Admin Panel

1. **Sidebar Navigation**:
   - Includes a logo and links to:
     - Users
     - Contractors
     - Completed Tasks
     - Tasks
     - Change Language
     - Logout

2. **Users Page**:
   - Manage users:
     - Add, remove, and edit specific users.
   - Table on the right to display user details.
   - Control form on the left with a submit button for task creation.

3. **Contractors Page** (for Admin and Secretary):
   - Table displaying contractor data.
   - Options to add, delete, or edit contractors.
   - Control tools on top of the table for filtering and management.
   - for secretary there is a language button.

4. **Tasks Page**:
   - Table displaying uncompleted tasks.
   - Control tools on top of the table.
   - Tasks with overdue dates are highlighted in red.

5. **Completed Tasks Page**:
   - Similar to the tasks page but displays completed tasks.

### Tester Panel

1. **Tasks Page**:
   - Accessible only via mobile.
   - Displays tasks assigned to the tester:
     - Pending tasks.
     - Completed tasks.
   - Tasks are sorted by date.
   - Overdue tasks are highlighted in red.

## Setup

To toggle the project:

1. Clone the repository:
   ```bash
   git clone https://github.com/EN-BAAK/Contractor-frontend.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Create a `.env` file and add the following:
   ```env
   VITE_API_BASE_URL=http://localhost:3008
   ```

5. Clone the backend repository:
   ```bash
   git clone https://github.com/EN-BAAK/Contractor-server.git
   ```

6. Follow the backend README file for further documentation and setup instructions.

---

**Designed and coded by me.**
