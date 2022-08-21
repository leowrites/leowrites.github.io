import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import emailjs from "@emailjs/browser";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IconButton from "@mui/material/IconButton";
import * as yup from "yup";

const CustomTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "black",
    color: "white",
  },
  "& label": {
    color: "white",
  },
}));

export default function Page() {
  const validationSchema = yup.object().shape({
    email: yup.string().email("Must be a valid email").required("Required"),
    name: yup.string().required("Required"),
    message: yup.string().required("Required"),
  });
  const handleSendEmail = (values) => {
    // need to clear the form and show a success message
    setLoading(true);
    setTimeout(() => {
      emailjs
        .send(
          "service_s8b47h2",
          "template_saq5o0m",
          values,
          "8A7TK10FZ0vwaQH8J"
        )
        .then(
          (result) => {
            console.log(result.text);
            setEmailSent(true);
            setLoading(false);
          },
          (error) => {
            console.log(error.text);
            setLoading(false);
          }
        );
    }, 1000);
  };
  const [loading, setLoading] = useState(false);
  // prevent user from sending more than 1 email
  const [emailSent, setEmailSent] = useState(false);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        maxHeight: "fit-content",
        textAlign: "start",
        zIndex: 1,
      }}
    >
      <Box
        id="text-box"
        sx={{
          pt: "10rem",
        }}
      >
        <Typography variant={"h2"}>Contact Me</Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant={"h5"} sx={{ pt: "1rem", mb: 2 }}>
            Connect with me on these platforms
          </Typography>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "2rem",
              width: "fit-content",
            }}
          >
            <IconButton
              onClick={() => window.open("https://github.com/leowrites")}
            >
              <GitHubIcon sx={{ color: "black", fontSize: "2rem" }} />
            </IconButton>
            <IconButton
              onClick={() =>
                window.open("https://www.linkedin.com/in/-siqi-liu-")
              }
            >
              <LinkedInIcon sx={{ color: "#00A0DC", fontSize: "2rem" }} />
            </IconButton>
          </Box>
        </Box>
        {emailSent ? (
          <Typography variant={"h5"}>
            <CheckCircleIcon sx={{ color: "green" }} /> Thank you for your
            message! I will get back to you as soon as possible.
          </Typography>
        ) : (
          <>
            <Typography variant={"h5"}>Or send me an email directly</Typography>
            <Formik
              initialValues={{ email: "", name: "", message: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleSendEmail(values);
              }}
            >
              {({ handleChange }) => (
                <Form>
                  <Grid container spacing={1} xs={12} md={6} sx={{ pt: 2 }}>
                    <Grid item xs={12} md={6}>
                      <CustomTextField
                        fullWidth
                        id="email"
                        name="email"
                        variant="outlined"
                        onChange={handleChange}
                        label={<Typography>Your Email</Typography>}
                      />
                      <ErrorMessage name="email">
                        {(msg) => (
                          <Typography color="primary">{msg}</Typography>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomTextField
                        fullWidth
                        id="name"
                        name="name"
                        variant="outlined"
                        onChange={handleChange}
                        label={<Typography>Name</Typography>}
                      />
                      <ErrorMessage name="name">
                        {(msg) => (
                          <Typography color="primary">{msg}</Typography>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField
                        fullWidth
                        id="message"
                        name="message"
                        rows={4}
                        variant="outlined"
                        onChange={handleChange}
                        label={<Typography>Say Something...</Typography>}
                      />
                      <ErrorMessage name="message">
                        {(msg) => (
                          <Typography color="primary">{msg}</Typography>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12}>
                      <LoadingButton
                        sx={{
                          backgroundColor: "black",
                          color: "white",
                          ".MuiLoadingButton-loadingIndicator": {
                            color: "white",
                          },
                        }}
                        type="submit"
                        loading={loading}
                        variant="contained"
                      >
                        Send!
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </>
        )}
      </Box>
    </Box>
  );
}
