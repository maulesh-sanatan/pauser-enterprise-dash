import * as Yup from "yup";

export const EditCompanyschema = Yup.object().shape({
  name: Yup.string().required("Company name is required"),
  email: Yup.string()
  .email("Invalid email address")
  .required("Email is required"),
});
