import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.getStudentByIdFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Student are retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await studentService.getAllStudentsFromDB();
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

const deleteSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.deleteStudentByIdFromDB(studentId);
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

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
