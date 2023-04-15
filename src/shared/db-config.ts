import { DataSource } from "typeorm";
import { Recipe } from "../entities/recipe.entity";
import path from "path";
import fs from "fs";
import { IRecipe } from "../entities/recipe.entity";
import dotenv from "dotenv";

dotenv.config();

const portNumber: number = Number(process.env.DB_PORT || "") || 5432;

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: portNumber,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Recipe],
  synchronize: true,
  logging: false,
});

export const initializeDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("DB initialized");
  } catch (error) {
    console.log("Failed to initialize DB, ", error);
  }
};

export const populateDB = async () => {
  const recipes: IRecipe[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data/recipes.json"), "utf-8")
  );

  try {
    console.log("Populating DB");

    for (let i = 0; i < recipes.length; i++) {
      const recipe = Recipe.create({
        title: recipes[i].title,
        ingredients: recipes[i].ingredients,
        instructions: recipes[i].instructions,
        times: recipes[i].times,
        image: recipes[i].image,
      });

      await recipe.save();
      console.log("Added recipe ", i);
    }
  } catch (error) {
    console.log("Failed to initialize DB, ", error);
  }
};
