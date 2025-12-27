import express from 'express';

const router = express.Router();

import {
    getEmployeeDashboardDetails,
    requestLeave,
    viewPayslip
} from '../controllers/employee.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';


router.get('/me', verifyJwt, getEmployeeDashboardDetails); //done
router.post('/leave', verifyJwt, requestLeave);  //done
router.get('/payslip', verifyJwt, viewPayslip);

export { router as employeeRoutes };