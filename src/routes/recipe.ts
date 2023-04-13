import { Router, Request, Response } from "express";
import {
  createARecipe,
  deleteARecipe,
  getARecipe,
  getAllRecipes,
  getRandomRecipes,
  searchRecipes,
  updateARecipe,
} from "../controllers/recipe";

const router: Router = Router();

router.get("/", getAllRecipes);

router.get("/:id", getARecipe);

router.post("/", createARecipe);

router.put("/:id", updateARecipe);

router.delete("/:id", deleteARecipe);

router.get("/search", searchRecipes);

router.get("random", getRandomRecipes);

export default router;
