import { Student } from "../student.model";
import { TStudent } from "./student.interface";

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("User already exists");
  }
  // built in static methods
  const result = await Student.create(studentData);
  // static methods

  // const student = new Student(studentData);
  // if (await student.isUserExist(studentData.id)) {
  //   throw new Error("User already exists");
  // }
  // const result = await student.save();

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getStudentByIdFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([
    {
      $match: { id: id },
    },
  ]);
  return result;
};
const deleteStudentByIdFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  deleteStudentByIdFromDB,
};
