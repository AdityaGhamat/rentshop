import { Product } from "../../../document/product.document";


class DeleteProductProvider {

    static async deleteProduct(id: string) {
  const product = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  if (!product) throw new Error("Product not found");
  return product;
}

}

export default new DeleteProductProvider();