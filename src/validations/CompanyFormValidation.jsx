import * as Yup from "yup";

export const Companyschema = Yup.object().shape({
  name: Yup.string().required("Company name is required"),
  domain: Yup.string().required("Domain name is required"),
  username: Yup.string()
    .matches(/^\S*$/, "Username cannot contain spaces")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z!@#$%^&*0-9]+$/,
      "Password must contain at least one alphabet character and one special character"
    ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
