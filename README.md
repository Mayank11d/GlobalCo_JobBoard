# GlobalCo Job Board

## Project Overview
GlobalCo Job Board is a full-stack, comprehensive web application designed to connect top talent with industry-leading companies. Built with a modern technology stack, it provides specialized dashboards for Administrators, Recruiters, and Candidates, streamlining the entire recruitment lifecycle from job posting to application management.

## Business Problem
The recruitment process is often fragmented, with companies struggling to manage job postings across multiple platforms, and candidates finding it difficult to track their applications, saved jobs, and interview statuses in one cohesive interface. Traditional solutions often lack role-specific features that cater to the unique needs of recruiters versus job seekers.

## Solution
GlobalCo Job Board solves this by providing a unified, centralized platform. It offers a role-based architecture where candidates can seamlessly apply for jobs and track their progress, while recruiters can manage company profiles, post jobs, and review applications through a dedicated applicant tracking interface. Administrators oversee the platform's health and user base.

## Features
* **Role-Based Access Control (RBAC):** Distinct experiences for Candidates, Recruiters, and Admins.
* **Applicant Tracking System (ATS):** Recruiters can view, update, and manage candidate applications.
* **Advanced Job Search & Filtering:** Full-text search and filtering by job type, work mode, and status.
* **Real-time Notifications:** Alerts for application status changes and new job postings.
* **Resume & Portfolio Management:** Candidates can upload resumes and manage their profiles.
* **Company Profiles:** Recruiters can create and manage company pages to attract talent.
* **Secure Authentication:** JWT-based authentication with encrypted passwords and HTTP-only cookies (if configured).

## Technology Stack
### Frontend
* **Next.js 16 (App Router):** React framework for server-side rendering and static site generation.
* **React 19:** UI library.
* **TypeScript:** Static typing for robust code.
* **Tailwind CSS v4:** Utility-first CSS framework for styling.
* **React Query (@tanstack/react-query):** State management and data fetching.
* **Axios:** Promise-based HTTP client for API requests.

### Backend
* **Node.js & Express.js:** Fast, minimalist web framework.
* **TypeScript:** Strongly typed backend logic.
* **MongoDB & Mongoose:** NoSQL database and Object Data Modeling (ODM).
* **Bcrypt.js & JSON Web Tokens (JWT):** Secure authentication and authorization.
* **Joi:** Request data validation.

## Architecture
The application follows a client-server architecture. The frontend (Next.js) communicates with the backend (Express API) via RESTful endpoints. The backend serves as the single source of truth, validating requests, enforcing RBAC, and interacting with the MongoDB database. The CI/CD pipeline ensures automated testing and deployment.

## Demo Credentials
You can use the following credentials to test the different roles in the application.

### Admin
* **Name:** Super Admin
* **Email:** admin@jobboard.com
* **Password:** Password123!
* **Role:** Administrator
* **Login URL:** http://localhost:3000/login
* **Dashboard URL:** http://localhost:3000/dashboard

### Recruiter
* **Name:** Jane Smith
* **Email:** recruiter@example.com
* **Password:** Password123!
* **Role:** Recruiter
* **Login URL:** http://localhost:3000/login
* **Dashboard URL:** http://localhost:3000/dashboard/recruiter

### Candidate
* **Name:** John Doe
* **Email:** candidate@example.com
* **Password:** Password123!
* **Role:** Candidate
* **Login URL:** http://localhost:3000/login
* **Dashboard URL:** http://localhost:3000/dashboard/candidate

## Installation

### Prerequisites
* Node.js (v20 or higher recommended)
* MongoDB (Local instance or MongoDB Atlas)
* Git

### Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see below).
4. Run the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd Frontend/my-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see below).
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables
Create a `.env` file in the `Backend` directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/jobboard (Or your Atlas URI)
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
```

Create a `.env.local` file in the `Frontend/my-app` directory:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## Database Setup
To populate the database with the demo users, companies, and jobs, run the seed script from the `Backend` directory:
```bash
npm run seed
```
This will insert the Admin, Recruiter, and Candidate users, along with a demo company and job listings.

## How to Build
To build the project for production:

**Backend:**
```bash
cd Backend
npm run build
# Starts the compiled server
npm run start 
```

**Frontend:**
```bash
cd Frontend/my-app
npm run build
# Starts the production Next.js server
npm run start
```

## CI/CD Pipeline & Deployment
The project utilizes GitHub Actions for Continuous Integration and Continuous Deployment.
* **Backend CI:** On push to `main`, the backend is built and tested. Production deployment is handled via Render.
* **Frontend CI/CD:** On push to `main`, the frontend dependencies are installed, the Next.js project is built, and it is automatically deployed to **Vercel** via the Vercel CLI.

**Live Application (Frontend):** [https://globalco-jobboard.vercel.app](https://globalco-jobboard.vercel.app)
