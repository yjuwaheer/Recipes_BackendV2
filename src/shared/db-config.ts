import { DataSource } from "typeorm";
import { Recipe } from "../entities/recipe.entity";
import path from "path";
import fs from "fs";

interface IRecipe {
  title: string;
  ingredients: string[];
  instructions: { type: string; text: string }[];
  times: string[];
  image: string;
}

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "recipes",
  entities: [Recipe],
  synchronize: true,
  logging: false,
});

export const initializeDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("DB initialized");

    // populateDB();
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

    for (let i = 0; i < 3; i++) {
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
