import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const CustomField = styled(TextField)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    color: theme.palette.primary.main,
    borderBottom: "1px solid #ced4da",
    fontSize: 14,
    padding: "10px 12px",
  },
  "& .MuiInput-root": {
    padding: 0,
  },
  "& MuiInputBase-multiline": {
    padding: 0,
  },
}));

export default function FeedbackTextField({ ...props }) {
  return <CustomField {...props} fullWidth variant="standard" />;
}
