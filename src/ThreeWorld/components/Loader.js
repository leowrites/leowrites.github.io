import { useProgress } from "@react-three/drei";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import "./Loader.css";
export default function Loader() {
  const { progress, item, loaded, total } = useProgress();
  console.log(item, loaded, total);
  return (
    <Box id={"loader"}>
      <Stack>
        <Typography sx={{ color: "white", fontSize: "8rem" }}>
          Siqi Liu
        </Typography>
        <Typography sx={{ color: "white", fontSize: "2rem" }}>
          Loading... {progress}%
        </Typography>
      </Stack>
    </Box>
  );
}
