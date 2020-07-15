import express from "express";
import { GenreController } from "../controller/GenreController";

export const genreRouter = express.Router();
const genreController = new GenreController();

genreRouter.post("/addgenre", genreController.addGenre)
genreRouter.get("/getallgenres", genreController.getAllGenres);