/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Api not found",
    error: "",
  });
};

export default notFound;
