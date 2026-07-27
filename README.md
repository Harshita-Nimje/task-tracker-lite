# Task_Tracker_Lite

This project is a backend-focused application designed to manage tasks with user authentication, role-based access control, and category organization. Built with Node.js, Express, and PostgreSQL, the system provides secure APIs that allow users to manage their tasks efficiently while enabling admins to oversee and control categories and overall task activity.

## Features

- User Authentication: Secure registration and login system using hashed passwords and JWT-based authentication to protect all APIs.

- Role-Based Access: Supports Admin and Normal User roles, where Admins can manage categories and view all tasks, while users can only manage their own tasks.

- Category Management: Admins can create, update, and delete categories such as Work or Personal, which users can assign to their tasks.

- Task Management: Users can create, update, and track tasks with title, description, status, due date, and category. Task status cannot be updated after the due date.

- Admin Dashboard: Provides a complete overview of all user tasks with filtering options based on user, status, and due date.

- Docker Support: Fully containerized setup using Docker and Docker Compose for easy deployment and environment consistency.



## Installation


- Clone the repository.
   ```bash
  git clone https://github.com/Harshita-Nimje/task-tracker-lite.git
- Install  Dependencies
  ```bash
  npm install
- Run the application.
   ```bash
   npm start
- Open your API testing tool (Postman/Thunder Client) and use the endpoints
## Technologies Used
- Node.js & Express – Backend framework for building REST APIs.

- PostgreSQL – Relational database for storing users, tasks, and categories.

- JWT (JSON Web Token) – Secure authentication and authorization.

- Docker – Containerization for easy deployment and environment setup.
