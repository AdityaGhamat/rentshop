import { Schema, model, startSession } from "mongoose";
import { IAddress } from "./type";
import { nanoid } from "nanoid";

const addressSchema = new Schema<IAddress>({
  uid: {
    type: String,
    default: () => nanoid(12),
    unique: true,
    index: true,
    immutable: true,
  },
  label: {
    type: String,
    required: false,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  isDefault: {
    type: Boolean,
  },
});

addressSchema.pre("save", async function (next) {
  const address = this as unknown as IAddress & {
    _id: Schema.Types.ObjectId;
    isNew: boolean;
    isModified: (path: string) => boolean;
  };

  if (!address.isNew && !address.isModified("isDefault")) {
    return next();
  }

  const AddressModel = model("Address");
  const UserModel = model("User");

  const session = await startSession();
  session.startTransaction();

  try {
    if (address.isDefault) {
      await AddressModel.updateMany(
        { owner: address.owner, _id: { $ne: address._id } },
        { $set: { isDefault: false } },
        { session }
      );

      await UserModel.updateOne(
        { _id: address.owner },
        { $set: { defaultAddress: address._id } },
        { session }
      );

      await session.commitTransaction();
      session.endSession();
      return next();
    }

    if (address.isNew && !address.isDefault) {
      const user = await UserModel.findById(address.owner).session(session);

      if (!user) {
        await session.abortTransaction();
        session.endSession();
        return next();
      }

      if (!user.defaultAddress) {
        address.isDefault = true;
        await UserModel.updateOne(
          { _id: address.owner },
          { $set: { defaultAddress: address._id } },
          { session }
        );
      }
    }

    await session.commitTransaction();
    session.endSession();
    return next();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return next(err as any);
  }
});

export const Address = model<IAddress>("Address", addressSchema);
