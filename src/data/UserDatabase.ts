import BaseDataBase from "./BaseDatabase";
import { User } from "../models/User";

export default class UserDatabase extends BaseDataBase {
  private static readonly TABLE_NAME: string = "spotenu_users";

  public async signup(user: User) {
    await this.getConnection()
      .insert({
        id: user.id,
        name: user.name,
        email: user.email,
        nickname: user.nickname,
        password: user.password,
        type: user.type
      })
      .into(UserDatabase.TABLE_NAME);
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .where({ email })
      .from(UserDatabase.TABLE_NAME);
    return result[0];
  }
}
