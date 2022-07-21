import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import FeedbackTextField from "./FeedbackTextField";
import Stack from "@mui/material/Stack";

export default function () {
  const validationSchema = yup.object().shape({
    email: yup.string().email("Must be a valid email").required("Required"),
    name: yup.string().required("Required"),
    message: yup.string(),
  });
  return (
    <Container
      sx={{
        textAlign: "start",
        width: "20rem",
        minWidth: "fit-content",
        maxHeight: "fit-content",
        borderRadius: "1rem",
        backgroundColor: "black",
        p: 2,
        display: "block",
      }}
    >
      <Typography variant="h5" sx={{ color: "white", display: "block", mb: 2 }}>
        Let's Stay In Touch!
      </Typography>
      <Formik
        initialValues={{ email: "", name: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            console.log(values);
          }, 1000);
        }}
      >
        {({ isSubmitting, handleChange }) => (
          <Form>
            <Box>
              <Stack spacing={2}>
                <Box>
                  <Typography color="primary">Email</Typography>
                  <FeedbackTextField
                    id="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="example@mail.com"
                  />
                  <ErrorMessage name="email">
                    {(msg) => <Typography color="primary">{msg}</Typography>}
                  </ErrorMessage>
                </Box>
                <Box>
                  <Typography color="primary">Your Name</Typography>
                  <FeedbackTextField
                    id="name"
                    name="name"
                    onChange={handleChange}
                  />
                  <ErrorMessage name="name">
                    {(msg) => <Typography color="primary">{msg}</Typography>}
                  </ErrorMessage>
                </Box>
                <Box>
                  <Typography color="primary">Leave a Message!</Typography>
                  <FeedbackTextField
                    id="message"
                    name="message"
                    onChange={handleChange}
                    multiline
                    rows={3}
                  />
                </Box>
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: "black",
                    width: "50%",
                    height: "2rem",
                    ":hover": {
                      backgroundColor: (theme) => theme.palette.primary.main,
                    },
                  }}
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Stack>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
