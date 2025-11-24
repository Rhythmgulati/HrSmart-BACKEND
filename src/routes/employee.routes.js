import express from 'express';

const router = express.Router();

import {
    getEmployeeDetails,
    requestLeave,
    viewPayslip
} from '../controllers/employee.controller.js';


router.get('/me', getEmployeeDetails);
router.post('/leave', requestLeave);
router.get('/payslip', viewPayslip);

export { router as employeeRoutes};