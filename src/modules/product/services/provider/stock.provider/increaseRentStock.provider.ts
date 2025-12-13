import { Product } from "../../../document/product.document";

class increaseRentStockProvider {
    static async increaseRentStock(id: string, amount: number) {
        if (amount <= 0) throw new Error("Amount must be positive");

        const product = await Product.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { $inc: { totalStockForRent: amount } },
            { new: true }
        );

        if (!product) throw new Error("Product not found");
        return product;
    }

}

export default new increaseRentStockProvider();