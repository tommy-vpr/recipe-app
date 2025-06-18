import express from "express";
import { db } from "../config/db.js";
import { favoritesTable } from "../db/schema.js";
import { and, eq } from "drizzle-orm";

const router = express.Router();

// POST /api/favorites
router.post("/", async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;

    if (!userId || !recipeId || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const exists = await db
      .select()
      .from(favoritesTable)
      .where(
        and(
          eq(favoritesTable.userId, userId),
          eq(favoritesTable.recipeId, recipeId)
        )
      );

    if (exists.length > 0) {
      return res.status(409).json({ error: "Already favorited" });
    }

    const newFavorite = await db
      .insert(favoritesTable)
      .values({ userId, recipeId, title, image, cookTime, servings })
      .returning();

    res.status(201).json(newFavorite[0]);
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// DELETE /api/favorites/:userId/:recipeId
router.delete("/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    await db
      .delete(favoritesTable)
      .where(
        and(
          eq(favoritesTable.userId, userId),
          eq(favoritesTable.recipeId, Number(recipeId))
        )
      );

    res.status(200).json({ message: "Successfully removed favorite recipe" });
  } catch (error) {
    console.error("Error removing a favorite:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /api/favorites/:userId
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const favorites = await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.userId, userId));

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
