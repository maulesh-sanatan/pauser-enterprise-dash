import Loader from "@/components/shared/Loader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setLoading(true);
      const token = localStorage.getItem("Token");
      const role = localStorage.getItem("Role");

      if (!token) {
        router.push("/login");
      } else if (
        role !== "super admin" &&
        ["/company/list", "/company/form"].includes(router.pathname)
      ) {
        router.push("/dashboard");
      } else if (router.pathname === "/login") {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    } finally {
      setLoading(false);
    }
  }, [router.pathname]);

  return <>{loading ? <Loader /> : <div>{children}</div>}</>;
};

export default PrivateRoute;
