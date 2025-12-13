import { Product } from "../../../document/product.document";
import { IProduct } from "@product";

class UpdateProductsProvider {
    static async updateProduct(id: string, updates: Partial<IProduct>) {
  // Block immutable / system-controlled fields
  const blockedFields = [
    "uid",
    "vendor",
    "stockForSale",
    "totalStockForRent",
    "currentRenter",
    "rentAvailability",
    "rentedTill"
  ];

  for (const field of blockedFields) {
    delete (updates as any)[field];
  }

  // Price validation
  if (
    updates.originalPrice &&
    updates.discountedPrice &&
    updates.discountedPrice > updates.originalPrice
  ) {
    throw new Error("Discounted price cannot exceed original price");
  }

  const product = await Product.findByIdAndUpdate(id, updates, { new: true });
  if (!product) throw new Error("Product not found");

  return product;
}

}

export default new UpdateProductsProvider();