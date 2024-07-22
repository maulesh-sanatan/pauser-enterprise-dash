import Loader from "@/components/shared/Loader";
import { calculatePageRange } from "@/utils/FrontendFunctions";
import { baseUrl } from "@/utils/constansts";
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
    try {
      (async () => {
        const data = await fetch(
          `${baseUrl}/user_records/getuserslist?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`
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
  }, [selectedCompany, currentPage, itemsPerPage, searchTerm]);

  const { startPage, endPage } = calculatePageRange(pages, currentPage);
  const toUserSesstion = async (values) => {
    console.log(values, "valuesssss");
    const userId = values?.id;

    router.push(`/users/usersessiondata/${userId}`);
  };

  return (
    <div className=" min-h-screen">
      <div className="flex">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex-1 ">
            <div className="mt-10 ms-7 mr-7 p-10  shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl border border-gray-200  ">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="max-w-9xl item mx-auto">
                  <div className="font-bold text-xl ms-3">
                    <p>User List</p>
                  </div>
                  <form className="mt-4 flex">
                    <div className=" flex -mt-2  items-center w-64 h-12 rounded-lg  focus-within:shadow-lg  overflow-hidden">
                      <div>
                        <input
                          className="peer ms-3 bg-gray-50 h-full w-full outline-none font-normal text-gray-700 "
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

                  <table className="min-w-full mt-8 overflow-x-auto divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      {userData?.length > 0 ? (
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            NAME
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            EMAIL
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            TOTAL BREATH
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            TOTAL MEDITATION
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            TOTAL HEART RATE ALERTS
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            ACTION
                          </th>
                        </tr>
                      ) : (
                        <tr>
                          <th
                            colSpan="7"
                            className="px-6 py-3 text-xl font-extrabold text-orange-400 text-center"
                          >
                            No data available
                          </th>
                        </tr>
                      )}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                      {userData?.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {user.email}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {user.counts.breath}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {user.counts.meditation}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {user.counts.heartRate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            <button
                              onClick={() => toUserSesstion(user)}
                              className="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                            >
                              View
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
