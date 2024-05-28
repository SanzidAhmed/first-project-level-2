import { Request, Response } from "express";
import { studentService } from "./student.service";
import StudentValidationSchema from "./student.validation";
// import studentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // data validation using jod

    const zodParseData = StudentValidationSchema.parse(studentData);

    // data validation using Joi
    // const { error, value } = studentValidationSchema.validate(studentData);
    const result = await studentService.createStudentIntoDB(zodParseData);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "somthing went wrong",
    //     error: error.details,
    //   });
    // }
    // will call service function to send this data

    // send response
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "somthing went wrong",
      error: err,
    });
  }
};
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Students are retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.getStudentByIdFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Student are retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
