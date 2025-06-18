import { CronJob } from "cron";

// Replace with your actual endpoint
const KEEP_ALIVE_URL = `${process.env.API_URL}/api/health`;

// Cron job to ping every 30 seconds
const keepAliveJob = new CronJob("*/30 * * * * *", async () => {
  try {
    const res = await fetch(KEEP_ALIVE_URL);
    const data = await res.text();
    console.log("Keep-alive ping:", data);
  } catch (err) {
    console.error("Keep-alive ping failed:", err.message);
  }
});

keepAliveJob.start();
