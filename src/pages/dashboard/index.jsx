import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/shared/Loader";
import { post } from "@/utils/axios";
import { calculatePageRange } from "@/utils/FrontendFunctions";

const Dashboard = () => {
  const router = useRouter();
  const [company, setCompany] = useState();
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showClearBox, setShowClearBox] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        const data = await fetch(
          `/api/company?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`
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
  }, [currentPage, itemsPerPage, triggerSearch, searchTerm]);

  const ToForm = () => {
    router.push("/company/form");
  };
  const editCompany = async (values) => {
    console.log(values, "valuesssss");
    const _id = values?.id;
    router.push(`/company/form/edit/${_id}`);
  };

  async function LoginUser(values) {
    console.log(values, "byvalues");
    const data = {
      email: values?.email,
      password: values.password,
      role: "super admin",
    };

    const response = await post("/api/login", data);

    const res = await response.json();
    console.log(res, "res");

    if (res.status === true) {
      localStorage.setItem("Role", res?.user[0].user_group);
      localStorage.setItem("UserId", res?.user[0].id);
      router.reload();
      router.push("/dashboard");
    }

    if (res.status === false) {
      alert(res.message);
    }
  }
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
    <div
      style={{ backgroundColor: "rgba(249, 249, 251, 1)" }}
      className=" min-h-screen"
    >
      <div className="flex">
        <div className="lg:w-[300px] sm:w-0"></div>

        {loading ? (
          <Loader />
        ) : (
          <div className="flex-1 ">
            <div className="lg:h-[77px] md:h-[66px] border shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl mt-3 ms-7 mr-7 bg-white border-b border-gray-200 px-6 py-3">
              <div className="flex justify-between">
                {" "}
                <div className="flex  text-xl ml-12 md:ml-10 sm:ml-10 lg:ml-0 lg:mt-0 font-bold ">
                  <p
                    style={{ color: "#697A8D" }}
                    className="text-xl mt-3 text-[15px] "
                  >
                    Dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
