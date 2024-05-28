import Joi from "joi";

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/, { name: "capitalized" })
    .messages({
      "string.base": "First name must be a string",
      "string.empty": "First name is required",
      "string.max": "First name length must be at most 20 characters",
      "string.pattern.name": "First name must be capitalized",
      "string.pattern.base": "First name must be in capitalized format",
    }),
  middleName: Joi.string().trim(),
  lastName: Joi.string().required().trim().messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name is required",
  }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().trim(),
  fatherOccupation: Joi.string().required().trim(),
  fatherContactNumber: Joi.string().required().trim(),
  motherName: Joi.string().required().trim(),
  motherOccupation: Joi.string().required().trim(),
  motherContactNumber: Joi.string().required().trim(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  contactNumber: Joi.string().required().trim(),
  occupation: Joi.string().required().trim(),
  address: Joi.string().required().trim(),
});

// Define the Joi schema for the student
const studentValidationSchema = Joi.object({
  id: Joi.string().required().trim(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid("male", "female", "custom").required().trim(),
  dateOfBirth: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  contactNumber: Joi.string().required().trim(),
  emergencyNumber: Joi.string().required().trim(),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-")
    .trim(),
  presentAddress: Joi.string().required().trim(),
  permanentAddress: Joi.string().required().trim(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImage: Joi.string().required().trim(),
  isActive: Joi.string().valid("active", "inactive").default("active"),
});

export default studentValidationSchema;
