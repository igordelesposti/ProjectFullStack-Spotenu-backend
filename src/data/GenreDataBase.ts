import BaseDatabase from "./BaseDatabase";

export class GenreDataBase extends BaseDatabase {
  public async addGenre(id: string, name: string) {
    await this.getConnection()
      .insert({ id, name })
      .into(GenreDataBase.TABLE_GENRE);
  }

  public async getGenreByName(name: string) {
    const result = await this.getConnection()
      .select("*")
      .from(GenreDataBase.TABLE_GENRE)
      .where({ name });

    return result[0];
  }

  public async getAllGenres() {
    const result = await this.getConnection()
      .select("*")
      .from(GenreDataBase.TABLE_GENRE)
      

    return result;
  }
}
