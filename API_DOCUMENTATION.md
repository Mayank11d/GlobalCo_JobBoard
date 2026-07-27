# API Documentation

Base URL: `http://localhost:5000/api` (or production backend URL)

## Authentication (`/api/auth`)

### 1. Register User
* **Method:** `POST`
* **Endpoint:** `/auth/register`
* **Description:** Creates a new user account.
* **Authentication Required:** No
* **Request Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "Password123!",
    "role": "CANDIDATE" 
  }
  ```
* **Response (201 Created):** `{ "message": "User registered successfully", "token": "jwt_string", "user": { ... } }`
* **Status Codes:** `201 Created`, `400 Bad Request`

### 2. Login User
* **Method:** `POST`
* **Endpoint:** `/auth/login`
* **Description:** Authenticates a user and returns a JWT.
* **Authentication Required:** No
* **Request Body:** `{ "email": "john@example.com", "password": "Password123!" }`
* **Response (200 OK):** `{ "message": "Login successful", "token": "jwt_string", "user": { ... } }`

### 3. Get Current User (Me)
* **Method:** `GET`
* **Endpoint:** `/auth/me`
* **Description:** Retrieves the profile of the currently authenticated user.
* **Authentication Required:** Yes
* **Response (200 OK):** `{ "user": { ... } }`

---

## Jobs (`/api/jobs`)

### 1. Get All Jobs
* **Method:** `GET`
* **Endpoint:** `/jobs`
* **Description:** Fetches a list of jobs. Supports query parameters for filtering (e.g., `?jobType=FULL_TIME&search=developer`).
* **Authentication Required:** No
* **Response (200 OK):** `{ "jobs": [ ... ], "total": 100, "page": 1 }`

### 2. Get Job by ID
* **Method:** `GET`
* **Endpoint:** `/jobs/:id`
* **Description:** Fetches details of a specific job by its ID.
* **Authentication Required:** No

### 3. Create Job
* **Method:** `POST`
* **Endpoint:** `/jobs`
* **Description:** Posts a new job listing.
* **Authentication Required:** Yes
* **Role Required:** `RECRUITER`, `ADMIN`
* **Request Body:**
  ```json
  {
    "title": "Software Engineer",
    "description": "Job description here",
    "requirements": ["React", "Node.js"],
    "jobType": "FULL_TIME",
    "workMode": "REMOTE",
    "companyId": "mongo_id_here"
  }
  ```

### 4. Update Job
* **Method:** `PATCH`
* **Endpoint:** `/jobs/:id`
* **Description:** Updates an existing job (e.g., changing status to PUBLISHED).
* **Authentication Required:** Yes
* **Role Required:** `RECRUITER`, `ADMIN`

### 5. Delete Job
* **Method:** `DELETE`
* **Endpoint:** `/jobs/:id`
* **Description:** Removes a job posting.
* **Authentication Required:** Yes
* **Role Required:** `RECRUITER`, `ADMIN`

---

## Companies (`/api/companies`)

### 1. Get All Companies
* **Method:** `GET`
* **Endpoint:** `/companies`
* **Description:** Fetches all registered companies.
* **Authentication Required:** No

### 2. Create Company
* **Method:** `POST`
* **Endpoint:** `/companies`
* **Description:** Creates a new company profile.
* **Authentication Required:** Yes
* **Role Required:** `RECRUITER`, `ADMIN`

---

## Applications (`/api/applications`)

### 1. Apply for Job
* **Method:** `POST`
* **Endpoint:** `/applications`
* **Description:** Submits a candidate's application for a specific job.
* **Authentication Required:** Yes
* **Role Required:** `CANDIDATE`
* **Request Body:** `{ "jobId": "mongo_id", "resumeUrl": "url", "coverLetter": "..." }`

### 2. Get My Applications
* **Method:** `GET`
* **Endpoint:** `/applications/me`
* **Description:** Fetches all applications submitted by the logged-in candidate.
* **Authentication Required:** Yes
* **Role Required:** `CANDIDATE`

### 3. Update Application Status
* **Method:** `PATCH`
* **Endpoint:** `/applications/:id/status`
* **Description:** Updates the status of an application (e.g., PENDING -> REVIEWED).
* **Authentication Required:** Yes
* **Role Required:** `RECRUITER`, `ADMIN`
* **Request Body:** `{ "status": "INTERVIEW" }`

---

## Saved Jobs (`/api/saved-jobs`)

### 1. Save Job
* **Method:** `POST`
* **Endpoint:** `/saved-jobs`
* **Description:** Bookmarks a job for a candidate.
* **Authentication Required:** Yes
* **Role Required:** `CANDIDATE`

### 2. Get Saved Jobs
* **Method:** `GET`
* **Endpoint:** `/saved-jobs`
* **Description:** Retrieves all jobs saved by the candidate.
* **Authentication Required:** Yes
* **Role Required:** `CANDIDATE`

---

## Notifications (`/api/notifications`)

### 1. Get Notifications
* **Method:** `GET`
* **Endpoint:** `/notifications`
* **Description:** Fetches alerts for the current user.
* **Authentication Required:** Yes

### 2. Mark as Read
* **Method:** `PATCH`
* **Endpoint:** `/notifications/:id/read`
* **Description:** Marks a specific notification as read.
* **Authentication Required:** Yes
