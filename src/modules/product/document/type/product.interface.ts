import { Document, Types } from "mongoose";

export interface IProductDescription extends Document {
  text: string;
  fabric?: string;
  brand?: string;
  category?: string;
  inStock?: boolean; // your requested field
}

export interface IProduct extends Document {
  uid: string;

  title: string;
  images: string[];

  description: IProductDescription;

  size: string;
  color: string;

  vendor: Types.ObjectId;

  // Pricing
  originalPrice: number;
  discountedPrice: number;

  // For sale:
  stockForSale: number;
  priceForSale: number;

  // For rent:
  isRentable: boolean;
  rentPricePerDay?: number;
  depositAmount?: number;

  rentAvailability?: boolean;
  currentRenter?: string | null;
  rentedTill?: Date | null;
  totalStockForRent?: number;

  createdAt?: Date;
  updatedAt?: Date;
}
