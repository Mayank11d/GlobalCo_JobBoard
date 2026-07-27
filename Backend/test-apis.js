
const axios = require("axios");

const BASE_URL = "http://localhost:5000/api/v1";
let token = "";

const api = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true
});

api.interceptors.request.use(config => {
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

async function runTests() {
  console.log("Starting API Tests...\n");

  // 1. Auth Login
  console.log("Testing Login...");
  const loginRes = await api.post("/auth/login", { email: "candidate@example.com", password: "Password123!" });
  if (loginRes.data.success && loginRes.data.data.token) {
    console.log("? Login Success");
    token = loginRes.data.data.token;
  } else {
    console.log("? Login Failed", loginRes.data);
    return;
  }

  // 2. Auth Me
  const meRes = await api.get("/auth/me");
  console.log(meRes.data.success ? "? GET /auth/me" : "? GET /auth/me", meRes.data.message || meRes.data);

  // 3. Companies
  const compRes = await api.get("/companies");
  console.log(compRes.data.success ? "? GET /companies" : "? GET /companies", compRes.data.message || compRes.data);

  // 4. Jobs
  const jobsRes = await api.get("/jobs");
  console.log(jobsRes.data.success ? "? GET /jobs" : "? GET /jobs", jobsRes.data.message || jobsRes.data);

  // 5. Applications
  const appRes = await api.get("/applications");
  console.log(appRes.data.success ? "? GET /applications" : "? GET /applications", appRes.data.message || appRes.data);

  // 6. Saved Jobs
  const savedRes = await api.get("/saved-jobs");
  console.log(savedRes.data.success ? "? GET /saved-jobs" : "? GET /saved-jobs", savedRes.data.message || savedRes.data);

  // 7. Dashboard Stats
  const dashRes = await api.get("/dashboard/stats");
  console.log(dashRes.data.success ? "? GET /dashboard/stats" : "? GET /dashboard/stats", dashRes.data.message || dashRes.data);

  // 8. Notifications
  const notifRes = await api.get("/notifications");
  console.log(notifRes.data.success ? "? GET /notifications" : "? GET /notifications", notifRes.data.message || notifRes.data);

  console.log("\nFinished basic endpoint tests.");
}
runTests();

