import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Container, Box, Typography, Button, Collapse } from "@mui/material";

export const PageContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#000",
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
        color: "#051E36",
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

export const HoverBox = ({ handleClick, open, children }) => {
  return (
    <Box
      onClick={handleClick}
      sx={{
        padding: "8px 16px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        backgroundColor: open ? "#051E36" : "#fff",
        "& > *": {
          position: "relative",
          zIndex: 1,
          color: open ? "#fff" : "#000",
          transition: "color 0.5s ease",
        },
        "& .logo-image": {
          filter: open ? "invert(100%)" : "none",
          transition: "filter 0.5s ease",
        },
        "&:hover .logo-image": {
          filter: "invert(100%)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#051E36",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.5s ease",
          zIndex: 0,
        },
        "&:hover::before": {
          transform: "translateX(0)",
        },
        "&:hover > *": {
          color: "#fff",
        },
      }}
    >
      {children}
    </Box>
  );
};

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
    <Box>
      <HoverBox handleClick={handleClick} open={open} isProject={isProject}>
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
              // width: "1rem",
              height: "1rem",
            }}
          />
        )}
        {caption && (
          <Typography sx={{ fontSize: "1.2em", color: "#666" }}>
            {caption}
          </Typography>
        )}
      </HoverBox>
      <Collapse
        in={open}
        timeout="auto"
        sx={{
          padding: `0.5rem 1rem`,
          mb: open && "1rem",
        }}
      >
        {children}
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
      <Typography sx={{ fontSize: "1.2em", color: "#666" }}>
        Please select more filters
      </Typography>
    </Box>
  );
};

export const BulletPoint = styled(Box)({
  display: "flex",
  lineHeight: 1.5,
});

// <Button
// key={index}
// disableRipple
// onClick={() => handleTagClick(tag)}
// sx={{
//   backgroundColor: selected.includes(tag)
//     ? "#051E36"
//     : "#e0e0e0",
//   color: selected.includes(tag) ? "#fff" : "#000",
//   padding: "0.5rem 1rem",
//   borderRadius: "0",
//   textTransform: "capitalize",
//   fontSize: "0.8rem",
//   "&:hover": {
//     color: selected.includes(tag) ? "#fff" : "#000",
//     backgroundColor: selected.includes(tag)
//       ? "#333"
//       : "#d0d0d0",
//   },
// }}
// >
// {tag}
// </Button>
export const TagButton = styled(Button)(({ theme, selected }) => ({
  backgroundColor: selected ? "#051E36" : "#e0e0e0",
  color: selected ? "#fff" : "#000",
  padding: "0.5rem 1rem",
  borderRadius: "0",
  textTransform: "capitalize",
  fontSize: "0.8rem",
  "&:hover": {
    color: selected ? "#fff" : "#000",
    backgroundColor: selected ? "#333" : "#d0d0d0",
  },
}));
