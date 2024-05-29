import { z } from "zod";

// Define the UserName schema
const UserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

// Define the Guardian schema
const GuardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNumber: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNumber: z.string().min(1),
});

// Define the LocalGuardian schema
const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1),
  contactNumber: z.string().min(1),
  occupation: z.string().min(1),
  address: z.string().min(1),
});

// Define the Student schema
const StudentValidationSchema = z.object({
  id: z.string().min(1),
  password: z.string().min(1).max(30),
  name: UserNameValidationSchema,
  gender: z.enum(["male", "female", "custom"]),
  dateOfBirth: z.string().min(1),
  email: z.string().email(),
  contactNumber: z.string().min(1),
  emergencyNumber: z.string().min(1),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
    .optional(),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
  profileImage: z.string().min(1),
  isActive: z.enum(["active", "inactive"]).optional(),
});
export default StudentValidationSchema;
// Now, you can use this StudentSchema for validation purposes.
