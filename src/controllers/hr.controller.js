import { asyncHandler } from "../services/asyncHandler.js";
import ApiResponse from "../services/responseHandler.js";
import Employee from "../models/employee.model.js";
import User from "../models/user.model.js";
import Salary from "../models/salary.model.js";
import Leave from "../models/leave.model.js";


const getStats = asyncHandler(async (req, res) => {
    // Implementation for getting HR dashboard stats
    const companyId = req.user.companyId;
    const totalEmployees = await Employee.countDocuments({ companyId });
    // const totalLeaves = await Leave.countDocuments();
    // const pendingLeaves = await Leave.countDocuments({ status: 'Pending' });
    ApiResponse.success(res, "HR stats retrieved successfully", {
        totalEmployees,
        totalLeaves,
        pendingLeaves
    });
});


const addEmployee = asyncHandler(async (req, res) => {
    // Implementation for adding an employee
    const { name, email, password, position, department, salary } = req.body;

    if (!name || !position || !department || !salary) {
        return ApiResponse.error(res, "All fields are required");
    }
    const newUser = new User({ email, password });
    console.log(newUser);
    const newEmployee = new Employee({ name, position, department, salary });
    await newUser.save();
    await newEmployee.save();
    ApiResponse.success(res, "Employee added successfully", newEmployee);

});

const listAllEmployees = asyncHandler(async (req, res) => {
    // Implementation for listing all employees
    const companyId = req.user.companyId;
    const employees = await Employee.find({ companyId });
    ApiResponse.success(res, "Employees retrieved successfully", employees);

});

const viewEmployeeDetails = asyncHandler(async (req, res) => {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);
    if (!employee) {
        return ApiResponse.error(res, "Employee not found");
    }
    ApiResponse.success(res, "Employee details retrieved successfully", employee);
    // Implementation for viewing employee details
});

const updateEmployeeInfo = async (req, res) => {
    const employeeId = req.params.id;
    const updates = req.body;
    const employee = await Employee.findByIdAndUpdate(employeeId, updates, { new: true });
    if (!employee) {
        return ApiResponse.error(res, "Employee not found");
    }
    ApiResponse.success(res, "Employee updated successfully", employee);
    // Implementation for updating employee information
};

const removeEmployee = async (req, res) => {
    const employeeId = req.params.id;
    const employee = await Employee.findByIdAndDelete(employeeId);
    if (!employee) {
        return ApiResponse.error(res, "Employee not found");
    }
    ApiResponse.success(res, "Employee removed successfully");
    // Implementation for removing an employee
};

const searchEmployees = async (req, res) => {
    const { query } = req.query;
    const employees = await Employee.find({
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { position: { $regex: query, $options: 'i' } },
            { department: { $regex: query, $options: 'i' } },
        ]
    });
    ApiResponse.success(res, "Search results", employees);
    // Implementation for searching employees
};

const addSalary = async (req, res) => {
    // Implementation for adding salary
    const { employeeId, amount, duration } = req.body;
    if (!employeeId || !amount || !duration) {
        return ApiResponse.error(res, "Employee ID, amount, and duration are required");
    }
    const employee = await Employee.findById(employeeId);
    if (!employee) {
        return ApiResponse.error(res, "Employee not found");
    }
    // Here you would typically create a Salary record
    const salaryRecord = new Salary({ employeeId, amount, duration });
    await salaryRecord.save();

    ApiResponse.success(res, "Salary added successfully");
};

const viewLeaveRequests = async (req, res) => {
    // Implementation for viewing leave requests
    const status = req.query.status; // optional filter by status
    const filter = status ? { status } : {};
    const leaveRequests = await Leave.find(filter).populate('employeeId', 'name position department');
    ApiResponse.success(res, "Leave requests retrieved successfully", leaveRequests);

};

const approveLeaveRequest = async (req, res) => {
    // Implementation for approving leave request
    const leaveId = req.params.id;
    const leaveRequest = await Leave.findById(leaveId);
    if (!leaveRequest) {
        return ApiResponse.error(res, "Leave request not found");
    }
    leaveRequest.status = 'Approved';
    await leaveRequest.save();
    ApiResponse.success(res, "Leave request approved successfully", leaveRequest);
};

const rejectLeaveRequest = async (req, res) => {
    // Implementation for rejecting leave request
    const leaveId = req.params.id;
    const leaveRequest = await Leave.findById(leaveId);
    if (!leaveRequest) {
        return ApiResponse.error(res, "Leave request not found");
    }
    leaveRequest.status = 'Rejected';
    await leaveRequest.save();
    ApiResponse.success(res, "Leave request rejected successfully", leaveRequest);
};


export {
    addEmployee,
    addSalary,
    viewEmployeeDetails,
    updateEmployeeInfo,
    removeEmployee,
    listAllEmployees,
    searchEmployees,
    getStats,
    viewLeaveRequests,
    approveLeaveRequest,
    rejectLeaveRequest
};