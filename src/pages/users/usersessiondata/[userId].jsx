import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { baseUrl } from "@/utils/constansts";
import { Chart } from "chart.js";

const ManageUserEdit = () => {
  const router = useRouter();
  const { userId } = router.query;

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

  const startDate = new Date("2022-01-01");
  const endDate = new Date();

  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const relevantDates = getDatesInRange(startDate, endDate);
  // BREATH MEDITATION CHART
  useEffect(() => {
    const ctx = document.getElementById("combinedChart").getContext("2d");
    const chartElement = document.getElementById("combinedChart");

    if (
      chartElement &&
      counts?.data?.breathData &&
      counts?.data?.meditationData
    ) {
      chartElement.height = 400;

      const breathCreationDates = counts.data.breathData.map(
        (entry) => new Date(parseInt(entry.time_stamp))
      );
      const meditationCreationDates = counts.data.meditationData.map(
        (entry) => new Date(parseInt(entry.time_stamp))
      );

      const countsData = breathCreationDates.reduce((acc, date) => {
        const key = date.toISOString().split("T")[0];
        if (date >= startDate && date <= endDate) {
          acc[key] = acc[key] || { breath: 0, meditation: 0 };
          acc[key].breath += 1;
        }
        return acc;
      }, {});

      meditationCreationDates.forEach((date) => {
        const key = date.toISOString().split("T")[0];
        if (date >= startDate && date <= endDate) {
          countsData[key] = countsData[key] || { breath: 0, meditation: 0 };
          countsData[key].meditation += 1;
        }
      });

      const breathCountsByDate = relevantDates.map((date) =>
        countsData[date] ? countsData[date].breath : 0
      );
      const meditationCountsByDate = relevantDates.map((date) =>
        countsData[date] ? countsData[date].meditation : 0
      );

      new Chart(ctx, {
        type: "line",
        data: {
          labels: relevantDates,
          datasets: [
            {
              data: breathCountsByDate,
              label: "Breath Data Count",
              borderColor: "#fe825b",
              fill: false,
            },
            {
              data: meditationCountsByDate,
              label: "Meditation Data Count",
              borderColor: "#36a2eb",
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "category",
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Number of Data Entries",
              },
              beginAtZero: true,
            },
          },
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: "x",
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: "x",
              },
            },
          },
        },
      });
    }
  }, [counts, startDate, endDate, relevantDates]);

  // HEART RATE SESSION COUNT CHART
  useEffect(() => {
    const ctx = document.getElementById("heartRate").getContext("2d");
    const chartElement = document.getElementById("heartRate");

    if (chartElement && counts?.data?.heartRateSession) {
      chartElement.height = 400;
      const heartRateCreationDates = counts.data.heartRateSession
        .map((entry) => {
          const timestamp = parseInt(entry.time_stamp, 10);
          return isNaN(timestamp) ? null : new Date(timestamp);
        })
        .filter(
          (date) => date !== null && date >= startDate && date <= endDate
        );

      const countsData = heartRateCreationDates.reduce((acc, date) => {
        const key = date.toISOString().split("T")[0];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      const heartRateCountsByDate = relevantDates.map((date) =>
        countsData[date] ? countsData[date] : 0
      );

      new Chart(ctx, {
        type: "line",
        data: {
          labels: relevantDates,
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
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: "x",
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: "x",
              },
            },
          },
        },
      });
    }
  }, [counts]);

  console.log(userId);
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        console.error("userId is missing");
        return;
      }

      try {
        let url = `${baseUrl}/user_records/getusersdata?userId=${parseInt(
          userId
        )}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const res = await response.json();
        console.log("Received data:", res);
        setCounts(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData when dependencies change
  }, [userId]);

  return (
    <div className=" min-h-screen">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar or additional content can go here if needed */}
        <div className="flex-1 p-4">
          <div className=" mt-6 mx-4 p-4 bg-white shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between mb-3">
              <h3 className="text-[#566A7F] text-sm md:text-lg">
                <div className="flex ms-3 mt-4 ">
                  <div>
                    <span className="font-bold mr-2">Name:</span>
                    {counts?.user?.name}
                  </div>
                  <div className="ms-4">
                    <span className="font-bold mr-2">Email:</span>
                    {counts?.user?.email}
                  </div>
                </div>
              </h3>
              <div className="mt-5">
                <button
                  onClick={() => router.push("/users")}
                  className="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                >
                  Go back
                </button>
              </div>
            </div>

            {/* Uncomment and adjust if form is needed */}

            <div className="max-w-full mx-auto">
              <div className="flex flex-col gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                    <h3 className="text-lg flex font-semibold">
                      <p>
                        Total Breaths:{" "}
                        <span className="text-orange-800">
                          {counts?.totalBreaths}
                        </span>
                      </p>
                      <p className="ms-4">
                        Total Meditations:{" "}
                        <span className="text-orange-800">
                          {counts?.totalMeditations}
                        </span>
                      </p>
                    </h3>
                  </div>

                  <div className="">
                    <canvas id="combinedChart"></canvas>
                  </div>
                </div>

                <div className="bg-white  p-4 rounded-lg shadow-md ">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      <p>
                        HR alert sessions:{" "}
                        <span className="text-orange-800">
                          {counts?.totalHrs}
                        </span>
                      </p>
                    </h3>
                  </div>

                  <div className="">
                    <canvas id="heartRate"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUserEdit;
