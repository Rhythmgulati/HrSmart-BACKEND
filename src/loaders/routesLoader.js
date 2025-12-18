import { authRoutes } from "../routes/auth.routes.js";
import { hrRoutes } from "../routes/hr.routes.js";
import { employeeRoutes } from "../routes/employee.routes.js";

export default async (app) => {
  // You can add more middleware here if needed
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/hr', hrRoutes);
  app.use('/api/v1/employee', employeeRoutes);
  console.log("Routes loaded");
}