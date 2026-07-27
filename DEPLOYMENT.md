# Deployment & CI/CD Guide

The GlobalCo Job Board utilizes a robust, automated Continuous Integration and Continuous Deployment (CI/CD) pipeline powered by GitHub Actions. This ensures that every code push is automatically tested, built, and deployed to production without manual intervention.

## CI/CD Pipeline Architecture

Our pipeline is defined in `.github/workflows/` and is triggered on every push to the `main` branch.

### Frontend Deployment (Vercel)
The frontend is deployed to Vercel. Instead of linking the Vercel project directly to GitHub (which can cause issues in monorepos or custom build steps), the deployment is handled explicitly by our GitHub Action using the Vercel CLI.

**Workflow Steps:**
1. **Checkout Code:** Retrieves the latest code from the `main` branch.
2. **Setup Node.js:** Installs Node.js v20.
3. **Install Dependencies:** Runs `npm install` inside the `Frontend/my-app` directory.
4. **Build Next.js:** Runs `npm run build` to generate optimized static files and serverless functions.
5. **Install Vercel CLI:** Globally installs `vercel@latest`.
6. **Vercel Pull:** Pulls the project environment variables from Vercel securely using GitHub Secrets (`VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `VERCEL_TOKEN`).
7. **Vercel Build & Deploy:** Pushes the prebuilt artifacts to Vercel production.

### Backend Deployment (Render)
The backend is deployed as a Web Service on Render. Render is configured to monitor the GitHub repository and automatically trigger a new deployment whenever changes are pushed.

**Render Configuration:**
* **Root Directory:** `Backend` (Crucial for monorepos so Render knows where `package.json` is located).
* **Build Command:** `npm install && npm run build`
* **Start Command:** `npm run start`

## Setting Up Environments

### GitHub Secrets Required for Frontend CI/CD
To replicate this setup, you must configure the following Secrets in your GitHub Repository (`Settings > Secrets and variables > Actions`):

* `VERCEL_TOKEN`: Generated from your Vercel account settings.
* `VERCEL_ORG_ID`: Your Vercel Organization ID.
* `VERCEL_PROJECT_ID`: Your specific Vercel Project ID.
* `NEXT_PUBLIC_BACKEND_URL`: The production URL of your Render backend (e.g., `https://your-backend.onrender.com/api`).

### Render Environment Variables Required for Backend
Inside the Render dashboard for your Web Service, configure the following Environment Variables:

* `NODE_ENV`: `production`
* `MONGODB_URI`: Your MongoDB Atlas connection string.
* `JWT_SECRET`: A long, secure random string for signing tokens.
* `JWT_EXPIRES_IN`: e.g., `7d`.
* `CLIENT_URL`: The production URL of your Vercel frontend (to configure CORS).

## Troubleshooting Deployments

### `npm ci` Lockfile Errors
If the GitHub Action fails during the "Install dependencies" step with an error regarding `package-lock.json` not being in sync, this means a package was installed locally but the `package-lock.json` file was not committed. 
* **Fix:** We use `npm install` in the CI pipeline to mitigate strict lockfile desyncs, but always ensure you run `npm install` locally and commit `package.json` and `package-lock.json` together.

### Vercel `Module not found` Errors
Because Vercel runs on a Linux environment (Ubuntu), file paths are **case-sensitive**. If your code imports `components/header` but the file is named `Header.tsx`, it will build successfully on Windows but fail on Vercel. Always ensure import casing exactly matches the file system.
