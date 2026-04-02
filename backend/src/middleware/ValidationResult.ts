import type { Request, Response, NextFunction } from "express";
import { validationResult as expressValidationResult } from "express-validator";
import ResponseService from "../services/ResponseService.js";

class ValidationResult {
  handle() {
    return (req: Request, res: Response, next: NextFunction): void => {
      const result = expressValidationResult(req);
      if (!result.isEmpty()) {
        ResponseService.badRequest(res, result.array()[0].msg);
        return;
      }
      next();
    };
  }
}

export default new ValidationResult();
