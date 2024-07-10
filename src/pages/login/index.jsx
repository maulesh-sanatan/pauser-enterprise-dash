import { post } from "@/utils/axios";
import { LogInschema } from "@/validations/LoginValidation";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";

const LogIn = () => {
  const router = useRouter();
  async function LoginUser(values) {
    console.log(values, "byvalues");

    const response = await post("/api/login", values);

    const res = await response.json();
    console.log(res, "res");

    if (res.status === true) {
      router.push("/dashboard");
      resetForm();
      localStorage.setItem("UserId", res.user.id);
      localStorage.setItem("Role", res.user.role);
      localStorage.setItem("Domain", res.user.domain_name);

      localStorage.setItem("Token", res.token);
    }

    if (res.status === false) {
      alert(res.message);
    }
  }
  const initialvalues = {
    email: "",
    password: "",
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
    validationSchema: LogInschema,

    onSubmit: (values) => {
      LoginUser(values);
    },
  });
  return (
    <div>
      <div
        style={{
          backgroundImage: 'url("/Images/loginback.png")',
          backgroundRepeat: "no-repat",
          backgroundSize: "cover",
        }}
        className=" min-h-screen  flex flex-col justify-center   sm:px-6 lg:px-8"
      >
        <div className=" flex justify-center sm:mx-auto sm:w-full sm:max-w-md">
          <div className="w-80 flex justify-center">
            <img src="/images/logo.png"></img>
          </div>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] py-4 px-4  sm:rounded-lg sm:px-10">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 mt-3"
              action="#"
              method="POST"
            >
              <div>
                <label
                  for="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username/Email
                </label>
                <div className="">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                  <div>
                    {touched.email && errors.email && (
                      <p className="text-rose-500">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="">
                  <label
                    for="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
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
                    className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                  />
                  <div>
                    {touched.password && errors.password && (
                      <p className="text-rose-500">{errors.password}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <Link
                    href="/login/forgetpassword"
                    className="font-medium text-gray-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="group relative w-32 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
