import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/shared/Loader";
import { post } from "@/utils/axios";
import { calculatePageRange } from "@/utils/FrontendFunctions";

const Dashboard = () => {
  const router = useRouter();
  const [counts, setCounts] = useState();
  const [loading, setLoading] = useState(true);

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const companyId = localStorage.getItem("UserId");
  const role = localStorage.getItem("Role");
  console.log(selectedCompany);

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
    const fetchData = async () => {
      try {
        const id = role === "super admin" ? selectedCompany : companyId;
        const response = await fetch(
          `/api/dashboard?companyId=${parseInt(id)}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const res = await response.json();
        console.log(res);
        setCounts(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedCompany]);

  const handleSelectChange = (event) => {
    setSelectedCompany(event.target.value);
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

              <div className="mt-10 ms-7 mr-7 p-4  shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl border border-gray-200  bg-white  ">
                {role === "super admin" && (
                  <form>
                    <div className="flex items-center">
                      <label htmlFor="company-select">Select a company:</label>
                      <select
                        id="company-select"
                        value={selectedCompany}
                        onChange={handleSelectChange}
                        className="w-52 rounded-md bg-white block px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">--Please choose an option--</option>
                        {companies.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.company_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </form>
                )}
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div>
                    <p>Total Logins: {counts?.totalLogins}</p>
                    <p>Total Hr: {counts?.totalHrs}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
