# Digital Platform for Centralized Alumni Data Management and Engagement

This project is a full-stack web application designed to help a college manage alumni data and foster engagement between alumni and students.

## Tech Stack
-   **Frontend**: React, Vite, TailwindCSS (v4), Axios, React Router, Lucide React
-   **Backend**: Spring Boot 3, Spring Security, Spring Data JPA, JWT
-   **Database**: MySQL / MariaDB

## Prerequisites
-   Java 17
-   Node.js (v18+)
-   MySQL 8.0+

## Getting Started

### 1. Database Setup
1. Open MySQL and execute the `database-schema.sql` file provided in the root directory.
   ```sql
   mysql -u root -p < database-schema.sql
   ```
   *(Ensure your database credentials match `application.properties` in backend.)*

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd alumni-backend
   ```
2. Build and run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The backend will start on `http://localhost:8080`.*

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd alumni-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will start on `http://localhost:5173`.*

---

## API Documentation

### Authentication (`/api/auth`)
*   `POST /api/auth/login` - Authenticates a user and returns a JWT token.
*   `POST /api/auth/signup` - Registers a new user (`ADMIN`, `ALUMNI`, or `STUDENT`). 
    - Body can include `fullName` and `batchYear` for alumni profiles.

### Alumni Management (`/api/alumni`)
*   `GET /api/alumni/all` - Retrieves a list of all alumni profiles.
*   `GET /api/alumni/{id}` - Retrieves a specific alumni profile by id.
*   `GET /api/alumni/search` - Searches for alumni. Accepts query parameters: `batchYear` and `currentCompany`.
*   `PUT /api/alumni/{id}` - (User/Admin) Updates an alumni profile.
*   `DELETE /api/alumni/{id}` - (Admin) Deletes an alumni profile.

### Events (`/api/events`)
*   `GET /api/events` - Retrieves a list of all events, sorted by date.
*   `POST /api/events` - (Admin/Alumni) Creates an event announcement.
*   `DELETE /api/events/{id}` - (Admin) Deletes an event.

### Posts / Announcements (`/api/posts`)
*   `GET /api/posts` - Retrieves all alumni posts.
*   `POST /api/posts` - (Admin/Alumni) Creates a new post.
*   `DELETE /api/posts/{id}` - (Admin/Alumni) Deletes a post.

---
**Enjoy the platform and engage with your alumni!**
