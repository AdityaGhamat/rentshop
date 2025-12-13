import { Product } from "../../../document/product.document";


class DecreaseRentStockProvider {

    static async decreaseRentStock(id: string, amount: number) {
        if (amount <= 0) throw new Error("Amount must be positive");

        const product = await Product.findOneAndUpdate(
            {
                _id: id,
                totalStockForRent: { $gte: amount },
                isDeleted: false
            },
            { $inc: { totalStockForRent: -amount } },
            { new: true }
        );

        if (!product) {
            throw new Error("Insufficient rent stock or product not found");
        }

        return product;
    }

}

export default new DecreaseRentStockProvider();