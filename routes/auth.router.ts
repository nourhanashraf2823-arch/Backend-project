import {Router} from 'express';
import{register,login}from '../controllers/auth.controller';
const router=Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 */
router.post('/register',register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 */
router.post('/login',login);
export default router;