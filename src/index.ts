import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { initializeDB } from "./shared/db-config";

import RecipeRouter from "./routes/recipe";

const PORT: number = 5000;

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializeDB();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server running" });
});

app.use("/recipes", RecipeRouter);

try {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.log("Failed to start server");
}
