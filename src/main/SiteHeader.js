import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import PersonalImageSlicesCard from "./PersonalImageSlicesCard";

const SiteHeader = ({ personalInfo, variant = "default" }) => {
  const isDetailPane = variant === "detailPane";

  const withProtocol = (url) =>
    !url ? "#" : /^https?:\/\//i.test(url) ? url : `https://${url}`;

  return (
    <Box
      sx={{
        mb: isDetailPane ? 0 : "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mb: "1rem",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          Hello!
        </Typography>
        <Box
          component="img"
          src="/IMG_1822.JPG"
          alt="Portrait of Leo"
          sx={{
            width: isDetailPane ? 160 : 200,
            height: isDetailPane ? 160 : 200,
            borderRadius: "1rem",
            objectFit: "cover",
            flexShrink: 2,
          }}
        />
      </Box>
      {personalInfo.description.map((info, index) => {
        return (
          <Typography
            key={index}
            variant={isDetailPane ? "body1" : "h6"}
            sx={{ mb: "0.5rem", color: "text.secondary" }}
          >
            {info}
          </Typography>
        );
      })}
      <PersonalImageSlicesCard />
      {personalInfo.now && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: "1rem",
            bgcolor: isDetailPane ? "action.selected" : "action.hover",
          }}
        >
          <Typography sx={{ mb: 1, color: "text.secondary", fontWeight: 600 }}>
            Now
          </Typography>
          <Stack spacing={0.75}>
            {personalInfo.now.focus && (
              <Typography variant="body2" color="text.secondary">
                <Box
                  component="span"
                  sx={{ color: "text.primary", fontWeight: 600 }}
                >
                  Focus:
                </Box>{" "}
                {personalInfo.now.focus}
              </Typography>
            )}
            {personalInfo.now.learning && (
              <Typography variant="body2" color="text.secondary">
                <Box
                  component="span"
                  sx={{ color: "text.primary", fontWeight: 600 }}
                >
                  Learning:
                </Box>{" "}
                {personalInfo.now.learning}
              </Typography>
            )}
            {personalInfo.now.building && (
              <Typography variant="body2" color="text.secondary">
                <Box
                  component="span"
                  sx={{ color: "text.primary", fontWeight: 600 }}
                >
                  Building:
                </Box>{" "}
                {personalInfo.now.building}
              </Typography>
            )}
          </Stack>
        </Box>
      )}
      <Box
        sx={{
          mt: 2,
          p: 2,
          borderRadius: "1rem",
          bgcolor: isDetailPane ? "action.selected" : "action.hover",
        }}
      >
        <Typography sx={{ mb: 1, color: "text.secondary", fontWeight: 600 }}>
          Let's connect
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <Chip
            clickable
            component="a"
            href={`mailto:${personalInfo.email}`}
            label=" Email"
            sx={{ borderRadius: "999px" }}
          />
          <Chip
            clickable
            component="a"
            href={withProtocol(personalInfo.linkedin)}
            target="_blank"
            rel="noopener noreferrer"
            label="LinkedIn"
            sx={{ borderRadius: "999px" }}
          />
          <Chip
            clickable
            component="a"
            href={withProtocol(personalInfo.github)}
            target="_blank"
            rel="noopener noreferrer"
            label="GitHub"
            sx={{ borderRadius: "999px" }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default SiteHeader;
