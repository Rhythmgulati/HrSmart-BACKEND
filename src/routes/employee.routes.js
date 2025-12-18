import express from 'express';

const router = express.Router();

import {
    getEmployeeDashboardDetails,
    getEmployeeDetails,
    requestLeave,
    viewPayslip
} from '../controllers/employee.controller.js';


router.get('/me', getEmployeeDashboardDetails);
router.post('/leave', requestLeave);
router.get('/payslip', viewPayslip);

export { router as employeeRoutes };