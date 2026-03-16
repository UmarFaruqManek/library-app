# Library Management System

A modern Library Management System built with Node.js, Express, EJS, and MySQL.

## Features

- **Dashboard**: Real-time statistics and recent activity.
- **Book Management**: Full CRUD with search, pagination, and stock tracking.
- **Member Management**: Register and manage library members.
- **Loan System**: Borrow books with automatic stock updates and history tracking.
- **Modern UI**: Built with Bootstrap 5 and customized for a premium feel.
- **Flash Messages**: Interactive feedback for all user actions.

## Prerequisites

- Node.js (v14+)
- MySQL Server

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/UmarFaruqManek/library-app.git
   cd library-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Database Setup**:
   - Create a database in MySQL (e.g., `library_app`).
   - Import the `database.sql` file provided in the root directory.

4. **Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add your database credentials:
     ```env
     DB_HOST=localhost
     DB_USER=your_user
     DB_PASSWORD=your_password
     DB_NAME=library_app
     PORT=3000
     ```

5. **Run the Application**:
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

## License
MIT
