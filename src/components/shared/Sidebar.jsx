import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PATH } from "@/utils/Path";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const router = useRouter();
  const [role, setRole] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenteeGoalsOpen, setIsMenteeGoalsOpen] = useState(false);
  const [isMyGoalsOpen, setIsMyGoalsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("Role");
      setRole(storedRole || "");
    }
  }, []);

  const handleLogout = () => {
    const isConfirmed = window.confirm(`Are you sure you want to logout ?`);
    if (isConfirmed) {
      localStorage.removeItem("Token");
      localStorage.removeItem("UserId");
      localStorage.removeItem("Role");

      router.push("/login");
    }
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex ">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`md:block fixed  lg:hidden p-4 z-30`}
      >
        {/* Icon or Text to represent toggling */}
        <img src="/images/toggle.png" />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen
            ? "fixed inset-y-0 left-0 z-0 overflow-y-auto transition-transform duration-300 ease-in-out translate-x-0"
            : "absolute -left-full"
        } lg:fixed lg:inset-y-0 lg:left-0 lg:z-0 lg:overflow-y-auto lg:transition-transform lg:duration-300 lg:ease-in-out lg:w-[300px]`}
      >
        {/* Sidebar Content */}
        <div className="min-h-screen  border border-gray-200 flex flex-row ">
          <div className="flex flex-col w-80  bg-white  overflow-hidden">
            <div className="flex items-center justify-center h-20 shadow-md">
              {/* <img className="w-full p-1" src="/images/logo.png"></img> */}
            </div>

            <ul className="flex ms-5 mt-4  flex-col py-4">
              <li
                className={
                  router.pathname == PATH.DASHBOARD
                    ? "text-[18px] text-rgba font-bold bg-blue-100 rounded-xl border-r-4 border-r-blue-400"
                    : "text-[18px] font-normal"
                }
              >
                <div className="flex flex-row items-center h-12  hover:text-gray-800 cursor-pointer">
                  <Link
                    href={PATH.DASHBOARD}
                    className="flex flex-row items-center h-12 t  hover:text-gray-800"
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg ">
                      <Image
                        src="/images/dashboard.png"
                        width={20}
                        height={20}
                        alt=""
                      />
                    </span>
                    <span className="">Dashboard</span>
                  </Link>
                </div>
              </li>
              {/* --------------------------------------------open settings------------------------------------------------------------------------- */}

              {/* --------------------------------------------open sites------------------------------------------------------------------------- */}

              {/* {role === "admin" ? (
                <>
                  <li
                    className={
                      router.pathname == PATH.MANAGEUSERLIST
                        ? "text-[18px] text-rgba font-bold bg-orange-100 rounded-xl border-r-4 border-r-orange-400"
                        : "text-[18px] font-normal"
                    }
                  >
                    <div className="flex flex-row items-center h-12  hover:text-gray-800 cursor-pointer">
                      <Link
                        href={PATH.MANAGEUSERLIST}
                        className="flex flex-row items-center h-12 t  hover:text-gray-800"
                      >
                        <span className="inline-flex items-center justify-center h-12 w-12 text-lg ">
                          <Image
                            src="/images/mu.png"
                            width={20}
                            height={20}
                            alt=""
                          />
                        </span>
                        <span className="">Manage User</span>
                      </Link>
                    </div>
                  </li>
                  <li
                    className={
                      router.pathname == PATH.SITES ||
                      router.pathname == PATH.ZONES
                        ? "active"
                        : ""
                    }
                  >
                    <div
                      className="flex flex-row items-center h-12 text-gray-500 hover:text-gray-800 cursor-pointer"
                      onClick={handleMenteeGoalsToggle}
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                        <Image
                          src="/images/management.png"
                          width={20}
                          height={20}
                          alt=""
                        />
                      </span>
                      <span
                        className={
                          isMyGoalsOpen || router.pathname == PATH.Manage
                            ? "text-[18px] text-black  font-bold "
                            : "text-[18px] text-black font-normal"
                        }
                      >
                        Manage
                      </span>
                    </div>
                    {(isMenteeGoalsOpen ||
                      router.pathname == PATH.SITELIST ||
                      router.pathname == PATH.ZONELIST ||
                      router.pathname == PATH.LOCATIONLIST) && (
                      <ul>
                        <li
                          className={
                            router.pathname == PATH.SITELIST
                              ? "text-[18px] text-rgba font-bold bg-orange-100 rounded-xl border-r-4 border-r-orange-400"
                              : "text-[18px] font-normal"
                          }
                        >
                          <div className="flex flex-row items-center h-12 hover:text-gray-800">
                            <Link href={PATH.SITELIST} className=" ms-6 ">
                              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                <Image
                                  src="/images/internet.png"
                                  width={20}
                                  height={20}
                                  alt=""
                                />
                              </span>
                              <span>Site</span>
                            </Link>
                          </div>
                        </li>

                        <li
                          className={
                            router.pathname == PATH.LOCATIONLIST
                              ? "text-[18px] text-rgba font-bold bg-orange-100 rounded-xl border-r-4 border-r-orange-400"
                              : "text-[18px] font-normal"
                          }
                        >
                          <div className="flex flex-row items-center h-12 hover:text-gray-800">
                            <Link
                              href={PATH.LOCATIONLIST}
                              className="ms-6 "
                              passHref
                            >
                              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                <Image
                                  src="/images/location.png"
                                  width={20}
                                  height={20}
                                  alt=""
                                />
                              </span>
                              <span>Location</span>
                            </Link>
                          </div>
                        </li>
                        <li
                          className={
                            router.pathname == PATH.ZONELIST
                              ? "text-[18px] text-rgba font-bold bg-orange-100 rounded-xl border-r-4 border-r-orange-400"
                              : "text-[18px] font-normal"
                          }
                        >
                          <div className="flex flex-row items-center h-12 hover:text-gray-800">
                            <Link href={PATH.ZONELIST} className=" ms-6 ">
                              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                <Image
                                  src="/images/target.png"
                                  width={20}
                                  height={20}
                                  alt=""
                                />
                              </span>
                              <span>Zone</span>
                            </Link>
                          </div>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li
                    className={
                      router.pathname == PATH.SERVEYLIST
                        ? "text-[18px] text-rgba font-bold bg-orange-100 rounded-xl border-r-4 border-r-orange-400"
                        : "text-[18px] font-normal"
                    }
                  >
                    <div className="flex flex-row items-center h-12  hover:text-gray-800 cursor-pointer">
                      <Link
                        href={PATH.SERVEYLIST}
                        className="flex flex-row items-center h-12 t  hover:text-gray-800"
                      >
                        <span className="inline-flex items-center justify-center h-12 w-12 text-lg ">
                          <Image
                            src="/images/ms.png"
                            width={20}
                            height={20}
                            alt=""
                          />
                        </span>
                        <span className="">Manage Servey</span>
                      </Link>
                    </div>
                  </li>
                  <li
                    className={
                      router.pathname == PATH.FEDDACKOPTIONLIST
                        ? "text-[18px] text-rgba font-bold bg-orange-100 rounded-xl border-r-4 border-r-orange-400"
                        : "text-[18px] font-normal"
                    }
                  >
                    <div className="flex flex-row items-center h-12  hover:text-gray-800 cursor-pointer">
                      <Link
                        href={PATH.FEDDACKOPTIONLIST}
                        className="flex flex-row items-center h-12 t  hover:text-gray-800"
                      >
                        <span className="inline-flex items-center justify-center h-12 w-12 text-lg ">
                          <Image
                            src="/images/gear.png"
                            width={20}
                            height={20}
                            alt=""
                          />
                        </span>
                        <span className="">Feedback options</span>
                      </Link>
                    </div>
                  </li>
                  <li
                    className={
                      router.pathname == PATH.MONITORLIST
                        ? "text-[18px] text-rgba font-bold bg-orange-100 rounded-xl border-r-4 border-r-orange-400"
                        : "text-[18px] font-normal"
                    }
                  >
                    <div className="flex flex-row items-center h-12  hover:text-gray-800 cursor-pointer">
                      <Link
                        href={PATH.MONITORLIST}
                        className="flex flex-row items-center h-12 t  hover:text-gray-800"
                      >
                        <span className="inline-flex items-center justify-center h-12 w-12 text-lg ">
                          <Image
                            src="/images/monitor.png"
                            width={20}
                            height={20}
                            alt=""
                          />
                        </span>
                        <span className="">Monitors</span>
                      </Link>
                    </div>
                  </li>
                  <li
                    className={
                      router.pathname == PATH.RATINGLIST
                        ? "text-[18px] text-rgba font-bold bg-orange-100 rounded-xl border-r-4 border-r-orange-400"
                        : "text-[18px] font-normal"
                    }
                  >
                    <div className="flex flex-row items-center h-12  hover:text-gray-800 cursor-pointer">
                      <Link
                        href={PATH.RATINGLIST}
                        className="flex flex-row items-center h-12 t  hover:text-gray-800"
                      >
                        <span className="inline-flex items-center justify-center h-12 w-12 text-lg ">
                          <Image
                            src="/images/star.png"
                            width={20}
                            height={20}
                            alt=""
                          />
                        </span>
                        <span className="">Ratings</span>
                      </Link>
                    </div>
                  </li>
                </>
              ) : (
                ""
              )} */}

              {role === "super admin" ? (
                <div className=" mr-3 ">
                  <li
                    className={
                      router.pathname == PATH.COMPANY
                        ? `text-[18px] text-rgba font-bold bg-blue-100 rounded-xl border-r-4 border-r-blue-400`
                        : "text-[18px] font-normal"
                    }
                  >
                    <div className="flex flex-row items-center h-12  hover:text-gray-800 cursor-pointer">
                      <Link
                        href={PATH.COMPANY}
                        className="flex flex-row items-center h-12 t  hover:text-gray-800"
                      >
                        <span className="inline-flex items-center justify-center h-12 w-12 text-lg ">
                          <Image
                            src="/images/building.png"
                            width={25}
                            height={25}
                            alt=""
                          />
                        </span>
                        <span className="">List companies</span>
                      </Link>
                    </div>
                  </li>
                </div>
              ) : (
                ""
              )}
              <li
                className={
                  router.pathname == PATH.MANAGEUSER
                    ? `text-[18px] text-rgba font-bold bg-blue-100 rounded-xl border-r-4 border-r-blue-400`
                    : "text-[18px] font-normal"
                }
              >
                <div className="flex flex-row items-center h-12  hover:text-gray-800 cursor-pointer">
                  <Link
                    href={PATH.MANAGEUSER}
                    className="flex flex-row items-center h-12 t  hover:text-gray-800"
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg ">
                      <Image
                        src="/images/building.png"
                        width={25}
                        height={25}
                        alt=""
                      />
                    </span>
                    <span className="">List users</span>
                  </Link>
                </div>
              </li>

              <li
              //   className={
              //     router.pathname == PATH.DASHBOARD
              //       ? "text-[18px] text-rgba font-bold "
              //       : "text-[18px] font-normal"
              //   }
              >
                <div className="flex flex-row items-center h-12  hover:text-gray-800 cursor-pointer">
                  <Link
                    onClick={handleLogout}
                    href={PATH.LOGIN}
                    className="flex flex-row items-center h-12 t  hover:text-gray-800"
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg ">
                      <Image
                        src="/images/logout.png"
                        width={20}
                        height={20}
                        alt=""
                      />
                    </span>
                    <span className="">Logout</span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
      </div>
    </div>
  );
};

export default Sidebar;
