import { Document } from "mongoose";
export interface IAddress extends Document {
  uid: string;
  label?: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  owner: any;
}
