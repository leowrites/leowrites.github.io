import {
  Box,
  Typography,
  Button,
  Popover,
  Chip,
  alpha,
  useTheme,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useState, useContext } from "react";
import { ColorModeContext } from "../theme";

export const ResumeNavbar = ({
  categoryToTags,
  selected,
  handleTagClick,
  handleSelectAll,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // Calculate total possible tags to determine if "All" is selected
  const allTagsCount = Object.values(categoryToTags).reduce(
    (acc, tags) => acc + tags.length,
    0
  );
  const isAllSelected = selected.length === allTagsCount;

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: theme.palette.background.default,
        py: 1,
        px: matches ? "4rem" : "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button
        aria-describedby={id}
        variant="outlined"
        onClick={handleClick}
        disableRipple
        sx={{
          color: "inherit",
          borderRadius: "1rem",
          borderColor: "divider",
        }}
      >
        <FilterListIcon />
      </Button>

      {/* Theme Toggle */}
      <IconButton
        onClick={colorMode.toggleColorMode}
        color="inherit"
        disableRipple
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        elevation={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            margin: "0.5rem 0",
            padding: "1rem",
            maxHeight: "60vh",
            overflowY: "auto",
            borderRadius: "1rem",
            border: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Filter by Tags
          </Typography>
          <Button
            onClick={handleSelectAll}
            size="small"
            disableRipple
            sx={{ textTransform: "none" }}
          >
            {isAllSelected ? "Deselect All" : "Select All"}
          </Button>
        </Box>

        {Object.entries(categoryToTags).map(([key, value], index) => (
          <Box key={index} mb={3}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mb: 1, fontSize: "0.75rem" }}
            >
              {key}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {value.map((tag, idx) => {
                const isSelected = selected.includes(tag);
                return (
                  <Chip
                    key={idx}
                    label={tag}
                    onClick={() => handleTagClick(tag)}
                    color={isSelected ? "secondary" : "default"}
                    variant={isSelected ? "filled" : "outlined"}
                    clickable
                    disableRipple
                    sx={{
                      borderRadius: "1rem",
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        ))}
      </Popover>
    </Box>
  );
};
