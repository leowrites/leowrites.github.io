import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import logo from "./logo.png";

export default function () {
  return (
    <AppBar
      sx={{
        zIndex: 9999,
        background: "transparent",
        boxShadow: "none",
      }}
      position="fixed"
    >
      <Box
        sx={{
          ml: 4,
          mt: 3,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="Siqi Liu"
          src={logo}
          sx={{
            mr: 1,
            borderRadius: "25%",
          }}
        />
        <a style={{ textDecoration: "none" }} href={"http://portfoliu.net"}>
          <Typography
            sx={{
              fontWeight: "bold",
            }}
            color="primary"
            variant={"h5"}
          >
            Siqi Liu
          </Typography>
        </a>
      </Box>
    </AppBar>
  );
}
