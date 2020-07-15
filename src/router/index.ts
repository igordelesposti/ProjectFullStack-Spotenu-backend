import { Router } from "express";
import userRoute from "./user.routes";
import { bandsRouter } from "./bands.routes";
import { genreRouter } from "./genre.routes";

const routes = Router();

routes.use("/user", userRoute);
routes.use("/band", bandsRouter);
routes.use("/genre", genreRouter);


export default routes;