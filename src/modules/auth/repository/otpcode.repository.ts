import { BaseRepository, ModelDoc } from "@/modules/core/repository";
import { IOtpCode, OtpCode } from "../document";
import { Model } from "mongoose";

class OtpCodeRepository extends BaseRepository<IOtpCode, Partial<IOtpCode>> {
  constructor() {
    super(OtpCode as unknown as Model<ModelDoc<IOtpCode>>);
  }
}

export default new OtpCodeRepository();
