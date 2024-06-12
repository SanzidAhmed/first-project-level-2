import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;
    // data validation using jod

    // const zodParseData = StudentValidationSchema.parse(studentData);

    // const { error, value } = studentValidationSchema.validate(studentData);
    const result = await userServices.createStudentIntoDB(
      password,
      studentData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
export const UserControllers = {
  createStudent,
};
