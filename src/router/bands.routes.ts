import express from "express";
import { BandController } from "../controller/BandController";

export const bandsRouter = express.Router();

bandsRouter.get("/getallbands", new BandController().getAllBands);
bandsRouter.post("/approve/:id", new BandController().approveBand);

