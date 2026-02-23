import React from "react";
import { Box } from "@mui/material";

const StructuredVisual = ({ src, alt, type = "image" }) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "90%" },
        maxWidth: { sm: "500px" },
        overflow: "hidden",
        py: 4,
        mx: "auto",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      {type === "image" && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{
            width: "100%",
            display: "block",
            borderRadius: "1rem",
          }}
        />
      )}
    </Box>
  );
};

export default StructuredVisual;
