import express from "express";

export default async (app) => {
  // You can add more middleware here if needed
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
    });
});

  console.log("Middleware loaded");
};