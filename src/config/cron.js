import { CronJob } from "cron";
import fetch from "node-fetch"; // Node 18+ can use global fetch

const KEEP_ALIVE_URL = "https://recipe-app-3692.onrender.com/api/health"; // change to your real endpoint

// Cron job to ping every 14 minutes
// const keepAliveJob = new CronJob("*/14 * * * *", async () => {
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
