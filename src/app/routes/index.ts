import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';

// import { AvailabilityRoutes } from '../modules/Availibility/availibility.route';

const router = Router();

const moduleRoutes = [
  // auth
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: '/products',
    route: AuthRoutes
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
