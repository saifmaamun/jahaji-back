import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductService } from "./product.service";


// Product insert By Admin
const insertProduct = catchAsync(async (req, res) => {
    console.log(req.body)
    
    const product = await ProductService.insertProductIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product added successfully. ',
      data: product,
    });
  });



// fetch All Products
const getAllProduct = catchAsync(async(req,res)=>{
 
    const products = await ProductService.getAllProductFromDB();

     // if no data found
  if (products.length == 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Available Products Found',
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: products,
  });
})

// fetch single Products
const getSingleProduct = catchAsync(async (req, res) => {
  // getting the facility by id from params
  const { id } = req.params;
  const result = await ProductService.getSingleProductById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched successfully',
    data: result,
  });
});

// update Single Product
const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ProductService.updateProductIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

// delete Product
const deleteProduct = catchAsync(async (req, res) => {
  // getting the facility by id from params
  const { id } = req.params;
  const result = await ProductService.deleteProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});












  export const ProductControllers = {
    insertProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
  };