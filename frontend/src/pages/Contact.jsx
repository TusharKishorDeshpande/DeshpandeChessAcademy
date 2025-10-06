import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { contact } from "../utils/api";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const contactInfo = [
  {
    icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
    title: "Visit Us",
    details: ["Chinchavali, Goregaon", "Maharashtra 402103"],
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 40 }} />,
    title: "Call Us",
    details: ["+91 8007646492", "Mon-Fri: 9am-6pm"],
  },
  {
    icon: <EmailIcon sx={{ fontSize: 40 }} />,
    title: "Email Us",
    details: ["deshpande.chess.academy.web@gmail.com"],
  },
];

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .max(50, "Name cannot be more than 50 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9-+()]*$/, "Invalid phone number")
    .max(20, "Phone number cannot be more than 20 characters"),
  subject: Yup.string().max(100, "Subject cannot be more than 100 characters"),
  message: Yup.string()
    .required("Message is required")
    .min(10, "Message is too short")
    .max(1000, "Message cannot be more than 1000 characters"),
});

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await contact.submit(values);
        setSubmitStatus({
          type: "success",
          message: "Thank you for your message. We will get back to you soon!",
        });
        resetForm();
      } catch (error) {
        setSubmitStatus({
          type: "error",
          message: "Failed to send message. Please try again later.",
        });
      }
    },
  });

  return (
    <Box
      sx={{ pt: 12, pb: 8, minHeight: "100vh", bgcolor: "background.default" }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h2" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Have questions? We'd love to hear from you.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Information Cards */}
          {contactInfo.map((info) => (
            <Grid item xs={12} md={4} key={info.title}>
              <Card sx={{ height: "100%", textAlign: "center" }}>
                <CardContent>
                  <Box sx={{ color: "primary.main", mb: 2 }}>{info.icon}</Box>
                  <Typography variant="h5" gutterBottom>
                    {info.title}
                  </Typography>
                  {info.details.map((detail, index) => (
                    <Typography key={index} color="text.secondary">
                      {detail}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Contact Form */}
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            mt: 6,
            p: 4,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Send us a Message
          </Typography>

          {submitStatus.message && (
            <Alert severity={submitStatus.type} sx={{ mb: 3 }}>
              {submitStatus.message}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="name"
                label="Your Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="email"
                label="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="phone"
                label="Phone Number (Optional)"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="subject"
                label="Subject (Optional)"
                value={formik.values.subject}
                onChange={formik.handleChange}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="message"
                label="Your Message"
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={formik.isSubmitting}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
