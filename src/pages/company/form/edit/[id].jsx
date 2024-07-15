import { put } from "@/utils/axios";
import { EditCompanyschema } from "@/validations/EditCompanyValidation";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditForm = () => {
  const [companyObject, setCompanyObject] = useState();

  const router = useRouter();
  const { id } = router.query;

  console.log(id, "id");

  const editCompany = async (values) => {
    console.log(values, "values for edit company");

    const response = await put(`/api/company?id=${id}`, values);

    const res = await response.json();
    console.log(res, "editres");
    if (res.status === true) {
      router.push("/company/list");
    }
  };
  useEffect(() => {
    try {
      (async () => {
        console.log(id);
        const response = await fetch(`/api/company/edit/${id}`);
        const res = await response.json();
        console.log(res, "response");
        setCompanyObject(res.data, "Company object res");
      })();
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  console.log(companyObject);
  const formState = {
    name: companyObject?.company_name || "",
    contact_no: companyObject?.contact_no || "",
    email: companyObject?.email || "",
    username: companyObject?.username || "",
    domain: companyObject?.domain_name || "",
  };
  console.log(formState, "formState");
  const initialvalues = {
    name: "",
    email: "",
    password: "",
    contact_no: "",
    username: "",
  };
  const {
    errors,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    resetForm,
  } = useFormik({
    initialValues: formState,
    enableReinitialize: true,
    validationSchema: EditCompanyschema,

    onSubmit: (values) => {
      console.log(values, "values of company");
      const data = {
        ...values,
      };

      editCompany(data);
    },
  });
  const CancleFun = () => {
    router.push("/company/list");
  };

  return (
    <div
    style={{ backgroundColor: "#fef1eb" }}
      className=" min-h-screen"
    >
      <div className="flex">
        <div className="lg:w-[300px]   sm:w-0"></div>

        <div className="flex-1 ">
          <div style={{ backgroundColor: "#fef1eb" }} className="lg:h-[77px] md:h-[66px] border shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl mt-3 ms-7 mr-7  border-b border-gray-200 px-6 py-3">
            <div className="flex justify-between">
              {" "}
              <div className="flex   ml-12 md:ml-10 sm:ml-10 lg:ml-0 lg:mt-0 font-bold ">
                <p
                  style={{ color: "#697A8D" }}
                  className="text-xl mt-3 text-[15px] "
                >
                  Companies
                </p>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "#fef1eb" }} className="mt-14 ms-7 mr-7  shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl border border-gray-200   ">
            <div className="flex p-6 justify-between">
              <h3
                className="font-semibold ms-2 text-xl "
                style={{ color: "#566A7F" }}
              >
                Edit Company
              </h3>
              <p style={{ color: "#A1ACB8" }}>Defalt label</p>
            </div>
            <div className="p-7 -mt-4">
              <form
                onSubmit={handleSubmit}
                method="POST"
                enctype="multipart/form-data"
              >
                <div>
                  <div>
                    <label
                      htmlFor="name"
                      className=" text-sm"
                      style={{ color: "#566A7F" }}
                    >
                      COMPANY NAME
                    </label>
                    <div className="">
                      <input
                        id="name"
                        name="name"
                        type="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="name"
                        required
                        className="appearance-none rounded-md  block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                        placeholder="Company name"
                      />
                      <div>
                        {touched.name && errors.name && (
                          <p className="text-rose-500">{errors.name}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="email"
                      className=" text-sm"
                      style={{ color: "#566A7F" }}
                    >
                      EMAIL
                    </label>
                    <div className="">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="email"
                        required
                        className="appearance-none rounded-md  block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                        placeholder="Email"
                      />
                      <div>
                        {touched.email && errors.email && (
                          <p className="text-rose-500">{errors.email}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <div className="mt-3">
                    <label
                      htmlFor="password"
                      className=" text-sm"
                      style={{ color: "#566A7F" }}
                    >
                      PASSWORD
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-md  block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                    <div>
                      {touched.password && errors.password && (
                        <p className="text-rose-500">{errors.password}</p>
                      )}
                    </div>
                  </div> */}
                  <div className="mt-3">
                    <label
                      htmlFor="username"
                      className=" text-sm"
                      style={{ color: "#566A7F" }}
                    >
                      USERNAME
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-md  block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                      placeholder="Username"
                    />
                    <div>
                      {touched.username && errors.username && (
                        <p className="text-rose-500">{errors.username}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="username"
                      className=" text-sm"
                      style={{ color: "#566A7F" }}
                    >
                      DOMAIN NAME
                    </label>
                    <p>{formState?.domain}</p>
                  </div>

                  <div className=" ms-7 mt-5 flex">
                    <button
                      type="submit"
                      className="text-white bg-gradient-to-r bg-orange-500  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg  font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={CancleFun}
                      className="text-white bg-gradient-to-r bg-red-500  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg  font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2"
                    >
                      Cancle
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
