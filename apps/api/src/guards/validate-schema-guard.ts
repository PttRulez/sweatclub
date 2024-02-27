import express, { Request, Response, NextFunction } from "express";
import { z, AnyZodObject, ZodError } from "zod";

const validateSchema = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      return next();
    } catch (error) {
      const err: ZodError = (error as ZodError);
      
      if (err.formErrors) {
        return res.status(400).json(err.formErrors.fieldErrors);
      } else {
        return res.status(400).json(err.message);
      }
      
    }
};

export default validateSchema;