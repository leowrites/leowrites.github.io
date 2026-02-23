import React from "react";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import { HomePage } from "features/site";

function Layout() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </div>
  );
}

export const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/experience/:companySlug/projects/:projectSlug",
        element: <HomePage />,
      },
      { path: "/projects/:standaloneSlug", element: <HomePage /> },
      { path: "*", element: <HomePage /> },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
