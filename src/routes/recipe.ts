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

router.post("/", createARecipe);

router.put("/", updateARecipe);

router.delete("/", deleteARecipe);

router.get("/search", searchRecipes);

router.get("/random", getRandomRecipes);

router.get("/:id", getARecipe);

export default router;
