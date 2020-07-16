import BaseDatabase from "../data/BaseDatabase";
import { Music } from "../models/Music";

export class MusicDataBase extends BaseDatabase {
  public async createMusic(music: Music) {
    await this.getConnection()
      .insert({
        id: music.id,
        name: music.name,
        id_album: music.id_album,
      })
      .into(MusicDataBase.TABLE_MUSICS);
  }

  public async getMusicByName(name: string) {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(MusicDataBase.TABLE_MUSICS)
        .where({ name });

      return result[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
