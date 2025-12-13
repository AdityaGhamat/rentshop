import { Product } from "../../../document/product.document";


class IncreaseSaleStockProvider {

    static async increaseSaleStock(id: string, amount: number) {
        if (amount <= 0) throw new Error("Amount must be positive");

        const product = await Product.findByIdAndUpdate(
            id,
            { $inc: { stockForSale: amount } },
            { new: true }
        );

        if (!product) throw new Error("Product not found");
        return product;
    }

}
export default new IncreaseSaleStockProvider();