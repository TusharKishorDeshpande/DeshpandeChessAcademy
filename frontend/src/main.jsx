import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

// Pages
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import Updates from "./pages/Updates";
import Achievements from "./pages/Achievements";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "testimonials",
        element: <Testimonials />,
      },
      {
        path: "updates",
        element: <Updates />,
      },
      {
        path: "achievements",
        element: <Achievements />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "admin",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
