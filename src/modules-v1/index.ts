import { Router } from 'express';
import { setupControllers } from '../lib/core/httpSetup';
import TrController from './tr/tr.controller';
import AuthController from './auth/auth.controller';


const router = Router();

setupControllers(router, [AuthController, TrController]);


export default router;
