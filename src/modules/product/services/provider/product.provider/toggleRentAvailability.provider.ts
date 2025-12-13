import { Product } from "../../../document/product.document";

class toggleRentAvailabilityProvider {
    static async toggleRentAvailability(id: string, value: boolean) {
        const product = await Product.findOne({ _id: id, isDeleted: false });
        if (!product) throw new Error("Product not found");

        if (value === true) {
            if (!product.isRentable)
                throw new Error("Product is not rentable");
            if (product.totalStockForRent <= 0)
                throw new Error("No rent stock available");
            if (product.currentRenter)
                throw new Error("Product is currently rented");
        }

        product.rentAvailability = value;
        return product.save();
    }

}

export default new toggleRentAvailabilityProvider();