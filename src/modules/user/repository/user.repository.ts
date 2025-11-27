import { BaseRepository, ModelDoc } from "@/modules/core/repository";
import { User, IUser } from "@user";
import { Model } from "mongoose";

export class UserRepository extends BaseRepository<IUser, Partial<IUser>> {
  constructor() {
    super(User as unknown as Model<ModelDoc<IUser>>);
  }
}
export default new UserRepository();
