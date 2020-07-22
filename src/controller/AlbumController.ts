import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import CustomError from "../err/CustomError";
import AlbumBusiness from "../business/AlbumBusiness";
import { AlbumDataBase } from "../data/AlbumDataBase";

export class AlbumController {
  public async createAlbum(request: Request, response: Response) {
    try {
      const { name, id_genre } = request.body;
      const auth = request.headers.authorization as string;
      const authenticator = new Authenticator().getData(auth);

      if (authenticator.type !== "band") {
        throw new CustomError(
          "Só usuários do tipo banda podem criar um albúm.",
          400
        );
      }

      await new AlbumBusiness().createAlbum({
        name,
        id_genre,
        created_by: authenticator.id,
      });

      response.status(200).send({ message: "Album criado com sucesso." });
    } catch (err) {
      if (err instanceof CustomError)
        response.status(err.status).send({ error: err.message });
      else {
        response.status(500).send({ error: err });
      }
    }
  }

  public async getAlbumByUser(request: Request, response: Response) {
    try {
      const auth = request.headers.authorization as string;
      const authenticator = new Authenticator().getData(auth);

      if (authenticator.type !== "band") {
        throw new CustomError(
          "Só usuários do tipo banda podem criar um albúm.",
          400
        );
      }

      const albuns = await new AlbumDataBase().getAlbumByUser(authenticator.id)

      response.status(200).send({albuns})

    } catch (err) {
      if (err instanceof CustomError)
        response.status(err.status).send({ error: err.message });
      else {
        response.status(500).send({ error: err });
      }
    }
  }
}
