import React from "react";
import {
  createHashRouter,
  RouterProvider,
  Outlet,
  useRouteError,
} from "react-router-dom";
import { CssBaseline, Box, Typography, Button } from "@mui/material";
import { HomePage } from "features/site";

function Layout() {
  return (
    <div className="App">
      <CssBaseline />
      <Box sx={{ m: 3 }}>
        <Outlet />
      </Box>
    </div>
  );
}

function GlobalErrorBoundary() {
  const error = useRouteError();

  // If a chunk load error occurs (often due to out-of-date cached index.html),
  // force a full page reload to fetch the latest assets from the server.
  if (
    error?.name === "ChunkLoadError" ||
    error?.message?.includes("Loading chunk") ||
    error?.message?.includes("missing:")
  ) {
    window.location.reload();
    return null;
  }

  return (
    <Box sx={{ p: 4, textAlign: "center", mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {error?.statusText ||
          error?.message ||
          "An unexpected application error occurred."}
      </Typography>
      <Button variant="contained" onClick={() => window.location.reload()}>
        Refresh Page
      </Button>
    </Box>
  );
}

export const router = createHashRouter([
  {
    element: <Layout />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/item/:itemId", element: <HomePage /> },
      { path: "*", element: <HomePage /> },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
