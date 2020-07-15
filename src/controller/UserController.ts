import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";
import CustomError from "../err/CustomError";
import { Authenticator } from "../services/Authenticator";

export default class UserController {
  public async signUp(request: Request, response: Response) {
    const { name, email, nickname, password, type } = request.body;

    try {
      const accessToken = await new UserBusiness().signUp({
        name,
        email,
        nickname,
        password,
        type,
      });

      response.status(200).send({ accessToken });
    } catch (err) {
      if (err instanceof CustomError)
        response.status(err.status).send({ error: err.message });
      else {
        response.status(500).send({ error: err });
      }
    }
  }

  public async signUpBand(request: Request, response: Response) {
    const {
      name,
      email,
      nickname,
      password,
      type,
      description,
      isApproved,
    } = request.body;

    try {
      const accessToken = await new UserBusiness().signUpBand({
        name,
        email,
        nickname,
        password,
        type,
        description,
        isApproved,
      });

      response.status(200).send({ accessToken });
    } catch (err) {
      if (err instanceof CustomError)
        response.status(err.status).send({ error: err.message });
      else {
        response.status(500).send({ error: err });
      }
    }
  }

  public async signUpAdministrator(request: Request, response: Response) {
    const { name, email, nickname, password, type, isApproved } = request.body;
    try {
      const auth = request.headers.authorization as string;

      const authenticator = new Authenticator().getData(auth);

      if (authenticator.type !== "admin") {
        throw new CustomError("Você não é um admin.", 400);
      }

      const accessToken = await new UserBusiness().signUpAdministrator({
        name,
        email,
        nickname,
        password,
        type,
        isApproved,
      });

      response.status(200).send({ accessToken });
    } catch (err) {
      if (err instanceof CustomError)
        response.status(err.status).send({ error: err.message });
      else {
        response.status(500).send({ error: err });
      }
    }
  }

  public async login(request: Request, response: Response) {
    const { email, password, type } = request.body;

    try {
      const accessToken = await new UserBusiness().login({
        email,
        password,
        type,
      });


      response.status(200).send({ accessToken });
    } catch (err) {
      if (err instanceof CustomError)
        response.status(err.status).send({ error: err.message });
      else {
        response.status(500).send({ error: err });
      }
    }
  }
}
