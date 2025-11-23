import { authRoutes } from "../routes/auth.routes.js";
import { companyRoutes } from "../routes/company.routes.js";

export default async (app) => {
  // You can add more middleware here if needed
  app.use('/api/v1/company',companyRoutes);
  app.use('/api/v1/auth', authRoutes);
  console.log("Routes loaded");
}