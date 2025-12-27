import { asyncHandler } from "../services/asyncHandler.js";
import company from "../models/company.model.js";
import ApiResponse from "../services/responseHandler.js";
import user from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenService } from "../services/authService.js";
import Employee from "../models/employee.model.js";


const createCompany = asyncHandler(async (req, res) => {
    // Implementation for creating a company
    const { name, address, industry, phone, email, password } = req.body;
    console.log(req.body);

    if (!name || !address || !industry || !phone || !email || !password) {
        return ApiResponse.error(res, "All fields are required");
    };
    const existingCompany = await company.findOne({ email });
    if (existingCompany) {
        return ApiResponse.error(res, "Company with this email already exists", 400);
    }
    const newCompany = new company({ name, address, industry, phone, email });
    const newUser = new user({ companyId: newCompany._id, name, email, password, isAdmin: true });
    await newCompany.save();
    await newUser.save();


    ApiResponse.success(res, "Company created successfully", newCompany);

});

const registerUser = asyncHandler(async (req, res) => {
    // Implementation for user registration
    const { name, email, password, companyId } = req.body;

    if (!name || !email || !password || !companyId) {
        return ApiResponse.error(res, "All fields are required");
    };
    const existingUser = await user.findOne({ email });
    if (existingUser) {
        return ApiResponse.error(res, "User with this email already exists", 400);
    };
    const newUser = new user({ companyId, name, email, password });
    const employee = new Employee({ name, position: "New Hire", department: "Unassigned", salary: 0 , userId: newUser._id});
    await employee.save();
    await newUser.save();

    const token = await generateTokenService({ id: newUser._id });

    ApiResponse.success(res, { newUser, token }, "User registered successfully");

});

const loginUser = asyncHandler(async (req, res) => {
    // Implementation for user login
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
        return ApiResponse.error(res, "All fields are required");
    };
    const existingUser = await user.findOne({ email });
    console.log(existingUser);
    if (!existingUser) {
        return ApiResponse.error(res, "Invalid email ", 400);
    };

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        return ApiResponse.error(res, "Invalid email or password", 400);
    };

    const token = await generateTokenService({ id: existingUser._id , companyId: existingUser.companyId});

    ApiResponse.success(res, "User logged in successfully", { existingUser, token });
});


export { createCompany, registerUser, loginUser };