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
    viewLeaveRequests,
    approveLeaveRequest,
    rejectLeaveRequest,
    getStats
} from '../controllers/hr.controller.js';

router.get('/stats', getStats);
router.post('/employees', addEmployee);
router.put('/employees/:id', updateEmployeeInfo);
router.delete('/employees/:id', removeEmployee);
router.get('/employees/search', searchEmployees);
router.get('/employees', listAllEmployees);
router.get('/employees/:id', viewEmployeeDetails);
router.post('/salaries', addSalary);
router.get("/view-leave-requests", viewLeaveRequests);
router.post("/approve-leave-request/:id", approveLeaveRequest);
router.post("/reject-leave-request/:id", rejectLeaveRequest);

export { router as hrRoutes };