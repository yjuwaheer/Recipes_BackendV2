import { Request, Response } from "express";

export const getAllRecipes = (req: Request, res: Response) => {
  res.json({ msg: "All" });
};

export const getARecipe = (req: Request, res: Response) => {
  res.json({ msg: "One" });
};

export const createARecipe = (req: Request, res: Response) => {
  res.json({ msg: "Create" });
};

export const updateARecipe = (req: Request, res: Response) => {
  res.json({ msg: "Update" });
};

export const deleteARecipe = (req: Request, res: Response) => {
  res.json({ msg: "Delete" });
};

export const searchRecipes = (req: Request, res: Response) => {
  res.json({ msg: "Search" });
};

export const getRandomRecipes = (req: Request, res: Response) => {
  res.json({ msg: "Random" });
};
