import { Product } from "../../../document/product.document";



class ApplyDiscountProvider {
    static async applyDiscount(id: string, newPrice: number) {
  if (newPrice <= 0) throw new Error("Price must be greater than 0");

  const product = await Product.findOne({ _id: id, isDeleted: false });
  if (!product) throw new Error("Product not found");

  if (newPrice >= product.originalPrice)
    throw new Error("Discounted price must be lower than original price");

  product.discountedPrice = newPrice;
  return product.save();
}

}
export default new ApplyDiscountProvider();