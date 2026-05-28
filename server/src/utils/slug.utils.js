import slugify from "slugify";
export const generateSlug = (product) => {
    if (product.name) {
        product.name = product.name.trim();

        product.slug = slugify(product.name, {
            lower: true,
            strict: true,
            trim: true,
        });
    }
}