import { musicDTO, Music } from "../models/Music";
import CustomError from "../err/CustomError";
import { MusicDataBase } from "../data/MusicDataBase";
import { IdGenerator } from "../services/IdGenerator";
import { AlbumDataBase } from "../data/AlbumDataBase";

export default class MusicBusiness {
  public async createMusic({ name, id_album }: musicDTO) {
    if (!name) {
      throw new CustomError("Preencha o campo para prosseguir.", 400);
    }

    const validationAlbum = await new AlbumDataBase().getAlbumById(id_album);
    if (!validationAlbum) {
      throw new CustomError("Album não existe.", 400);
    }

    const musicValidation = await new MusicDataBase().getMusicByName(name);
    if (musicValidation){
        throw new CustomError("Música já cadastrada no álbum.", 400)
    }

    new MusicDataBase();

    const id = new IdGenerator().generate();

    const musicData: Music = {
      id,
      name,
      id_album,
    };

    const result = await new MusicDataBase().createMusic(musicData);

    return { result };
  }
}
