import { Product } from "../document/product.document";
import { IProduct, IProductDescription } from "@product";
import mongoose from "mongoose";

export class ProductService {

    /** -------------------------------
     *  CREATE PRODUCT
     * -------------------------------- */
    // static async createProduct(data: Partial<IProduct>) {
    //     // 1. Required fields
    //     const required: (keyof IProduct)[] = [
    //         "title",
    //         "images",
    //         "size",
    //         "color",
    //         "originalPrice",
    //         "discountedPrice",
    //     ];

    //     for (const field of required) {
    //         if (!data[field])
    //             throw new Error(`${field} is required`);
    //     }

    //     // 2. Vendor check
    //     if (!data.vendor) throw new Error("Vendor is required");

    //     // 3. Description check
    //     if (!data.description?.text)
    //         throw new Error("Description.text is required");

    //     // 4. Validate pricing
    //     if (data.originalPrice! <= 0)
    //         throw new Error("originalPrice must be > 0");

    //     if (data.discountedPrice! <= 0)
    //         throw new Error("discountedPrice must be > 0");

    //     if (data.discountedPrice! > data.originalPrice!)
    //         throw new Error("discountedPrice cannot be greater than originalPrice");

    //     // 5. Validate images
    //     if (!Array.isArray(data.images) || data.images.length === 0)
    //         throw new Error("At least one product image is required");

    //     // 6. Rental validation
    //     if (data.isRentable) {
    //         if (!data.rentPricePerDay || !data.depositAmount) {
    //             throw new Error("Rent price and deposit amount required when product is rentable");
    //         }
    //     }

    //     // 7. Create product
    //     const product = await Product.create(data);
    //     return product;
    // }


    /** -------------------------------
     *  GET PRODUCT BY ID / UID
     * -------------------------------- */
    // static async getProductById(id: string) {
    //     if (!mongoose.Types.ObjectId.isValid(id)) {
    //         throw new Error("Invalid product ID");
    //     }

    //     const product = await Product.findById(id)
    //         .populate("vendor", "name email")
    //         .lean();

    //     if (!product) {
    //         throw new Error("Product not found");
    //     }

    //     return product;
    // }





    // static async getProductByUID(uid: string) {
    //     const product = await Product.findOne({ uid })
    //         .populate("vendor", "name email")
    //         .lean();

    //     if (!product) {
    //         throw new Error("Product not found");
    //     }

    //     return product;
    // }

    /** -------------------------------
     *  LIST PRODUCTS WITH FILTERS
     * -------------------------------- */
    // static async listProducts(filters: any = {}, page = 1, limit = 20) {
    //     const query: any = {};

    //     if (filters.category) query["description.category"] = filters.category;
    //     if (filters.brand) query["description.brand"] = filters.brand;
    //     if (filters.search) query.title = { $regex: filters.search, $options: "i" };

    //     if (filters.minPrice || filters.maxPrice) {
    //         query.discountedPrice = {};
    //         if (filters.minPrice) query.discountedPrice.$gte = filters.minPrice;
    //         if (filters.maxPrice) query.discountedPrice.$lte = filters.maxPrice;
    //     }

    //     if (filters.onlyRentable) query.isRentable = true;

    //     return Product.find(query)
    //         .skip((page - 1) * limit)
    //         .limit(limit)
    //         .sort({ createdAt: -1 });
    // }

    /** -------------------------------
     *  UPDATE PRODUCT
     * -------------------------------- */
    static async updateProduct(id: string, updates: Partial<IProduct>) {
        delete updates.uid;
        delete updates.vendor;

        return Product.findByIdAndUpdate(id, updates, { new: true });
    }

    /** -------------------------------
     *  DELETE PRODUCT
     * -------------------------------- */
    static async deleteProduct(id: string) {
        return Product.findByIdAndDelete(id);
    }

    /** -------------------------------
     *  SALE STOCK MANAGEMENT
     * -------------------------------- */
    static async increaseSaleStock(id: string, amount: number) {
        return Product.findByIdAndUpdate(
            id,
            { $inc: { stockForSale: amount } },
            { new: true }
        );
    }

