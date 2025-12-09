import { Product } from "../../../document/product.document";


class ListProductsProvider {

    static async listProducts(filters: any = {}, page = 1, limit = 20) {
        const query: any = {
            isDeleted: false
        };

        // Category filter
        if (filters.category) query["description.category"] = filters.category;

        // Brand filter
        if (filters.brand) query["description.brand"] = filters.brand;

        // Search filter
        if (filters.search) {
            query.title = { $regex: filters.search, $options: "i" };
        }

        // Price filter
        if (filters.minPrice || filters.maxPrice) {
            query.discountedPrice = {};
            if (filters.minPrice) query.discountedPrice.$gte = Number(filters.minPrice);
            if (filters.maxPrice) query.discountedPrice.$lte = Number(filters.maxPrice);
        }

        // Rentable filter
        if (filters.onlyRentable) query.isRentable = true;

        // In stock filter
        if (filters.inStockOnly) query.stockForSale = { $gt: 0 };

        // Vendor filter (for dashboard)
        if (filters.vendorId) query.vendor = filters.vendorId;

        // Sorting
        const sort: any = {};
        if (filters.sortBy === "priceAsc") sort.discountedPrice = 1;
        else if (filters.sortBy === "priceDesc") sort.discountedPrice = -1;
        else sort.createdAt = -1; // default

        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            Product.find(query).skip(skip).limit(limit).sort(sort),
            Product.countDocuments(query)
        ]);

        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

}

export default new ListProductsProvider();