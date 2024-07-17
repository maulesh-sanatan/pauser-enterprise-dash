import { post } from "@/utils/axios";
import { baseUrl } from "@/utils/constansts";
import { Companyschema } from "@/validations/CompanyFormValidation";
import { useFormik } from "formik";
import { useRouter } from "next/router";

const Form = () => {
  const router = useRouter();

  async function CreateCompany(values) {
    const response = await post(`${baseUrl}/company`, values);

    const res = await response.json();
    console.log(res, "res");

    if (res.status === true) {
      alert("data added succesfully");
      router.push("/company/list");
      resetForm();
    }

    if (res.status === false) {
      alert(res.message);
    }
  }

  const initialvalues = {
    name: "",
    email: "",
    password: "",
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
    initialValues: initialvalues,
    enableReinitialize: true,
    validationSchema: Companyschema,

    onSubmit: (values) => {
      console.log(values, "values of company");
      const data = {
        ...values,
      };

      console.log(data, "data onchange");
      CreateCompany(data);
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
        <div className="lg:w-[300px] sm:w-0"></div>

        <div className="flex-1 ">
          <div style={{ backgroundColor: "#fef1eb" }} className="lg:h-[77px] md:h-[66px] border shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl mt-3 ms-7 mr-7 border-b border-gray-200 px-6 py-3">
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

          <div style={{ backgroundColor: "#fef1eb" }} className="mt-14 ms-7 mr-7  shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl border border-gray-200    ">
            <div className="flex p-6 justify-between">
              <h3
                className="font-semibold ms-2 text-xl "
                style={{ color: "#566A7F" }}
              >
                Add Company
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
                  <div classN style={{ backgroundColor: "#fef1eb" }}ame="mt-3">
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

                  <div className="mt-3">
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
                  </div>
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
                    <input
                      id="domain"
                      name="domain"
                      type="text"
                      value={values.domain}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-md  block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                      placeholder="Username"
                    />
                    <div>
                      {touched.domain && errors.domain && (
                        <p className="text-rose-500">{errors.domain}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <label
                      htmlFor="username"
                      className=" text-sm"
                      style={{ color: "#566A7F" }}
                    >
                      COMPANY IDENTITY
                    </label>
                    <input
                      id="company_identity"
                      name="company_identity"
                      type="text"
                      value={values.company_identity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-md  block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                      placeholder="Company Identity"
                    />
                    <div>
                      {touched.domain && errors.domain && (
                        <p className="text-rose-500">{errors.domain}</p>
                      )}
                    </div>
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

export default Form;
