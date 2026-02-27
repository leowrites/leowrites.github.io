import React from "react";
import { Box, Skeleton } from "@mui/material";

const DetailPaneLoading = ({ width = "75%" }) => {
  return (
    <Box sx={{ width, p: 4 }}>
      <Skeleton variant="text" width="30%" height={36} />
      <Skeleton variant="text" width="55%" height={28} />
      <Skeleton variant="rounded" width="100%" height={180} sx={{ my: 2 }} />
      <Skeleton variant="text" width="96%" height={26} />
      <Skeleton variant="text" width="92%" height={26} />
      <Skeleton variant="text" width="88%" height={26} />
    </Box>
  );
};

export default DetailPaneLoading;
