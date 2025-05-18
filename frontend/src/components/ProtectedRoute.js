import React from "react";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children, isAdmin }) => {
  const router = useRouter();

  // Ensure this code runs only in the browser
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

    if (!token || (isAdmin && !user?.isAdmin)) {
      router.replace("/login"); // Redirect to login if not authenticated or not admin
      return null; // Prevent rendering protected content
    }
  } else {
    // Return nothing during server-side rendering
    return null;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;


 