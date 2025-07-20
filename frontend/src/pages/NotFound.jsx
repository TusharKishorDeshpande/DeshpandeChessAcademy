import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Crown } from "lucide-react";
import Footer from "../components/layout/Footer";

const NotFound = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ overflow: "hidden", width: "100%" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(145deg, #000000 0%, #1a1a1a 100%)",
          color: "#FFD700",
          mt: { xs: 8, md: 0 }, // Add top margin on mobile to account for navbar
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              py: { xs: 8, md: 12 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Crown size={isMobile ? 100 : 150} color="#FFD700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Typography
                variant={isMobile ? "h2" : "h1"}
                component="h1"
                sx={{
                  fontWeight: "bold",
                  color: "#FFD700",
                  textShadow: "0 0 10px rgba(255, 215, 0, 0.3)",
                  mt: 4,
                }}
              >
                404
              </Typography>
              <Typography
                variant={isMobile ? "h4" : "h3"}
                component="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#FFD700",
                  mb: 2,
                }}
              >
                Page Not Found
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#FFF",
                  mb: 4,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  maxWidth: "600px",
                  mx: "auto",
                }}
              >
                Oops! It seems like you've made an illegal move. The page you're
                looking for doesn't exist or has been moved.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  sx={{
                    bgcolor: "#FFD700",
                    color: "#000",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      bgcolor: "#e6c200",
                    },
                  }}
                >
                  Back to Home
                </Button>
                <Button
                  component={Link}
                  to="/contact"
                  variant="outlined"
                  sx={{
                    borderColor: "#FFD700",
                    color: "#FFD700",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      borderColor: "#e6c200",
                      bgcolor: "rgba(255, 215, 0, 0.1)",
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Box
                sx={{
                  mt: 8,
                  p: 3,
                  border: "1px solid rgba(255, 215, 0, 0.3)",
                  borderRadius: 2,
                  maxWidth: "600px",
                  mx: "auto",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#FFD700",
                    fontWeight: "bold",
                    mb: 1,
                  }}
                >
                  Looking for something specific?
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#FFF",
                  }}
                >
                  Try navigating using the menu above or contact us if you need
                  assistance finding what you're looking for.
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default NotFound;
