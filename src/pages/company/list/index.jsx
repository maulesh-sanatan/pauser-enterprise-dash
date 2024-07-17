import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/shared/Loader";
import { Delete, post } from "@/utils/axios";
import { calculatePageRange } from "@/utils/FrontendFunctions";
import { baseUrl } from "@/utils/constansts";

const List = () => {
  const router = useRouter();
  const [company, setCompany] = useState();
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showClearBox, setShowClearBox] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        const data = await fetch(
          `${baseUrl}/company?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`
        );
        const res = await data.json();

        console.log(res, "res");
        setCompany(res.data);
        setPages(res);
      })();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, triggerSearch, searchTerm, isUpdate]);

  const ToForm = () => {
    router.push("/company/form");
  };
  // EDIT COMPANY
  const editCompany = async (values) => {
    console.log(values, "valuesssss");
    const _id = values?.id;
    router.push(`/company/form/edit/${_id}`);
  };
  // DELETE COMPANY
  const DeleteCompany = async (values) => {
    console.log(values, "delete");

    const userId = values.id;
    const isConfirmed = window.confirm(`Are you sure you want to delete ?`);
    if (isConfirmed) {
      const data = await Delete(`/api/company?id=${userId}`);
      const res = await data.json();

      if (res.status === true) {
        alert("deleted succesfully");
        setIsUpdate((prev) => !prev);
      }
      if (res.status === false) {
        alert(res.message);
      }
    }
  };

  // PAGINATION COMPANY
  const { startPage, endPage } = calculatePageRange(pages, currentPage);

  // SEARCH STAFF
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
                    Companies
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-5">
              <div className=" ms-7">
                <div className="flex">
                  <div
                    style={{ backgroundColor: "#fef1eb" }}
                    className=" flex items-center w-full h-12 rounded-lg  focus-within:shadow-lg  overflow-hidden"
                  >
                    <div>
                      <input
                        style={{ backgroundColor: "#fef1eb" }}
                        className="peer ms-3 h-full w-full outline-none font-normal text-gray-700 pr-2"
                        value={searchTerm}
                        onChange={handleSearch}
                        type="text"
                        id="search"
                        placeholder="Search something.."
                      />
                    </div>
                    <button className="" onClick={performSearch} type="button">
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
                </div>
              </div>
            </div>

            <div>
              <div
                style={{ backgroundColor: "#fef1eb" }}
                className="mt-5 ms-7 mr-7 p-4  shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl border border-gray-200  "
              >
                <div className="flex justify-between">
                  <h3
                    className="font-semibold ms-2 text-xl "
                    style={{ color: "#566A7F" }}
                  >
                    Listing
                  </h3>
                  <button
                    type="button"
                    onClick={ToForm}
                    className="text-white bg-gradient-to-r bg-orange-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Add Company
                  </button>
                </div>
                <div className="mt-4">
                  <table className="min-w-full divide-y  overflow-x-auto  dark:divide-gray-700">
                    <thead>
                      {company?.length > 0 ? (
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
                            USERNAME
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
                            className="font-extrabold text-xl text-blue-400"
                          >
                            No data available
                          </th>
                        </tr>
                      )}
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {company?.map((staffMember) => (
                        <tr key={staffMember?.id}>
                          <td className="px-6 py-3 whitespace-nowrapfont-normal text-[14px] font-normal text-gray-800 dark:text-gray-200">
                            {staffMember?.company_name}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrapfont-normal text-[14px] font-normal text-gray-800 dark:text-gray-200">
                            {staffMember?.email}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrapfont-normal text-[14px] font-normal text-gray-800 dark:text-gray-200">
                            {staffMember?.username}
                          </td>

                          <td className="px-6 border-l border-gray-200 py-4 w-28 whitespace-nowrapfont-normal text-end font-normal ">
                            <div className="flex justify-between">
                              <button onClick={() => editCompany(staffMember)}>
                                <img src="/images/eye 1.png" alt="Eye Icon" />
                              </button>
                              <button
                                onClick={() => DeleteCompany(staffMember)}
                              >
                                <img
                                  src="/images/delete 1.png"
                                  alt="Eye Icon"
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
              <button
                key={startPage + index}
                onClick={() => setCurrentPage(startPage + index)}
                className={`mx-1 text-black px-2 py-1 rounded ${
                  currentPage === startPage + index
                    ? "bg-orange-300 text-black"
                    : ""
                }`}
              >
                {startPage + index}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              if (company.length === itemsPerPage) {
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
  );
};

export default List;
