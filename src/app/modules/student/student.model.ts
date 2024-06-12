import { Schema, model } from "mongoose";

import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name must be provided"],
    maxlength: [20, "Maximum length will 20 letter"],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toLocaleUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: "{VALUE} is not capitalized format",
    },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, "Last name must be provided"],
    trim: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name must be provided"],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation must be provided"],
    trim: true,
  },
  fatherContactNumber: {
    type: String,
    required: [true, "Father's contact number must be provided"],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "Mother's name must be provided"],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation must be provided"],
    trim: true,
  },
  motherContactNumber: {
    type: String,
    required: [true, "Mother's contact number must be provided"],
    trim: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name must be provided"],
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, "Local guardian's contact number must be provided"],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation must be provided"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Local guardian's address must be provided"],
    trim: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, "Student ID must be provided"],
      unique: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID must be provided"],
      unique: true,
      ref: "User",
    },
    name: {
      type: userNameSchema,
      required: [true, "Student's name must be provided"],
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "custom"],
      required: [true, "Gender must be provided"],
      trim: true,
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of birth must be provided"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email must be provided"],
      unique: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number must be provided"],
      trim: true,
    },
    emergencyNumber: {
      type: String,
      required: [true, "Emergency contact number must be provided"],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      trim: true,
    },
    presentAddress: {
      type: String,
      required: [true, "Present address must be provided"],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address must be provided"],
      trim: true,
    },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian information must be provided"],
      trim: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, "Local guardian information must be provided"],
      trim: true,
    },
    profileImage: {
      type: String,
      required: [true, "Profile image must be provided"],
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// virtual

studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// query middleware / hooks

studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({
    $match: { isDeleted: { $ne: true } },
  });
  next();
});

// creating custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
