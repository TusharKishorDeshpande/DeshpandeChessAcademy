import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, Crown, Shield, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { auth } from "../../utils/api";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError("");
        const response = await auth.login(values);
        localStorage.setItem("token", response.data.token);
        navigate("/admin");
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to login. Please try again."
        );
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(145deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Chess Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='1'%3E%3Crect width='30' height='30'/%3E%3Crect x='30' y='30' width='30' height='30'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Back to Home Button */}
      <Box
        component={Link}
        to="/"
        sx={{
          position: "absolute",
          top: { xs: 20, md: 40 },
          left: { xs: 20, md: 40 },
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "#FFD700",
          textDecoration: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            color: "#FDB931",
            transform: "translateX(-4px)",
          },
        }}
      >
        <ChevronLeft size={20} />
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          Back to Home
        </Typography>
      </Box>

      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header Section */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #FFD700, #FDB931)",
                  mb: 3,
                  boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)",
                }}
              >
                <Shield size={40} color="#000" />
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Typography
                variant={isMobile ? "h4" : "h3"}
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(45deg, #FFD700, #FDB931)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  mb: 1,
                }}
              >
                Admin Portal
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#FFD700",
                  opacity: 0.8,
                  fontSize: "1.1rem",
                }}
              >
                Deshpande Chess Academy
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 215, 0, 0.6)",
                  mt: 1,
                }}
              >
                Sign in to access the admin dashboard
              </Typography>
            </motion.div>
          </Box>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 215, 0, 0.2)",
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      bgcolor: "rgba(244, 67, 54, 0.1)",
                      border: "1px solid rgba(244, 67, 54, 0.3)",
                      color: "#ff6b6b",
                      "& .MuiAlert-icon": {
                        color: "#ff6b6b",
                      },
                    }}
                  >
                    {error}
                  </Alert>
                </motion.div>
              )}

              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  margin="normal"
                  autoComplete="email"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      "& fieldset": {
                        borderColor: "rgba(255, 215, 0, 0.3)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 215, 0, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#FFD700",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 215, 0, 0.7)",
                      "&.Mui-focused": {
                        color: "#FFD700",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      color: "#fff",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  margin="normal"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                          sx={{
                            color: "rgba(255, 215, 0, 0.7)",
                            "&:hover": {
                              color: "#FFD700",
                              bgcolor: "rgba(255, 215, 0, 0.1)",
                            },
                          }}
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      "& fieldset": {
                        borderColor: "rgba(255, 215, 0, 0.3)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 215, 0, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#FFD700",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 215, 0, 0.7)",
                      "&.Mui-focused": {
                        color: "#FFD700",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      color: "#fff",
                    },
                  }}
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={formik.isSubmitting}
                    sx={{
                      mt: 4,
                      py: 1.5,
                      background: "linear-gradient(45deg, #FFD700, #FDB931)",
                      color: "#000",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      borderRadius: 2,
                      textTransform: "none",
                      boxShadow: "0 4px 20px rgba(255, 215, 0, 0.3)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #FDB931, #FFD700)",
                        boxShadow: "0 6px 25px rgba(255, 215, 0, 0.4)",
                      },
                      "&:disabled": {
                        background: "rgba(255, 215, 0, 0.3)",
                        color: "rgba(0, 0, 0, 0.5)",
                      },
                    }}
                  >
                    {formik.isSubmitting ? "Signing In..." : "Sign In"}
                  </Button>
                </motion.div>
              </form>

              {/* Additional Info */}
              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 215, 0, 0.6)",
                    fontSize: "0.9rem",
                  }}
                >
                  Secure admin access for Deshpande Chess Academy
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>

      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: 100,
          height: 100,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)",
          animation: "pulse 4s ease-in-out infinite",
          "@keyframes pulse": {
            "0%, 100%": { transform: "scale(1)", opacity: 0.5 },
            "50%": { transform: "scale(1.1)", opacity: 0.8 },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          left: "15%",
          width: 60,
          height: 60,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 70%)",
          animation: "pulse 3s ease-in-out infinite reverse",
        }}
      />
    </Box>
  );
};

export default Login;
