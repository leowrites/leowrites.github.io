import React from "react";
import { Button, Link, Tooltip } from "@mui/material";

export const TooltipLink = ({
  href,
  tooltipText,
  children,
  variant = "text",
  icon,
  sx,
  ...props
}) => {
  const isButton = variant === "button" || variant === "outlined";

  const content = isButton ? (
    <Button
      variant="outlined"
      startIcon={icon}
      href={href}
      target="_blank"
      rel="noopener"
      disableRipple
      sx={{
        textTransform: "none",
        borderRadius: "1rem",
        fontWeight: 600,
        borderColor: "divider",
        color: "inherit",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  ) : (
    <Link
      href={href}
      color="secondary"
      underline="hover"
      target="_blank"
      rel="noopener"
      sx={sx}
      {...props}
    >
      {children}
    </Link>
  );

  if (!tooltipText) {
    return content;
  }

  return (
    <Tooltip title={tooltipText} followCursor placement="bottom">
      {content}
    </Tooltip>
  );
};
