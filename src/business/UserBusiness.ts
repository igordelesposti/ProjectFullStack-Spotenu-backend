import UserDatabase from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import {
  signUpDTO,
  User,
  loginDTO,
  signUpBandDTO,
  Band,
  signUpAdministratorDTO,
  UserAdministrator,
} from "../models/User";
import CustomError from "../err/CustomError";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

export default class UserBusiness {
  public async signUp({ name, email, nickname, password, type }: signUpDTO) {
    const userDatabase = new UserDatabase();

    const userExist = await userDatabase.getUserByEmail(email);

    if (userExist) throw new CustomError("Email já em uso.", 400);

    if (!name || !email || !nickname || !password || !type) {
      throw new CustomError("Preencha os campos para prosseguir.", 400);
    }
    if (email.indexOf("@") === -1) {
      throw new CustomError("Email inválido", 400);
    }

    if (!password || password.length < 6) {
      throw new CustomError(
        "Favor inserir no mínimo 6 caracteres para sua senha.",
        400
      );
    }

    const id = new IdGenerator().generate();

    const hashedPassword = await new HashManager().hash(password);

    const userData: User = {
      id,
      name,
      email,
      nickname,
      password: hashedPassword,
      type,
      isApproved: true,
    };

    const accessToken = new Authenticator().generateToken({ id });

    await userDatabase.signup(userData);

    return { accessToken };
  }

  public async signUpBand({
    name,
    email,
    nickname,
    password,
    type,
    description,
    isApproved,
  }: signUpBandDTO) {
    const userDatabase = new UserDatabase();

    const userExist = await userDatabase.getUserByEmail(email);

    if (userExist) throw new CustomError("Email já em uso.", 400);

    if (!password || password.length < 6) {
      throw new CustomError(
        "Favor inserir no mínimo 6 caracteres para sua senha.",
        400
      );
    }

    const id = new IdGenerator().generate();

    const hashedPassword = await new HashManager().hash(password);

    const userData: Band = {
      id,
      name,
      email,
      nickname,
      password: hashedPassword,
      type: "band",
      description,
      isApproved: false,
    };

    const accessToken = new Authenticator().generateToken({ id });

    await userDatabase.signupBand(userData);

    return {
      message: "Banda cadastrada com sucesso, favor aguardar aprovação.",
    };
  }

  public async signUpAdministrator({
    name,
    email,
    nickname,
    password,
    isApproved,
  }: signUpAdministratorDTO) {
    const userDatabase = new UserDatabase();

    const userExist = await userDatabase.getUserByEmail(email);

    if (userExist) throw new CustomError("Email já em uso.", 400);

    if (!name || !email || !nickname || !password) {
      throw new CustomError("Preencha os campos para prosseguir.", 400);
    }
    if (email.indexOf("@") === -1) {
      throw new CustomError("Email inválido", 400);
    }

    if (!password || password.length < 10) {
      throw new CustomError(
        "Favor inserir no mínimo 6 caracteres para sua senha.",
        400
      );
    }

    const id = new IdGenerator().generate();

    const hashedPassword = await new HashManager().hash(password);

    const userData: UserAdministrator = {
      id,
      name,
      email,
      nickname,
      password: hashedPassword,
      type: "admin",
      isApproved: true,
    };

    const accessToken = new Authenticator().generateToken({
      id,
      type: userData.type,
    });

    await userDatabase.signupAdministrator(userData);

    return {
      accessToken,
    };
  }

  public async login({ email, password, type }: loginDTO) {
    const userDatabase = new UserDatabase();

    const user = await userDatabase.getUserByEmail(email);

    if (!user) throw new CustomError("Email ou password está incorreto", 400);

    if (!user.isApproved) throw new CustomError("Essa banda ainda não foi aprovada.", 400)

    const correctPassword = await new HashManager().compare(
      password,
      user.password
    );

    if (!correctPassword) throw new CustomError("Password está incorreto", 400);

    const accessToken = new Authenticator().generateToken({
      id: user.id,
      type: user.type,
    });

    return { accessToken };
  }
}
