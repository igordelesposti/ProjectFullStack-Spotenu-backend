import BaseDataBase from "./BaseDatabase";
import { User, Band, UserAdministrator } from "../models/User";
import CustomError from "../err/CustomError";

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

  public async signupBand(user: Band) {
    await this.getConnection()
      .insert({
        id: user.id,
        name: user.name,
        email: user.email,
        nickname: user.nickname,
        password: user.password,
        type: user.type,
        description: user.description,
        isApproved: user.isApproved
      })
      .into(UserDatabase.TABLE_NAME);
  }

  public async signupAdministrator(user: UserAdministrator) {
    try{
      await this.getConnection()
      .insert({
        id: user.id,
        name: user.name,
        email: user.email,
        nickname: user.nickname,
        password: user.password,
      })
      .into(UserDatabase.TABLE_NAME);
    }catch(error){
      throw new error.message
    }
  }

  public async approveBand(id: string): Promise<void>{
    await this.getConnection().raw(`
      UPDATE ${UserDatabase.TABLE_NAME}
      SET is_approved = 1
      WHERE id = "${id}
    `)
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .where({ email })
      .from(UserDatabase.TABLE_NAME);
    return result[0];
  }
}
