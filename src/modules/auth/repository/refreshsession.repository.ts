import { BaseRepository, ModelDoc } from "@/modules/core/repository";
import { IRefreshSession, RefreshSession } from "../document";
import { Model } from "mongoose";

class RefreshSessionRepository extends BaseRepository<
  IRefreshSession,
  Partial<IRefreshSession>
> {
  constructor() {
    super(RefreshSession as unknown as Model<ModelDoc<IRefreshSession>>);
  }
}
export default new RefreshSessionRepository();
