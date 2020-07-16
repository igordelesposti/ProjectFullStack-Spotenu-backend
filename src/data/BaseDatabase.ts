import knex from "knex";
import Knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export default abstract class BaseDatabase {
  private static connection: Knex | null = null;

  public static readonly TABLE_NAME: string = "spotenu_users";
  public static readonly TABLE_GENRE: string = "spotenu_genre";
  public static readonly TABLE_ALBUMS: string = "spotenu_albums";
  public static readonly TABLE_ALBUMS_GENRE: string = "spotenu_albuns_genre";
  public static readonly TABLE_MUSICS: string = "spotenu_musics"

  protected getConnection(): Knex {
    if (!BaseDatabase.connection) {
      BaseDatabase.connection = knex({
        client: "mysql",
        connection: {
          host: process.env.DB_HOST,
          port: 3306,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE_NAME,
        },
      });
    }

    return BaseDatabase.connection;
  }

  public static async destroyConnection(): Promise<void> {
    if (BaseDatabase.connection) {
      await BaseDatabase.connection.destroy();
      BaseDatabase.connection = null;
    }
  }
}