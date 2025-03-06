import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ProductRoutes } from '../modules/product/product.route';


const router = Router();

const moduleRoutes = [
  // Products Route
  {
      path: '/products',
      route: ProductRoutes
    },
    
    // auth
    {
      path: '/auth',
      route: AuthRoutes
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
