import { Router } from "express";
import userRoute from "./user.routes";
import { bandsRouter } from "./bands.routes";
import { genreRouter } from "./genre.routes";
import { albumRouter } from "./album.routes";
import { musicRouter } from "./music.routes";

const routes = Router();

routes.use("/user", userRoute);
routes.use("/band", bandsRouter);
routes.use("/genre", genreRouter);
routes.use("/album", albumRouter);
routes.use("/music", musicRouter);


export default routes;