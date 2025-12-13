import { Product } from "../../../document/product.document";
import { IProduct } from "@product";

class CreateProductProvider {
       static async createProduct(data: Partial<IProduct>) {
            // 1. Required fields
            const required: (keyof IProduct)[] = [
                "title",
                "images",
                "size",
                "color",
                "originalPrice",
                "discountedPrice",
            ];
    
            for (const field of required) {
                if (!data[field])
                    throw new Error(`${field} is required`);
            }
    
            // 2. Vendor check
            if (!data.vendor) throw new Error("Vendor is required");
    
            // 3. Description check
            if (!data.description?.text)
                throw new Error("Description.text is required");
    
            // 4. Validate pricing
            if (data.originalPrice! <= 0)
                throw new Error("originalPrice must be > 0");
    
            if (data.discountedPrice! <= 0)
                throw new Error("discountedPrice must be > 0");
    
            if (data.discountedPrice! > data.originalPrice!)
                throw new Error("discountedPrice cannot be greater than originalPrice");
    
            // 5. Validate images
            if (!Array.isArray(data.images) || data.images.length === 0)
                throw new Error("At least one product image is required");
    
            // 6. Rental validation
            if (data.isRentable) {
                if (!data.rentPricePerDay || !data.depositAmount) {
                    throw new Error("Rent price and deposit amount required when product is rentable");
                }
            }
    
            // 7. Create product
            const product = await Product.create(data);
            return product;
        }
}

export default new CreateProductProvider();