export type Guardian = {
  fatherName: string;
  fatherOcupation: string;
  fatherContactNumber: string;
  motherName: string;
  motherOcupation: string;
  motherContactNumber: string;
};

export type LocalGuardian = {
  name: string;
  ocupation: string;
  contactNumber: string;
  address: string;
};
export type UserName = {
  firstName: string;
  middleName: string;
  lastname: string;
};
export type Student = {
  id: string;
  name: UserName;
  gender: "male" | "female";
  dateOfBirth?: string;
  email: string;
  contactNumber: string;
  emmergencyNumber: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  presentAddress: string;
  permanentAddress: string;
  guardianAddress: Guardian;
  localGuardian: LocalGuardian;
  profileImage?: string;
  isActive: "active" | "inactive";
};
