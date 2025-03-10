
import express from 'express';
import { ProductControllers } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { insertProductValidationSchema } from './product.validations';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

// Products
// i.	GET /api/products - Fetch all products
// ii.	GET /api/products/:id - Fetch product details
// iii.	POST /api/products/new - Create a new product (Admin)
// iv.	PUT /api/products/:id – Update a product (Admin)
// v.	DELETE /api/product/:id – Delete a product (Admin)




const router = express.Router();




// insert product
router.post(
    '/new',
    
    auth(USER_ROLE.admin),
    validateRequest(insertProductValidationSchema),
    ProductControllers.insertProduct
  );


// get alll products
router.get('/', ProductControllers.getAllProduct);









export const ProductRoutes = router;
