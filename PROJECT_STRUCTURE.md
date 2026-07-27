# Project Structure

The project is organized as a monorepo containing two distinct folders: `Frontend` and `Backend`. This separation ensures that the client and server codebases remain decoupled while residing in the same repository for simplified version control.

```text
GlobalCo_JobBoard/
├── .github/
│   └── workflows/
│       ├── ci-cd.yml             # Main CI/CD pipeline (tests, build, Render deployment)
│       └── vercel-deploy.yml     # Vercel deployment pipeline for frontend
├── Backend/                      # Node.js + Express Backend API
│   ├── .env                      # Environment variables for Backend
│   ├── package.json              # Backend dependencies and scripts
│   └── src/
│       ├── config/               # Database and Env configurations (db.config.ts, env.config.ts)
│       ├── constant/             # Application constants and Enums (e.g., Role, JobStatus)
│       ├── controllers/          # Request handlers (logic for auth, jobs, companies)
│       ├── interfaces/           # TypeScript interfaces (IUser, IJob, etc.)
│       ├── middlewares/          # Express middlewares (auth, validation, error handling)
│       ├── models/               # Mongoose schemas (User, Job, Company)
│       ├── routes/               # API route definitions (mapping endpoints to controllers)
│       ├── services/             # Reusable business logic (e.g., hashPassword, generateToken)
│       ├── utils/                # Helper functions
│       ├── validations/          # Joi schemas for request body validation
│       ├── seed.ts               # Database seeding script for demo data
│       └── server.ts             # Entry point for the Express application
└── Frontend/my-app/              # Next.js Frontend Application
    ├── .env.local                # Environment variables for Frontend
    ├── package.json              # Frontend dependencies and scripts
    └── src/
        ├── app/                  # Next.js App Router (Pages & Layouts)
        │   ├── (auth)/           # Route group for login/register pages
        │   ├── dashboard/        # Protected dashboards (candidate, recruiter)
        │   ├── jobs/             # Public job listings and details
        │   ├── companies/        # Public company listings
        │   ├── layout.tsx        # Root layout wrapper
        │   └── page.tsx          # Landing page
        ├── components/           # Reusable UI Components
        │   ├── ui/               # Generic elements (Buttons, Inputs, Modals)
        │   ├── dashboard/        # Dashboard-specific components (Sidebars, Metrics)
        │   └── layout/           # Navbar, Footer
        ├── hooks/                # Custom React hooks (React Query wrappers)
        ├── lib/                  # Utilities (Axios instance, ReactQueryProvider, cn/twMerge)
        ├── services/             # Axios API call wrappers (jobService, authService)
        └── types/                # TypeScript type definitions for frontend
```

## Key Directories Explained

### Backend
* **`controllers/` & `routes/`:** Traffic comes into the `routes`, which define the HTTP method and path, and is then handed off to the `controllers`. Controllers extract data from the request, interact with models, and send back the HTTP response.
* **`models/`:** Contains the Mongoose schemas that dictate how data is shaped and stored in MongoDB.
* **`middlewares/`:** Contains functions that intercept requests before they reach the controller. The most important is `auth.middleware.ts`, which verifies JWT tokens and checks user roles.

### Frontend
* **`app/`:** Utilizes the Next.js App Router. Folders define the URL paths. Protected routes are handled either via Next.js middleware or client-side layout checks.
* **`hooks/`:** Contains custom hooks like `useJob.ts` and `useAuth.ts`. These hooks wrap `@tanstack/react-query` functions, meaning components simply call `const { data, isLoading } = useJobs()` without worrying about the underlying Axios request.
* **`services/`:** Contains the actual API logic. This is where `axios.get('/jobs')` lives. Keeping this separate from components ensures that if the API changes, only the service file needs updating.
