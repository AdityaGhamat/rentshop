import { Product } from "../../../document/product.document";


class GetProductByIdProvider {
        static async getProductByUID(uid: string) {
        const product = await Product.findOne({ uid })
            .populate("vendor", "name email")
            .lean();

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }
}
export default new GetProductByIdProvider();