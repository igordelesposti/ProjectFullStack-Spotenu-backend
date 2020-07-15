import BaseDataBase from "./BaseDatabase";
import CustomError from "../err/CustomError";

export class BandDataBase extends BaseDataBase {
  public async getAllBands(type: string) {
    const result = await this.getConnection()
      .select("*")
      .from(BandDataBase.TABLE_NAME)
      .where({ type });

    return result;
  }

  public async approveBandDB(id: string) {
    const result = await this.getConnection()
      .select("*")
      .from(BandDataBase.TABLE_NAME)
      .where({ id });

    const data = result[0];

    if (data === undefined || null) {
      throw new CustomError("Essa banda não existe", 400);
    }

    if (data.isApproved === 1) {
      throw new CustomError("Essa banda já foi aprovada", 400);
    }

    await this.getConnection()
    .update({ isApproved: 1 })
    .where({ id })
    .into(BandDataBase.TABLE_NAME)
  }
}
