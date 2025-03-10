import { TProduct } from "./product.interface";
import { Product } from "./product.model";




// insert product by admin
const insertProductIntoDB = async (productData: TProduct) => {
  const product = await Product.create(productData);
  console.log(product)
  return product;
};


// fetch all product
const getAllProductFromDB= async()=>{
    const products = await Product.find({ isDeleted: { $ne: true } });
    
    return products
}


// fetch single product by ID
const getSingleProductById = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};


// updating the facility
const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// deleting the facility
const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndUpdate(id, {
    isDeleted: true,
  });
  return result;
};










export const ProductService = {
    insertProductIntoDB,
    getAllProductFromDB,
    getSingleProductById,
    updateProductIntoDB,
    deleteProductFromDB
  };
  