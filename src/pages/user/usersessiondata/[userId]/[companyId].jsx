import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Chart } from "chart.js";

const ManageUserEdit = () => {
  const router = useRouter();
  const { userId, companyId } = router.query;
  console.log(userId, companyId);
  const [counts, setCounts] = useState({
    totalLogins: 0,
    totalHrs: 0,
    totalBreaths: 0,
    totalMeditations: 0,
    totalUsers: 0,
    totalMonitorSessions: 0,
    data: {
      userAppAccessLog: [],
      heartRateSession: [],
      breathData: [],
      meditationData: [],
      users: [],
      monitorSessionData: [],
    },
  });
  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [startDate, setStartDate] = useState(getFormattedDate(new Date()));
  const [endDate, setEndDate] = useState(getFormattedDate(new Date()));
  const [triggerSerch, setTriggerSerch] = useState(false);

  // DATE SELECTION
  const handleSelectChangeDate = (event) => {
    const option = event.target.value;
    let newStartDate, newEndDate;
    const today = new Date();

    switch (option) {
      case "Today":
        newStartDate = getFormattedDate(today);
        newEndDate = getFormattedDate(today);
        break;
      case "Last 7 days":
        newStartDate = getFormattedDate(
          new Date(today.setDate(today.getDate() - 7))
        );
        newEndDate = getFormattedDate(new Date());
        break;
      case "Last 30 days":
        newStartDate = getFormattedDate(
          new Date(today.setDate(today.getDate() - 30))
        );
        newEndDate = getFormattedDate(new Date());
        break;
      case "Last 3 months":
        newStartDate = getFormattedDate(
          new Date(today.setMonth(today.getMonth() - 3))
        );
        newEndDate = getFormattedDate(new Date());
        break;
      case "Last 90 days":
        newStartDate = getFormattedDate(
          new Date(today.setDate(today.getDate() - 90))
        );
        newEndDate = getFormattedDate(new Date());
        break;
      default:
        newStartDate = getFormattedDate(new Date());
        newEndDate = getFormattedDate(new Date());
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  // LOGIN COUNT CHART
  useEffect(() => {
    const ctx = document.getElementById("myChart");

    if (ctx && counts?.data?.userAppAccessLog) {
      const dates = counts.data.userAppAccessLog.map(
        (entry) => new Date(entry.created_at)
      );
      const countsData = counts.data.userAppAccessLog.map((entry) => entry.id);

      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: dates.map((date) => date.toLocaleDateString()),
          datasets: [
            {
              data: countsData,
              label: "User App Access Count",
              borderColor: "#fe825b",
              backgroundColor: "#fe825b",
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
                displayFormats: {
                  day: "MMM D",
                },
              },
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Count",
              },
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [counts]);

  // MONITOR SESSION COUNT CHART
  useEffect(() => {
    const ctx = document.getElementById("monitor");

    if (ctx) {
      const sessionCreationDates = counts?.data?.monitorSessionData.map(
        (session) => new Date(session.created_at)
      );

      const countsData = sessionCreationDates.reduce((acc, date) => {
        const key = date.toISOString().split("T")[0];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      const sortedDates = Object.keys(countsData).sort();
      const sessionCountsByDate = sortedDates.map((date) => countsData[date]);

      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: sortedDates,
          datasets: [
            {
              data: sessionCountsByDate,
              label: "Monitor Session Count",
              backgroundColor: "#fe825b",
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Number of Sessions",
              },
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [counts]);

  // BREETHER SESSION COUNT CHART
  useEffect(() => {
    const ctx = document.getElementById("breath");

    if (ctx && counts?.data?.breathData) {
      const breathCreationDates = counts?.data?.breathData.map(
        (entry) => new Date(entry.created_at)
      );

      const countsData = breathCreationDates?.reduce((acc, date) => {
        const key = date.toISOString().split("T")[0];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      const sortedDates = Object.keys(countsData).sort();
      const breathCountsByDate = sortedDates.map((date) => countsData[date]);

      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: sortedDates,
          datasets: [
            {
              data: breathCountsByDate,
              label: "Breath Data Count",
              backgroundColor: "#fe825b",
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Number of Breath Data Entries",
              },
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [counts]);

  // MEDITATION SESSION COUNT CHART
  useEffect(() => {
    const ctx = document.getElementById("meditation");

    if (ctx && counts?.data?.meditationData) {
      const meditationCreationDates = counts.data.meditationData.map(
        (entry) => new Date(entry.created_at)
      );

      const countsData = meditationCreationDates.reduce((acc, date) => {
        const key = date.toISOString().split("T")[0];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      const sortedDates = Object.keys(countsData).sort();
      const meditationCountsByDate = sortedDates.map(
        (date) => countsData[date]
      );

      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: sortedDates,
          datasets: [
            {
              data: meditationCountsByDate,
              label: "Meditation Data Count",
              backgroundColor: "#fe825b",
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Number of Meditation Data Entries",
              },
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [counts]);

  // HEART RATE SESSION COUNT CHART
  useEffect(() => {
    const ctx = document.getElementById("heartRate");

    if (ctx && counts?.data?.heartRateSession) {
      const heartRateCreationDates = counts.data.heartRateSession.map(
        (entry) => new Date(entry.created_at)
      );

      const countsData = heartRateCreationDates.reduce((acc, date) => {
        const key = date.toISOString().split("T")[0];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      const sortedDates = Object.keys(countsData).sort();
      const heartRateCountsByDate = sortedDates.map((date) => countsData[date]);

      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: sortedDates,
          datasets: [
            {
              data: heartRateCountsByDate,
              label: "Heart Rate Data Count",
              borderColor: "#fe825b",
              backgroundColor: "#fe825b",
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Number of Heart Rate Data Entries",
              },
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [counts]);
  console.log(userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `/api/dashboard/getusersdata?userId=${parseInt(
          userId
        )}&companyId=${parseInt(companyId)}`;

        if (startDate && endDate && triggerSerch) {
          console.log("chaeck");
          const fromDateWithTime = `${startDate} 00:00:00`;
          const toDateWithTime = `${endDate} 23:59:59`;
          url += `&fromDate=${fromDateWithTime}&toDate=${toDateWithTime}`;
        }

        const response = await fetch(url);
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
  }, [userId, companyId, startDate, endDate, triggerSerch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTriggerSerch(true);
  };

  return (
    <div style={{ backgroundColor: "#ffe8dd" }} className=" min-h-screen">
      <div className="flex">
        <div className="lg:w-[300px] sm:w-0"></div>

        <div className="flex-1 ">
          <div
            style={{ backgroundColor: "#fef1eb" }}
            className="lg:h-[77px] md:h-[66px] border shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl mt-3 ms-7 mr-7  border-b border-gray-200 px-6 py-3"
          >
            <div className="flex justify-between">
              {" "}
              <div className="flex   ml-12 md:ml-10 sm:ml-10 lg:ml-0 lg:mt-0 font-bold ">
                <p
                  style={{ color: "#697A8D" }}
                  className="text-xl mt-3 text-[15px] "
                >
                  User
                </p>
              </div>
            </div>
          </div>

          <div
            style={{ backgroundColor: "#fef1eb" }}
            className="mt-14 ms-7 mr-7  shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl border border-gray-200    "
          >
            <div className="flex p-6 justify-between">
              <h3
                className="font-semibold ms-2 text-xl "
                style={{ color: "#566A7F" }}
              >
                User
              </h3>
              <p style={{ color: "#A1ACB8" }}>Defalt label</p>
            </div>
          </div>
          <div
            style={{ backgroundColor: "#fef1eb" }}
            className="mt-10 ms-7 mr-7 p-4  shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl border border-gray-200  "
          >
            <form className="mt-4">
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    End Date:
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Range:
                  </label>
                  <select
                    onChange={handleSelectChangeDate}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Today">Today</option>
                    <option value="Last 7 days">Last 7 days</option>
                    <option value="Last 30 days">Last 30 days</option>
                    <option value="Last 3 months">Last 3 months</option>
                    <option value="Last 90 days">Last 90 days</option>
                  </select>
                </div>
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="ml-4 p-2 bg-orange-500 text-white rounded-md"
                >
                  Fetch Data
                </button>
              </div>
            </form>
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
              </div>

              {/* CARDS */}

              {/* <div className="grid mt-5 grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      {" "}
                      <p>
                        Login count:{" "}
                        <spam className="ms-2 text-orange-800">
                          {counts?.totalLogins}
                        </spam>
                      </p>
                    </h3>
                  </div>

                  <div>
                    <div className="h-fit">
                      <canvas id="myChart"></canvas>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <div className="flex items-center w-40 justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      {" "}
                      <p>
                        Total Breaths:{" "}
                        <spam className="ms-2 text-orange-800">
                          {counts?.totalBreaths}
                        </spam>
                      </p>
                    </h3>
                  </div>

                  <div>
                    <div className="h-fit">
                      <canvas id="breath"></canvas>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <div className="flex items-center  justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      {" "}
                      <p>
                        Total Meditations:{" "}
                        <spam className="ms-2 text-orange-800">
                          {counts?.totalMeditations}
                        </spam>
                      </p>
                    </h3>
                  </div>

                  <div className="h-fit">
                    <canvas id="meditation"></canvas>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      {" "}
                      <p>
                        HR alert sessions:{" "}
                        <spam className="ms-2 text-orange-800">
                          {counts?.totalHrs}
                        </spam>
                      </p>
                    </h3>
                  </div>

                  <div>
                    <div className="h-fit">
                      <canvas id="heartRate"></canvas>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <div className="flex items-center  justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      {" "}
                      <p>
                        Monitor sessions:
                        <spam className="ms-2 text-orange-800">
                          {counts?.totalMonitorSessions}
                        </spam>
                      </p>
                    </h3>
                  </div>

                  <div className="h-fit">
                    <canvas id="monitor"></canvas>
                    <div className="bg-blue-100 h-full rounded-lg" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <a href="#" className="text-orange-600">
                  Search by user ID
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUserEdit;
