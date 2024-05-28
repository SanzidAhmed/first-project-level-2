import { Student } from "../student.model";
import { TStudent } from "./student.interface";

const createStudentIntoDB = async (studentData: TStudent) => {
  // built in static methods
  // const result = await StudentModel.create(student);

  const student = new Student(studentData);
  if (await student.isUserExist(studentData.id)) {
    throw new Error("User already exists");
  }
  const result = await student.save();

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getStudentByIdFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const studentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getStudentByIdFromDB,
};
