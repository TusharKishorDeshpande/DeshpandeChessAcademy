import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap, Trophy, Users, Target } from "lucide-react";
import Hero from "../components/layout/Hero";
import Footer from "../components/layout/Footer";
import founder_image from "../assets/Tushar_Deshpande.jpg";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const features = [
  {
    icon: <GraduationCap size={40} />,
    title: "Expert Training",
    description: "Learn from experienced chess masters and certified trainers.",
  },
  {
    icon: <Trophy size={40} />,
    title: "Tournaments",
    description: "Regular tournaments and competitions for all skill levels.",
  },
  {
    icon: <Users size={40} />,
    title: "Community",
    description: "Join a vibrant community of chess enthusiasts.",
  },
  {
    icon: <Target size={40} />,
    title: "All Levels",
    description: "Programs for beginners to advanced players.",
  },
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ overflow: "hidden", width: "100%" }}>
      {/* Hero Section with Chess Board */}
      <Hero />

      {/* Founder Section */}
      <Box
        component={motion.section}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        sx={{
          py: { xs: 6, md: 12 },
          px: { xs: 2, sm: 4 },
          background: "linear-gradient(145deg, #000000 0%, #1a1a1a 100%)",
          color: "#FFD700",
          mt: { xs: 8, md: 0 }, // Add top margin on mobile to account for navbar
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{
                  display: "flex",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <Box
                  component="img"
                  src={founder_image}
                  alt="Founder of Deshpande Chess Academy"
                  sx={{
                    width: "100%",
                    maxWidth: { xs: "100%", sm: 400, md: 500 },
                    height: { xs: "auto", sm: "25rem", md: "30rem" },
                    objectFit: "cover",
                    borderRadius: "20px",
                    boxShadow: "0 0 30px rgba(255, 215, 0, 0.2)",
                    border: "3px solid #FFD700",
                  }}
                />
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Typography
                  variant={isMobile ? "h3" : "h2"}
                  gutterBottom
                  sx={{
                    color: "#FFD700",
                    fontWeight: "bold",
                    textShadow: "0 0 10px rgba(255, 215, 0, 0.3)",
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  Meet Our Founder
                </Typography>
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  gutterBottom
                  sx={{
                    color: "#FFD700",
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  Mr. Tushar Deshpande
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#FFF",
                    mb: 3,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    lineHeight: 1.8,
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  With over 10 years of experience in competitive chess and
                  coaching, Tushar Deshpande has dedicated his life to nurturing
                  young talent and promoting the royal game. He holds a FIDE
                  Classical rating of 1404, a Rapid rating of 1420, and a Blitz
                  rating of 1471. As a certified National Arbiter, he combines
                  his deep understanding of chess strategy with innovative
                  teaching methods to guide students towards their full
                  potential. His commitment and passion have helped countless
                  young players develop strong foundations, sharpen their
                  skills, and achieve success in tournaments.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: { xs: 2, sm: 3 },
                    mt: 4,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant={isMobile ? "h5" : "h4"}
                      sx={{ color: "#FFD700" }}
                    >
                      10+
                    </Typography>
                    <Typography sx={{ color: "#FFF" }}>
                      Years Experience
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant={isMobile ? "h5" : "h4"}
                      sx={{ color: "#FFD700" }}
                    >
                      200+
                    </Typography>
                    <Typography sx={{ color: "#FFF" }}>
                      Students Trained
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant={isMobile ? "h5" : "h4"}
                      sx={{ color: "#FFD700" }}
                    >
                      50+
                    </Typography>
                    <Typography sx={{ color: "#FFF" }}>
                      Championships
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        component={motion.section}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        sx={{
          py: { xs: 6, md: 12 },
          px: { xs: 2, sm: 4 },
          background: "linear-gradient(145deg, #000000 0%, #1a1a1a 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? "h3" : "h2"}
            component="h2"
            align="center"
            gutterBottom
            sx={{
              color: "#FFD700",
              fontWeight: "bold",
              mb: { xs: 4, md: 6 },
              textShadow: "0 0 10px rgba(255, 215, 0, 0.3)",
            }}
          >
            Our Services
          </Typography>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={fadeInUp}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      background: "#000000",
                      backdropFilter: "blur(10px)",
                      borderRadius: 4,
                      border: "1px solid #FFD700",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
                      },
                    }}
                  >
                    <CardContent
                      sx={{ p: { xs: 3, md: 4 }, textAlign: "center" }}
                    >
                      <Box
                        sx={{
                          display: "inline-flex",
                          p: { xs: 1.5, md: 2 },
                          borderRadius: "50%",
                          bgcolor: "#FFD700",
                          color: "#000000",
                          mb: 2,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant={isMobile ? "h6" : "h5"}
                        component="h3"
                        gutterBottom
                        sx={{ color: "#FFD700", fontWeight: "bold" }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#FFD700",
                          fontSize: { xs: "0.9rem", md: "1rem" },
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Home;
