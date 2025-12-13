import { Product } from "../../../document/product.document";


class DecreaseSaleStockProvider {
    static async decreaseSaleStock(id: string, amount: number) {
        if (amount <= 0) throw new Error("Amount must be positive");

        const product = await Product.findOneAndUpdate(
            {
                _id: id,
                stockForSale: { $gte: amount },
                isDeleted: false
            },
            { $inc: { stockForSale: -amount } },
            { new: true }
        );

        if (!product) {
            throw new Error("Insufficient stock or product not found");
        }

        return product;
    }

}

export default new DecreaseSaleStockProvider();