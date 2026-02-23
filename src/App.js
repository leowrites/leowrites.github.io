import "App.css";
import React from "react";
import Main from "Resume/Main";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";

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

const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },
      {
        path: "/experience/:companySlug/projects/:projectSlug",
        element: <Main />,
      },
      { path: "*", element: <Main /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
