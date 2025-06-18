import express from "express";
import favoritesRoutes from "./routes/favorites.js";
import { ENV } from "./config/env.js";

const app = express();
const PORT = ENV.PORT || 5001;

app.use(express.json());

// Keep alive
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true });
});

// Mount /api/favorites
app.use("/api/favorites", favoritesRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
