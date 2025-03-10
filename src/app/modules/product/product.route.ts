
import express from 'express';
import { ProductControllers } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { insertProductValidationSchema, updateProductValidationSchema } from './product.validations';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';






const router = express.Router();


// detch single product
router.get(
  '/:id',
  ProductControllers.getSingleProduct,
);

// delete product
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  ProductControllers.deleteProduct
);

// update product
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(updateProductValidationSchema),
  ProductControllers.updateProduct,
);




// get alll products
router.get('/', ProductControllers.getAllProduct);

// insert product
router.post(
    '/new',
    auth(USER_ROLE.admin),
    validateRequest(insertProductValidationSchema),
    ProductControllers.insertProduct
  );








export const ProductRoutes = router;
