import { Model, Types } from "mongoose";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherContactNumber: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNumber: string;
  address: string;
};
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: "male" | "female" | "custom";
  dateOfBirth?: string;
  email: string;
  contactNumber: string;
  emergencyNumber: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isDeleted?: boolean;
};
// for creating static
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// for creating instance
// export type StudentMethods = {
//   isUserExist(id: string): Promise<TStudent | null>;
// };
// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
