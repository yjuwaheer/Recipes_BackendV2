import { Request, Response } from "express";
import { Recipe } from "../entities/recipe.entity";
import { IRecipe } from "../entities/recipe.entity";
import { ILike, Like } from "typeorm";
import { title } from "process";

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes: IRecipe[] = await Recipe.find({});

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getARecipe = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  try {
    const recipe: Recipe | null = await Recipe.findOne({
      where: { id },
    });

    res.status(200).json(recipe);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createARecipe = async (req: Request, res: Response) => {
  const { title, ingredients, instructions, times, image }: IRecipe = req.body;

  if (!title || !ingredients || !instructions || !times || !image) {
    return res.status(400).json({ message: "Invalid body format" });
  }

  try {
    const recipe = Recipe.create({
      title,
      ingredients,
      instructions,
      times,
      image,
    });
    const data = await recipe.save();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateARecipe = async (req: Request, res: Response) => {
  const id: number = req.body.id;
  const { title, ingredients, instructions, times, image }: IRecipe = req.body;

  if (!id || !title || !ingredients || !instructions || !times || !image) {
    return res.status(400).json({ message: "Invalid body format" });
  }

  const recipe = await Recipe.findOne({
    where: {
      id,
    },
  });

  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  try {
    const response = await Recipe.update(id, {
      title,
      ingredients,
      instructions,
      times,
      image,
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteARecipe = async (req: Request, res: Response) => {
  const id: number = Number(req.body.id);

  const recipe = await Recipe.findOne({
    where: {
      id,
    },
  });

  if (!recipe) {
    return res.status(400).json({ message: "Invalid body format" });
  }

  try {
    const response = await Recipe.delete({ id });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const searchRecipes = async (req: Request, res: Response) => {
  const search: string = req.body.search;

  if (!search) {
    return res.status(400).json({ message: "Invalid body format" });
  }

  try {
    const recipes = await Recipe.createQueryBuilder()
      .select()
      .where("title ILIKE :search", { search: `%${search}%` })
      .orWhere("ARRAY_TO_STRING(ingredients, ',') ILIKE :search", {
        search: `%${search}%`,
      })
      .getMany();

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getRandomRecipes = (req: Request, res: Response) => {
  res.json({ msg: "Random" });
};
