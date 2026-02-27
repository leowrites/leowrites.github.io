import React from "react";
import { Box, Button, Typography } from "@mui/material";

const HomeEmptyState = ({ latestExperienceId, onSelect }) => {
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          color: "text.primary",
          textAlign: "center",
          fontWeight: 700,
        }}
      >
        Pick something on the left to explore details
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        Rich mode is still here—use a quick action below if you want a guided
        shortcut.
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Button
          variant="text"
          onClick={() => onSelect(latestExperienceId)}
          disableRipple
          sx={{ textTransform: "none", borderRadius: "999px", px: 1.25 }}
        >
          Open latest experience
        </Button>
      </Box>
      <Box>
        <Box
          sx={{
            width: "420px",
            maxWidth: "100%",
            height: "240px",
            backgroundImage: "url(/photos/optimized/IMG_0206.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "1rem",
            overflow: "hidden",
            opacity: 0.92,
          }}
        />
        <Typography
          variant="body1"
          paragraph
          color="text.secondary"
          textAlign="end"
          sx={{ mt: "0.5rem" }}
        >
          Kelowna, BC
        </Typography>
      </Box>
    </>
  );
};

export default HomeEmptyState;
