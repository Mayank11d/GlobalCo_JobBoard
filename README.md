# GlobalCo_JobBoard

Welcome to the GlobalCo_JobBoard project. This repository contains both the Backend (Node.js/Express) and the Frontend (Next.js 15).

## Frontend CI/CD Setup with Vercel

This project uses **GitHub Actions** to automatically deploy the Frontend application to **Vercel** on every push to the `main` branch.

### How Automatic Deployment Works
1. When code is pushed to the `main` branch (or triggered manually via GitHub Actions), the `.github/workflows/vercel-deploy.yml` workflow runs.
2. The workflow checks out the repository and sets up Node.js.
3. It installs the frontend dependencies using caching to speed up the process.
4. It uses the official Vercel CLI to securely pull your Vercel project environment settings.
5. It builds the project production artifacts.
6. Finally, it deploys the production build directly to Vercel without publishing your tokens.

### How to connect the repository to Vercel
1. Log in to your [Vercel](https://vercel.com/) dashboard.
2. Ensure you do **not** connect the GitHub repository directly through the Vercel dashboard to avoid conflicts with our custom GitHub Actions workflow.
3. Open a terminal in the `Frontend/my-app` directory locally.
4. Run `npx vercel link` to connect your local project to a new or existing Vercel project.
5. Follow the prompts. This will create a `.vercel` folder locally containing your `projectId` and `orgId`.

### How to configure GitHub Secrets
To make the pipeline work securely without hardcoded credentials, you need to configure the following **Repository Secrets** in GitHub:
Navigate to your GitHub repository -> **Settings** -> **Secrets and variables** -> **Actions**, and add the following secrets:

- **`VERCEL_TOKEN`**: Your Vercel personal access token.
  - **How to obtain**: Go to your Vercel account settings (Profile -> Settings -> Tokens). Create a new token with a descriptive name (e.g., "GitHub Actions Deploy").
  
- **`VERCEL_ORG_ID`**: The ID of your Vercel team/organization.
  - **How to obtain**: After running `npx vercel link` locally, open the generated `.vercel/project.json` file. The `orgId` value is your `VERCEL_ORG_ID`.
  
- **`VERCEL_PROJECT_ID`**: The specific Vercel project ID for the frontend.
  - **How to obtain**: Inside the same `.vercel/project.json` file, the `projectId` value is your `VERCEL_PROJECT_ID`.

- **`NEXT_PUBLIC_BACKEND_URL`**: The public URL where your backend is hosted.
  - This is used by the Next.js frontend to communicate with your backend API.

## Backend Setup
The backend is prepared for manual deployment or separate automated pipelines later. It will not be automatically deployed by the Vercel frontend workflow.