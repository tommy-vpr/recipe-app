import { CronJob } from "cron";

const KEEP_ALIVE_URL = `${process.env.API_URL}/api/health`;

const keepAliveJob = new CronJob("*/14 * * * *", async () => {
  try {
    const res = await fetch(KEEP_ALIVE_URL);
    const data = await res.json(); // <-- parse as JSON, not text
    console.log("Keep-alive ping:", data);
  } catch (err) {
    console.error("Keep-alive ping failed:", err.message);
  }
});

keepAliveJob.start();