    static async decreaseSaleStock(id: string, amount: number) {
        const product = await Product.findById(id);
        if (!product) throw new Error("Product not found");
        if (product.stockForSale < amount)
            throw new Error("Insufficient sale stock");

        product.stockForSale -= amount;
        return product.save();
    }

    /** -------------------------------
     *  RENT STOCK MANAGEMENT
     * -------------------------------- */
    static async increaseRentStock(id: string, amount: number) {
        return Product.findByIdAndUpdate(
            id,
            { $inc: { totalStockForRent: amount } },
            { new: true }
        );
    }

    static async decreaseRentStock(id: string, amount: number) {
        const product = await Product.findById(id);
        if (!product) throw new Error("Product not found");
        if (product.totalStockForRent < amount)
            throw new Error("Insufficient rent stock");

        product.totalStockForRent -= amount;
        return product.save();
    }

    /** ----------------------------------
   *  BUY PRODUCT
   * ----------------------------------- */
    static async buyProduct(productId: string, quantity: number, buyerId: string) {
        if (quantity <= 0) throw new Error("Quantity must be greater than zero");

        const product = await Product.findById(productId);
        if (!product) throw new Error("Product not found");

        if (product.stockForSale <= 0)
            throw new Error("Product is out of stock");

        if (product.stockForSale < quantity)
            throw new Error(`Only ${product.stockForSale} units available`);

        // Compute price
        const unitPrice = product.discountedPrice;
        const totalPrice = unitPrice * quantity;

        // Reduce stock
        product.stockForSale -= quantity;
        await product.save();

        // TODO: order creation logic here (next step)
        return {
            productId: product._id,
            quantity,
            unitPrice,
            totalPrice,
            remainingStock: product.stockForSale,
        };
    }


    /** -------------------------------
     *  RENT PRODUCT
     * -------------------------------- */
    static async rentProduct(productId: string, userId: string, days: number) {
        const product = await Product.findById(productId);
        if (!product) throw new Error("Product not found");
        if (!product.isRentable) throw new Error("Product not rentable");
        if (!product.rentAvailability) throw new Error("Product already rented");
        if (product.totalStockForRent <= 0)
            throw new Error("No rent stock available");

        const rentedTill = new Date();
        rentedTill.setDate(rentedTill.getDate() + days);

        product.currentRenter = new mongoose.Types.ObjectId(userId);
        product.rentedTill = rentedTill;
        product.rentAvailability = false;

        return product.save();
    }

    /** -------------------------------
     *  RETURN RENTED PRODUCT
     * -------------------------------- */
    static async returnRentedProduct(productId: string) {
        const product = await Product.findById(productId);
        if (!product) throw new Error("Product not found");

        product.currentRenter = null;
        product.rentedTill = null;
        product.rentAvailability = true;

        return product.save();
    }

    /** -------------------------------
     *  APPLY DISCOUNT
     * -------------------------------- */
    static async applyDiscount(id: string, newPrice: number) {
        const product = await Product.findById(id);
        if (!product) throw new Error("Product not found");
        if (newPrice >= product.originalPrice)
            throw new Error("Discounted price must be lower than original");

        product.discountedPrice = newPrice;
        return product.save();
    }

    /** -------------------------------
     *  IMAGE MANAGEMENT
     * -------------------------------- */
    static async addImage(id: string, url: string) {
        return Product.findByIdAndUpdate(
            id,
            { $push: { images: url } },
            { new: true }
        );
    }

    static async removeImage(id: string, url: string) {
        return Product.findByIdAndUpdate(
            id,
            { $pull: { images: url } },
            { new: true }
        );
    }

    /** -------------------------------
     *  TOGGLE RENT AVAILABILITY
     * -------------------------------- */
    static async toggleRentAvailability(id: string, value: boolean) {
        return Product.findByIdAndUpdate(
            id,
            { rentAvailability: value },
            { new: true }
        );
    }
}
