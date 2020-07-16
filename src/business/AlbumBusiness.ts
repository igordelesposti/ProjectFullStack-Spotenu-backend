import { IdGenerator } from "../services/IdGenerator";
import { albumDTO, Album } from "../models/Album";
import { AlbumDataBase } from "../data/AlbumDataBase";
import CustomError from "../err/CustomError";

export default class AlbumBusiness {
  public async createAlbum({ name, created_by, id_genre }: albumDTO) {
    if (!name ) {
      throw new CustomError("Preencha os campos para prosseguir.", 400);
    }
    const albumDatabase = new AlbumDataBase();

    const id = new IdGenerator().generate();

    const albumData: Album = {
      id,
      name,
      created_by,
      id_genre,
    };

    const result = await new AlbumDataBase().createAlbum(albumData);

    return { result };
  }
}
