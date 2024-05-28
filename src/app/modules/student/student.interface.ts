import { Model } from "mongoose";

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
  isActive?: "active" | "inactive";
};

export type StudentMethods = {
  isUserExist(id: string): Promise<TStudent | null>;
};
export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>;
