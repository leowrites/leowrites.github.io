import "App.css";
import React from "react";
import Main from "Resume/Main";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
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

const router = createBrowserRouter([
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
