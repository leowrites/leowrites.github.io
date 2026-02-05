import { useState } from "react";
import { Box, Typography, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const SectionHeading = ({ children }) => {
  return (
    <Typography
      variant="h2"
      sx={{
        fontWeight: "bold",
        textAlign: "start",
        mt: "3rem",
        mb: "0.5rem",
        color: "text.primary",
      }}
    >
      {children}
    </Typography>
  );
};

export const EntryContainer = ({
  date,
  company,
  caption = "",
  logo,
  children,
  onSelect,
  selected = false,
  id,
}) => {
  const [expanded, setExpanded] = useState(false);

  // If onSelect is provided, we use selection mode (controlled).
  // Otherwise, we use expansion mode (uncontrolled).
  const isSelectionMode = !!onSelect;
  const showContent = isSelectionMode ? selected : expanded;

  const handleClick = () => {
    if (isSelectionMode) {
      onSelect();
    } else {
      setExpanded(!expanded);
    }
  };

  return (
    <Box
      id={id}
      sx={(theme) => ({
        margin: "1rem 0",
        borderRadius: "1rem",
        overflow: "hidden",
        backgroundColor: showContent
          ? theme.palette.action.selected
          : theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.background.paper,
        transition: "background-color 0.2s ease",
        border: selected ? `2px solid ${theme.palette.primary.main}` : "none",
        "&:hover": {
          backgroundColor:
            !showContent &&
            (theme.palette.mode === "light"
              ? theme.palette.grey[300]
              : theme.palette.action.hover),
        },
      })}
    >
      <Box
        onClick={handleClick}
        sx={(theme) => ({
          padding: "1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: theme.palette.text.primary,
          "& .logo-image": {
            filter: theme.palette.mode === "dark" ? "invert(1)" : "none",
            transition: "filter 0.2s ease",
          },
        })}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography>{date}</Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", display: "inline", mr: "1rem" }}
          >
            {company}
          </Typography>
          {logo && (
            <img
              src={logo}
              alt="Logo"
              className="logo-image"
              style={{
                display: "inline",
                height: "1rem",
              }}
            />
          )}
          {caption && (
            <Typography sx={{ fontSize: "1.2em", color: "text.secondary" }}>
              {caption}
            </Typography>
          )}
        </Box>
        {/* Only show expand icon if in expansion mode (not selection mode) */}
        {!isSelectionMode && (
          <ExpandMoreIcon
            sx={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
              color: (theme) => theme.palette.text.primary,
            }}
          />
        )}
      </Box>
      {/* If not selection mode, render collapsible children as before */}
      {!isSelectionMode && (
        <Collapse in={expanded} timeout={300}>
          <Box
            sx={{
              padding: "0 1rem 1rem 1rem",
            }}
          >
            {children}
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

export const EmptySectionText = ({ label }) => {
  return (
    <Box ml="1rem">
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: "1.2em", color: "text.secondary" }}>
        Please select more filters
      </Typography>
    </Box>
  );
};
