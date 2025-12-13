import { Product } from "../../../document/product.document";


class addImageProvider {
    static async addImage(id: string, url: string) {
        if (!url || typeof url !== "string")
            throw new Error("Invalid image URL");

        const product = await Product.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { $addToSet: { images: url } }, // prevents duplicates
            { new: true }
        );

        if (!product) throw new Error("Product not found");
        return product;
    }

}
export default new addImageProvider();
