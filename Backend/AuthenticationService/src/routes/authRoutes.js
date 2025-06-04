// authentication-service/src/routes/authRoutes.js
import { Router } from 'express';
import {
  signup,
  signin,
  validateToken,
  deleteUser,
  ping
} from '../controllers/authController.js';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/validate-token', validateToken);
router.get('/ping', ping);
router.delete('/user', deleteUser);

export default router;
