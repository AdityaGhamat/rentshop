import mongoose, { model, Schema } from "mongoose";
import { IProductDescription, IProduct } from "@product";
import { nanoid } from "nanoid";

const ProductDescriptionSchema = new Schema<IProductDescription>({
  text: { type: String, required: true },
  fabric: String,
  brand: String,
  category: String,
  inStock: { type: Boolean, default: true },
});

const ProductSchema = new Schema<IProduct>(
  {
    uid: {
      type: String,
      default: () => nanoid(12),
      unique: true,
      index: true,
      immutable: true,
    },
    title: { type: String, required: true },

    images: [{ type: String, required: true }],

    description: { type: ProductDescriptionSchema, required: true },
    isDeleted: { type: Boolean, default: false },


    size: { type: String, required: true },
    color: { type: String, required: true },

    vendor: { type: Schema.Types.ObjectId, ref: "User", required: true },

    // Pricing
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },

    // Sale
    stockForSale: { type: Number, default: 0 },
    priceForSale: { type: Number, default: 0 },

    // Rent
    isRentable: { type: Boolean, default: false },
    rentPricePerDay: Number,
    depositAmount: Number,

    rentAvailability: { type: Boolean, default: true },
    currentRenter: { type: Schema.Types.ObjectId, ref: "User", default: null },
    rentedTill: { type: Date, default: null },
    totalStockForRent: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", ProductSchema);