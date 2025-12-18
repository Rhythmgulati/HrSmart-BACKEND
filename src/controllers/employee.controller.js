import Employee from "../models/employee.model";

const getEmployeeDashboardDetails = async (req, res) => {
    const employeeId = req.user._id;
    const employee = await Employee.findById(employeeId);
    if (!employee) {
        return ApiResponse.error(res, "Employee not found");
    }
    ApiResponse.success(res, "Employee details retrieved successfully", employee);
    // Implementation for getting employee details
};

const requestLeave = async (req, res) => {
    const employeeId = req.user._id;
    const { startDate, endDate, reason } = req.body;
    if (!startDate || !endDate || !reason) {
        return ApiResponse.error(res, "All fields are required");
    }
    const newLeave = new Leave({ employeeId, startDate, endDate, reason });
    await newLeave.save();
    ApiResponse.success(res, "Leave requested successfully", newLeave);
    // Implementation for requesting leave
};

const viewPayslip = async (req, res) => {
    const employeeId = req.user._id;
    const { month, year } = req.query;
    const salaryRecord = await Salary.findOne({
        employeeId,
        date: {
            $gte: new Date(year, month - 1, 1),
            $lt: new Date(year, month, 1)
        }
    });
    if (!salaryRecord) {
        return ApiResponse.error(res, "Payslip not found for the specified month and year");
    }
    ApiResponse.success(res, "Payslip retrieved successfully", salaryRecord);
    // Implementation for viewing payslip
};

export {
    getEmployeeDashboardDetails,
    requestLeave,
    viewPayslip
};