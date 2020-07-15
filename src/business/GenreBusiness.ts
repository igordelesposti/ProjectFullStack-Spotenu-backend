import { GenreDataBase } from "../data/GenreDataBase";
import CustomError from "../err/CustomError";
import { Genre, genreDTO } from "../models/Genre";
import { IdGenerator } from "../services/IdGenerator";

export default class GenreBusiness {
  public async addGenre({ name }: genreDTO) {
    if (!name) {
      throw new CustomError("Favor preencher um gênero.", 400);
    }

    const genreDataBase = new GenreDataBase();

    const genreExist = await genreDataBase.getGenreByName(name);

    if (genreExist) throw new CustomError("Gênero já existe.", 400);

    const id = new IdGenerator().generate();

    const genreData: Genre = {
      id,
      name,
    };

    const result = await new GenreDataBase().addGenre(
      genreData.id,
      genreData.name
    );

    return { result };
  }
}
