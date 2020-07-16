import BaseDataBase from "./BaseDatabase";
import { Album } from "../models/Album";
import BaseDatabase from "./BaseDatabase";
import CustomError from "../err/CustomError";

export class AlbumDataBase extends BaseDataBase {
  public async createAlbum(album: Album) {
    await this.getConnection()
      .insert({
        id: album.id,
        name: album.name,
        created_by: album.created_by,
      })
      .into(AlbumDataBase.TABLE_ALBUMS);

    await this.getConnection()
      .insert({
        id_album: album.id,
        id_genre: album.id_genre,
      })
      .into(AlbumDataBase.TABLE_ALBUMS_GENRE);
  }

  public async getAlbumById(id: string) {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(AlbumDataBase.TABLE_ALBUMS)
        .where({ id });

      return result[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
