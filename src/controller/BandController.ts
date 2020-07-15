import { Request, Response } from "express";
import { BandDataBase } from "../data/BandDataBase";
import { Authenticator } from "../services/Authenticator";
import CustomError from "../err/CustomError";

export class BandController {
  public async getAllBands(request: Request, response: Response) {
    try {
      const auth = request.headers.authorization as string;

      const authenticator = new Authenticator().getData(auth);

      if (authenticator.type !== "admin") {
        throw new CustomError("Você não é um admin.", 400);
      }

      const resultBands = await new BandDataBase().getAllBands("band");
      const allBands = resultBands.map((band) => {
        return {
          name: band.name,
          nickname: band.nickname,
          email: band.email,
          isApproved: band.isApproved,
        };
      });

      response.status(200).send({ allBands });
    } catch (err) {
      if (err instanceof CustomError)
        response.status(err.status).send({ error: err.message });
      else {
        response.status(500).send({ error: err });
      }
    }
  }

  public async approveBand(request: Request, response: Response) {
    try {
      const auth = request.headers.authorization as string;

      const authenticator = new Authenticator().getData(auth);

      if (authenticator.type !== "admin") {
        throw new CustomError("Você não é um admin.", 400);
      }

      const id = request.params.id;

      await new BandDataBase().approveBandDB(id);
      if (!id) {
        throw new CustomError("Banda não encontrada", 400);
      }

      response.status(200).send({ message: "Banda aprovada com sucesso!" });
    } catch (err) {
      if (err instanceof CustomError)
        response.status(err.status).send({ error: err.message });
      else {
        response.status(500).send({ error: err });
      }
    }
  }

  
}

