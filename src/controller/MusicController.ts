import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import CustomError from "../err/CustomError";
import MusicBusiness from "../business/MusicBusiness";

export class MusicController {
  public async createMusic(request: Request, response: Response) {
    try {
      const { name, id_album } = request.body;
      const auth = request.headers.authorization as string;
      const authenticator = new Authenticator().getData(auth);

      if (authenticator.type !== "band") {
        throw new CustomError(
          "Só usuários do tipo banda podem criar uma música.",
          400
        );
      }

      await new MusicBusiness().createMusic({name, id_album})

      response.status(200).send({message: "Música criada com sucesso."})
    } catch (err) {
      if (err instanceof CustomError)
        response.status(err.status).send({ error: err.message });
      else {
        response.status(500).send({ error: err });
      }
    }
  }
}
