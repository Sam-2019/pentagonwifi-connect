import * as yup from "yup";

export const registrationSchema = yup
  .object({
    fullName: yup
      .string()
      .required("Name is required.")
      .matches(/^[A-Za-z]+(?:\s[A-Za-z]{3,}){1,2}$/, "Name is invalid."),
    dateOfBirth: yup
      .date()
      .required("Date of birth is required.")
      .typeError("Invalid date"),
    phoneNumber: yup
      .string()
      .required("Phone number is required.")
      .matches(/^(?:\+?\d{7,15}|0\d{9})$/, "Phone number is invalid"),
    email: yup
      .string()
      .email()
      .required("Email is required.")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is invalid.",
      ),
    blockCourt: yup.string().required("Block / Court is required."),
    roomType: yup.string().required("Room Type is required"),
    roomNumber: yup.string().required("Room number is required."),
    selectedCard: yup.string().required("Card is required."),
    subscriptionPlan: yup.string(),
    isCustodian: yup.bool().default(false).required("Custodian is required"),
    userName: yup.string(),
    // .required("Username is required.")
    // .matches(
    //   /^(?!.*__)(?!_)(?!.*_$)(?=.*[A-Za-z])(?=^[A-Za-z\d_]*\d{4}[A-Za-z\d_]*$)[A-Za-z\d_]+$/,
    //   "Username is invalid.",
    // ),
    password: yup.string().required("Password is required."),
    studentId: yup
      .string()
      .required("StudentID is required.")
      .matches(/^(109|11[0-5]|22[0-7])(?!00000)\d{5}$/, "StudentID is invalid")
      .length(8),
  })
  .required();

export const topupSchema = yup
  .object({
    phoneNumber: yup
      .string()
      .required("Phone number is required.")
      .matches(/^(?:\+?\d{7,15}|0\d{9})$/, "Phone number is invalid"),
    email: yup
      .string()
      .email()
      .required("Email is required.")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is invalid.",
      ),
    subscriptionPlan: yup.string().required("Subscription plan is required"),
    userName: yup
      .string()
      .required("Username is required.")
      .matches(
        /^(?!.*__)(?!_)(?!.*_$)(?=.*[A-Za-z])(?=^[A-Za-z\d_]*\d{4}[A-Za-z\d_]*$)[A-Za-z\d_]+$/,
        "Username is invalid.",
      ),
  })
  .required();

export const feedbackSchema = yup.object({
  fullName: yup
    .string()
    .required("Name is required.")
    .matches(/^[A-Za-z]+(?:\s[A-Za-z]{3,}){1,2}$/, "Name is invalid."),
  phoneNumber: yup
    .string()
    .required("Phone number is required.")
    .matches(/^(?:\+?\d{7,15}|0\d{9})$/, "Phone number is invalid"),
  category: yup.string().required("Category is required."),
  comment: yup.string().required("Comment is required."),
});
