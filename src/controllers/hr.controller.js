import { asyncHandler } from "../services/asyncHandler";
import ApiResponse from "../services/apiResponse";
import Employee from "../models/employee.model.js";
import User from "../models/user.model.js";
import Salary from "../models/salary.model.js";



const addEmployee = asyncHandler( async (req, res) => {
    // Implementation for adding an employee
    const { name, email , password , position, department, salary } = req.body;

    if(!name || !position || !department || !salary){
        return ApiResponse.error(res, "All fields are required");
    }
    const newEmployee = new Employee({ name, position, department, salary });
    const newUser = new User({email, password});
    await newUser.save();
    await newEmployee.save();   
    ApiResponse.success(res, "Employee added successfully", newEmployee);

});

const listAllEmployees = asyncHandler( async (req, res) => {
    // Implementation for listing all employees
    const employees = await Employee.find();
    ApiResponse.success(res, "Employees retrieved successfully", employees);

});

const viewEmployeeDetails =  asyncHandler(async (req, res) => {
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
    const { employeeId, amount } = req.body;
    if (!employeeId || !amount) {
        return ApiResponse.error(res, "Employee ID and amount are required");
    }
    const employee = await Employee.findById(employeeId);
    if (!employee) {
        return ApiResponse.error(res, "Employee not found");
    }
    // Here you would typically create a Salary record
    const salaryRecord = new Salary({ employeeId, amount });
    await salaryRecord.save();

    ApiResponse.success(res, "Salary added successfully");
};

export {
    addEmployee,
    addSalary,
    viewEmployeeDetails,
    updateEmployeeInfo,
    removeEmployee,
    listAllEmployees,
    searchEmployees
};