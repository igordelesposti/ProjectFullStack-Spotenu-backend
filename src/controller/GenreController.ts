import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import CustomError from "../err/CustomError";
import GenreBusiness from "../business/GenreBusiness";
import { GenreDataBase } from "../data/GenreDataBase";


export class GenreController {
  public async addGenre(request: Request, response: Response) {
    try {
      const name = request.body.name;
      const auth = request.headers.authorization as string;

      const authenticator = new Authenticator().getData(auth);

      if (authenticator.type !== "admin") {
        throw new CustomError("Você não é um admin.", 400);
      }

      await new GenreBusiness().addGenre({name});

      response.status(200).send({ message: "Gênero criado com sucesso."});
    } catch (err) {
        if (err instanceof CustomError)
        response.status(err.status).send({ error: err.message });
      else {
        response.status(500).send({ error: err });
      }
    }
  }

  public async getAllGenres(request: Request, response: Response) {
    try {
      const auth = request.headers.authorization as string;

      const authenticator = new Authenticator().getData(auth);

      if (authenticator.type !== "band") {
        throw new CustomError("Você precisa estar logado como Banda.", 400);
      }

      const result = await new GenreDataBase().getAllGenres();
      

      response.status(200).send({ result });
    } catch (err) {
      if (err instanceof CustomError)
        response.status(err.status).send({ error: err.message });
      else {
        response.status(500).send({ error: err });
      }
    }
  }
}
