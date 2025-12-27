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
import { verifyJwt } from '../middlewares/auth.middleware.js';

router.get('/stats', verifyJwt,getStats);  //done
router.post('/add-employee',verifyJwt, addEmployee); //done
router.put('/employee/:id',verifyJwt, updateEmployeeInfo); //done
router.delete('/employee/:id', verifyJwt, removeEmployee); //done
router.get('/employees/search', verifyJwt, searchEmployees); 
router.get('/employees', verifyJwt, listAllEmployees); //done
router.get('/employees/:id', verifyJwt, viewEmployeeDetails);  //done
router.post('/salaries', verifyJwt, addSalary); //done
router.get("/view-leave-requests", viewLeaveRequests); //done
router.post("/approve-leave-request/:id", approveLeaveRequest); //done
router.post("/reject-leave-request/:id", rejectLeaveRequest); //done   

export { router as hrRoutes };