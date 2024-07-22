import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MainLayout from "@/components/layout/MainLayout";
import Sidebar from "@/components/shared/Sidebar";
import PrivateRoute from "./privateroute";
import Loader from "@/components/shared/Loader";
import ReactModal from "react-modal";
import ErrorBoundary from "@/components/error";
import NotFoundPage from "@/components/not-found";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ReactModal.setAppElement("#__next");
  }, []);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const isLoginPage = router.pathname === "/login";
  const isRatingPage = router.pathname.startsWith("/ratings");
  const isUserRecord = router.pathname.startsWith("/users");

  return (
    <>
      {loading && <Loader />}
      <ErrorBoundary>
        <MainLayout>
          <PrivateRoute>
            {!isLoginPage &&
              !isRatingPage &&
              !isUserRecord &&
              pageProps.statusCode !== 404 && <Sidebar />}
            {pageProps.statusCode === 404 ? (
              <NotFoundPage />
            ) : (
              <Component {...pageProps} />
            )}
          </PrivateRoute>
        </MainLayout>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
