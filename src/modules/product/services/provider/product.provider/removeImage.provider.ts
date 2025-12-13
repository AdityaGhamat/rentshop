import { Product } from "../../../document/product.document";


class removeImageProvider {
    static async removeImage(id: string, url: string) {
        if (!url || typeof url !== "string")
            throw new Error("Invalid image URL");

        const product = await Product.findOne({ _id: id, isDeleted: false });
        if (!product) throw new Error("Product not found");

        if (product.images.length <= 1)
            throw new Error("Product must have at least one image");

        product.images = product.images.filter(img => img !== url);
        return product.save();
    }

}

export default new removeImageProvider();