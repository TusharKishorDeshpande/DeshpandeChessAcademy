import React from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const location = useLocation();

  // Don't show navbar on admin routes or login page
  const hideNavbar =
    location.pathname.startsWith("/admin") || location.pathname === "/login";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!hideNavbar && <Navbar />}
      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          position: "relative",
          // Add top padding when navbar is visible to prevent content overlap
          pt: !hideNavbar ? "80px" : 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
