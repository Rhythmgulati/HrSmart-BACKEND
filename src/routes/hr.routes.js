import express from 'express';

const router = express.Router();

import {
    addEmployee,
    updateEmployeeInfo,
    removeEmployee,
    searchEmployees,
    listAllEmployees,
    viewEmployeeDetails,
    addSalary,
} from '../controllers/hr.controller.js';

router.post('/employees', addEmployee);
router.put('/employees/:id', updateEmployeeInfo);
router.delete('/employees/:id', removeEmployee);
router.get('/employees/search', searchEmployees);
router.get('/employees', listAllEmployees);
router.get('/employees/:id', viewEmployeeDetails);
router.post('/salaries', addSalary);

export { router as hrRoutes};