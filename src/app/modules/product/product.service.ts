import { TProduct } from "./product.interface";
import { Product } from "./product.models";




// insert product by admin
const insertProductIntoDB = async (productData: TProduct) => {
  const product = await Product.create(productData);
  console.log(product)
  return product;
};


// fetch all product
const getAllProductFromDB= async()=>{
    const products = await Product.find({ isDeleted: { $ne: true } });
    console.log(products)
    return products
}
















export const ProductService = {
    insertProductIntoDB,
    getAllProductFromDB,
  };
  