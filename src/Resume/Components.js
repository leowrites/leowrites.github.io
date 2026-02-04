import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Container, Box, Typography, Button, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const PageContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

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

export const EntryHeader = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
});

export const EntryTitle = styled(Typography)({
  fontWeight: "bold",
});

export const TextContainer = ({ children }) => {
  return children;
};

export const EntrySubtitle = styled(Typography)({});

export const EntryDate = styled(Typography)({});

export const EntryContainer = ({
  date,
  company,
  caption = "",
  isProject,
  logo,
  children,
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={(theme) => ({
        margin: "1rem 0",
        borderRadius: "1rem",
        overflow: "hidden",
        backgroundColor: open
          ? theme.palette.action.selected
          : theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.background.paper,
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor:
            !open &&
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
        <ExpandMoreIcon
          sx={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            color: (theme) => theme.palette.text.primary,
          }}
        />
      </Box>
      <Collapse in={open} timeout={300}>
        <Box
          sx={{
            padding: "0 1rem 1rem 1rem",
          }}
        >
          {children}
        </Box>
      </Collapse>
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

export const BulletPoint = styled(Box)({
  display: "flex",
  lineHeight: 1.5,
});

export const TagButton = styled(Button)(({ theme, selected }) => ({
  backgroundColor: selected
    ? theme.palette.primary.main
    : theme.palette.action.selected,
  color: selected ? theme.palette.common.white : theme.palette.text.primary,
  padding: "0.5rem 1rem",
  borderRadius: "0",
  textTransform: "capitalize",
  fontSize: "0.8rem",
  "&:hover": {
    color: selected ? theme.palette.common.white : theme.palette.text.primary,
    backgroundColor: selected
      ? theme.palette.primary.dark
      : theme.palette.action.hover,
  },
}));
