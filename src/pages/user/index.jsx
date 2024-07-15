import Loader from "@/components/shared/Loader";
import { calculatePageRange } from "@/utils/FrontendFunctions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const User = () => {
  const router = useRouter();
  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [showClearBox, setShowClearBox] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const companyId = localStorage.getItem("UserId");
  const role = localStorage.getItem("Role");
  console.log(selectedCompany);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    setShowClearBox(true);
  };

  const clearSearch = () => {
    setSearchTerm("");

    performSearch();
    setShowClearBox(false);
  };
  const performSearch = () => {
    setTriggerSearch(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/company/getcompanynames`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const res = await response.json();
        console.log(res.data);

        const uniqueCompanies = res.data.reduce((acc, company) => {
          if (!acc.some((c) => c.id === company.id)) {
            acc.push(company);
          }
          return acc;
        }, []);
        setCompanies(uniqueCompanies);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loading]);
  useEffect(() => {
    try {
      (async () => {
        const id = role === "super admin" ? selectedCompany : companyId;

        const data = await fetch(
          `/api/dashboard/getuserslist?companyId=${id}&page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`
        );
        const res = await data.json();

        console.log(res, "res");
        setUserData(res.data);
        setPages(res);
      })();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [selectedCompany, companyId, currentPage, itemsPerPage, role, searchTerm]);

  const handleSelectChange = (event) => {
    setSelectedCompany(event.target.value);
  };
  const { startPage, endPage } = calculatePageRange(pages, currentPage);
  const toUserSesstion = async (values) => {
    console.log(values, "valuesssss");
    const userId = values?.id;
    const companyId = selectedCompany;

    if (userId && companyId) {
      router.push(`/user/usersessiondata/${userId}/${companyId}`);
    } else {
      console.error("User ID or Company ID is missing");
    }
  };

  return (
    <div style={{ backgroundColor: "#ffe8dd" }} className=" min-h-screen">
      <div className="flex">
        <div className="lg:w-[300px] sm:w-0"></div>

        {loading ? (
          <Loader />
        ) : (
          <div className="flex-1 ">
            <div
              style={{ backgroundColor: "#fef1eb" }}
              className="lg:h-[77px] md:h-[66px] border shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl mt-3 ms-7 mr-7  border-b border-gray-200 px-6 py-3"
            >
              <div className="flex justify-between">
                {" "}
                <div className="flex  text-xl ml-12 md:ml-10 sm:ml-10 lg:ml-0 lg:mt-0 font-bold ">
                  <p
                    style={{ color: "#697A8D" }}
                    className="text-xl mt-3 text-[15px] "
                  >
                    Company users
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{ backgroundColor: "#fef1eb" }}
              className="mt-10 ms-7 mr-7 p-4  shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl border border-gray-200  "
            >
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="max-w-9xl item mx-auto">
                  <div
                    style={{ backgroundColor: "#fef1eb" }}
                    className="bg-white p-6 rounded-lg shadow-md mb-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Filters</h2>
                      <div>
                        <p className="text-orange-800">
                          0 active users (0%) in the past hour
                        </p>
                      </div>
                    </div>

                    <form className="mt-4 flex">
                      {role === "super admin" && (
                        <div className="flex items-center mb-4">
                          <label
                            htmlFor="company-select"
                            className="block text-sm font-medium text-gray-700 mr-2"
                          >
                            Select a company:
                          </label>
                          <select
                            id="company-select"
                            value={selectedCompany}
                            onChange={handleSelectChange}
                            className="w-52 rounded-md bg-white block px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option value="">
                              --Please choose an option--
                            </option>
                            {companies.map((company) => (
                              <option key={company.id} value={company.id}>
                                {company.company_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div className=" flex -mt-2 ms-5 items-center w-64 h-12 rounded-lg  focus-within:shadow-lg  overflow-hidden">
                        <div>
                          <input
                            style={{ backgroundColor: "#fef1eb" }}
                            className="peer ms-3 h-full w-full outline-none font-normal text-gray-700 "
                            value={searchTerm}
                            onChange={handleSearch}
                            type="text"
                            id="search"
                            placeholder="Search something.."
                          />
                        </div>
                        <button
                          className=""
                          onClick={performSearch}
                          type="button"
                        >
                          {" "}
                          <div className="grid place-items-center h-full w-12 text-gray-300">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-black"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>
                        </button>
                      </div>
                      {showClearBox && (
                        <button
                          onClick={clearSearch}
                          className=" ms-3  text-orange-500 font-bold rounded"
                        >
                          Clear
                        </button>
                      )}
                    </form>
                  </div>

                  {/* TABLE */}

                  <table
                    style={{ backgroundColor: "#fef1eb" }}
                    className="min-w-full divide-y   overflow-x-auto  dark:divide-gray-700"
                  >
                    <thead>
                      {userData?.length > 0 ? (
                        <tr>
                          <th
                            scope="col"
                            style={{ color: "#566A7F" }}
                            className="px-6 py-5 text-start text-[16px] font-semibold  "
                          >
                            NAME
                          </th>

                          <th
                            scope="col"
                            style={{ color: "#566A7F" }}
                            className="px-6 py-5 text-start text-[16px] font-semibold  "
                          >
                            EMAIL
                          </th>

                          <th
                            scope="col"
                            style={{ color: "#566A7F" }}
                            className="px-6 py-5 text-start text-[16px] font-semibold "
                          >
                            CONTECT NO.
                          </th>

                          <th
                            scope="col"
                            style={{ color: "#566A7F" }}
                            className="px-6 py-5 text-start text-[16px] font-semibold "
                          >
                            ACTION
                          </th>
                        </tr>
                      ) : (
                        <tr>
                          <th
                            colSpan="2"
                            className="font-extrabold text-xl text-orange-400"
                          >
                            No data available
                          </th>
                        </tr>
                      )}
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {userData?.map((user) => (
                        <tr key={user.id}>
                          <td className="border border-gray-300 px-4 py-2">
                            {user.name}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {user.email}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {user.contact_no}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <button
                              onClick={() => toUserSesstion(user)}
                              className="text-white bg-gradient-to-r bg-orange-500  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg  font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2"
                            >
                              view
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-end mr-5 mb-4">
                    <div className="flex justify-center mt-5">
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mr-2 bg-white text-black px-3 py-1 rounded"
                      >
                        <img className="w-3" src="/images/left-arrow.png" />
                      </button>
                      <div className="">
                        {Array.from(
                          { length: endPage - startPage + 1 },
                          (_, index) => (
                            <button
                              key={startPage + index}
                              onClick={() => setCurrentPage(startPage + index)}
                              className={`mx-1 text-black px-2 py-1 rounded ${
                                currentPage === startPage + index
                                  ? "bg-orange-400 text-black"
                                  : ""
                              }`}
                            >
                              {startPage + index}
                            </button>
                          )
                        )}
                      </div>
                      <button
                        onClick={() => {
                          if (userData.length === itemsPerPage) {
                            setCurrentPage(currentPage + 1);
                          }
                        }}
                        className="ml-2 bg-white text-black px-3 py-1 rounded"
                      >
                        <img className="w-3" src="/images/right-arrow.png" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
