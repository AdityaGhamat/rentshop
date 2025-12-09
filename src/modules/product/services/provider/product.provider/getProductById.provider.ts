import { Product } from "../../../document/product.document";
import mongoose from "mongoose";

class GetProductByIdProvider {
        static async getProductById(id: string) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid product ID");
            }
    
            const product = await Product.findById(id)
                .populate("vendor", "name email")
                .lean();
    
            if (!product) {
                throw new Error("Product not found");
            }
    
            return product;
        }

}

export default new GetProductByIdProvider();