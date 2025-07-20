import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Award,
  Target,
  Users,
  MapPin,
  Mail,
  Phone,
  Heart,
} from "lucide-react";
import Footer from "../components/layout/Footer";
import Academy_Students from "../assets/Academy_Students.jpg";
import founder_image from "../assets/Founder_Image.jpg";

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const missionPoints = [
    "Provide high-quality chess education to players of all ages and skill levels",
    "Foster a supportive community that encourages growth and learning",
    "Promote critical thinking, strategic planning, and mental discipline",
    "Prepare students for competitive play at local, national, and international levels",
    "Make chess accessible to everyone regardless of financial background",
  ];

  const historyTimeline = [
    {
      year: "2016",
      title: "Academy Founded",
      description:
        "Founded on October 15th by Mr. Kishor Deshpande to bring world-class chess training to remote areas",
    },
    {
      year: "2018",
      title: "FIDE Rated Players",
      description: "Produced our first FIDE rated players from rural areas",
    },
    {
      year: "2020",
      title: "Online Expansion",
      description:
        "Expanded to online coaching, reaching students across the country",
    },
    {
      year: "2022",
      title: "Tournament Success",
      description:
        "Students achieved wins against International Masters and players rated above 2000",
    },
    {
      year: "2024",
      title: "New Leadership",
      description:
        "After Mr. Kishor's passing, his son Tushar Deshpande continues the legacy as head coach",
    },
  ];

  return (
    <Box sx={{ overflow: "hidden", width: "100%" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "40vh", md: "50vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/chess-pieces-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          mb: 6,
          mt: { xs: 8, md: 0 }, // Add top margin on mobile to account for navbar
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant={isMobile ? "h3" : "h1"}
              component="h1"
              align="center"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#FFD700",
                textShadow: "0 0 10px rgba(0,0,0,0.5)",
              }}
            >
              About Our Academy
            </Typography>
            <Typography
              variant={isMobile ? "body1" : "h6"}
              align="center"
              sx={{
                maxWidth: "800px",
                mx: "auto",
                color: "white",
              }}
            >
              Where dedication turns dreams into moves, and every checkmate
              starts with belief
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Box
        sx={{
          background: "linear-gradient(145deg, #000000 0%, #1a1a1a 100%)",
          color: "#FFF",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  component="h2"
                  gutterBottom
                  sx={{ color: "#FFD700", fontWeight: "bold" }}
                >
                  Our Story
                </Typography>
                <Typography variant="body1" paragraph>
                  Deshpande Chess Academy was founded on 15th October 2016 by
                  Mr. Kishor Deshpande, a dedicated chess mentor who dreamed of
                  bringing world-class chess training to students in remote
                  areas. Through his hard work and passion, the academy became a
                  nurturing ground for young talents who could not afford
                  expensive coaching in big cities.
                </Typography>
                <Typography variant="body1" paragraph>
                  After Mr. Kishor Deshpande's untimely passing in 2024, his
                  legacy lives on through his son, Mr. Tushar Deshpande, who has
                  been coaching students alongside his father for the past 8
                  years. Now the co-founder and head coach, Tushar continues to
                  inspire and guide students with the same commitment and vision
                  his father instilled in the academy.
                </Typography>
                <Typography variant="body1">
                  Despite being based in rural areas, Deshpande Chess Academy
                  has produced more than 20 players with official FIDE ratings,
                  with many students achieving outstanding wins against
                  International Masters (IMs), Grandmasters (GMs), and other
                  strong players rated above 2000.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={founder_image}
                    alt="Tushar Deshpande - Head Coach"
                    sx={{
                      width: { xs: "100%", sm: "80%", md: "100%" },
                      height: "auto",
                      maxWidth: { xs: "300px", md: "400px" },
                      borderRadius: 2,
                      boxShadow: "0 0 30px rgba(255, 215, 0, 0.2)",
                      border: "3px solid #FFD700",
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Students Section */}
      <Box
        sx={{
          background: "linear-gradient(145deg, #1a1a1a 0%, #000000 100%)",
          color: "#FFF",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
            direction={isMobile ? "column-reverse" : "row"}
          >
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={Academy_Students}
                    alt="Deshpande Chess Academy Students"
                    sx={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 2,
                      boxShadow: "0 0 30px rgba(255, 215, 0, 0.2)",
                      border: "3px solid #FFD700",
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  component="h2"
                  gutterBottom
                  sx={{ color: "#FFD700", fontWeight: "bold" }}
                >
                  Our Approach
                </Typography>
                <Typography variant="body1" paragraph>
                  Our academy is known for providing high-quality chess training
                  at very reasonable fees, making it possible for every
                  passionate student to receive the best coaching regardless of
                  their financial background. We believe that true talent can
                  come from anywhere — all it needs is the right guidance and
                  opportunities to shine.
                </Typography>
                <Typography variant="body1" paragraph>
                  Today, Deshpande Chess Academy stands as a symbol of hope and
                  success for young chess enthusiasts in underrepresented
                  regions. With regular training camps, online coaching,
                  participation in tournaments at all levels, and personalized
                  mentorship, we aim to shape skilled players, confident
                  individuals, and future champions.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    mt: 4,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant={isMobile ? "h5" : "h4"}
                      sx={{ color: "#FFD700" }}
                    >
                      20+
                    </Typography>
                    <Typography sx={{ color: "#FFF" }}>
                      FIDE Rated Players
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant={isMobile ? "h5" : "h4"}
                      sx={{ color: "#FFD700" }}
                    >
                      8+
                    </Typography>
                    <Typography sx={{ color: "#FFF" }}>
                      Years of Excellence
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission and Values */}
      <Box
        sx={{
          background: "linear-gradient(145deg, #000000 0%, #1a1a1a 100%)",
          color: "#FFF",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant={isMobile ? "h4" : "h3"}
              component="h2"
              align="center"
              gutterBottom
              sx={{ color: "#FFD700", fontWeight: "bold", mb: 4 }}
            >
              Our Mission & Values
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    height: "100%",
                    bgcolor: "rgba(0, 0, 0, 0.7)",
                    border: "1px solid rgba(255, 215, 0, 0.3)",
                    color: "#FFF",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ color: "#FFD700", fontWeight: "bold" }}
                  >
                    Our Mission
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ color: "#FFF" }}>
                    To make quality chess education accessible to everyone,
                    especially students from remote areas who have limited
                    access to professional coaching.
                  </Typography>
                  <List>
                    {missionPoints.map((point, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircle size={20} color="#FFD700" />
                        </ListItemIcon>
                        <ListItemText primary={point} sx={{ color: "#FFF" }} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    height: "100%",
                    bgcolor: "rgba(0, 0, 0, 0.7)",
                    border: "1px solid rgba(255, 215, 0, 0.3)",
                    color: "#FFF",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ color: "#FFD700", fontWeight: "bold" }}
                  >
                    Our Values
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {[
                      {
                        icon: <Award size={24} />,
                        title: "Excellence",
                        desc: "Striving for the highest standards in teaching and learning",
                      },
                      {
                        icon: <Target size={24} />,
                        title: "Accessibility",
                        desc: "Making quality chess education affordable for everyone",
                      },
                      {
                        icon: <Users size={24} />,
                        title: "Community",
                        desc: "Creating a supportive environment for all players",
                      },
                      {
                        icon: <Heart size={24} />,
                        title: "Passion",
                        desc: "Nurturing a deep love for the royal game of chess",
                      },
                    ].map((value, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Card
                          elevation={0}
                          sx={{
                            bgcolor: "transparent",
                            height: "100%",
                            border: "none",
                          }}
                        >
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Box sx={{ color: "#FFD700", mr: 1 }}>
                                {value.icon}
                              </Box>
                              <Typography
                                variant="h6"
                                component="h4"
                                sx={{ fontWeight: "bold", color: "#FFD700" }}
                              >
                                {value.title}
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: "#FFF" }}>
                              {value.desc}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* History Timeline */}
      <Box
        sx={{
          background: "linear-gradient(145deg, #1a1a1a 0%, #000000 100%)",
          color: "#FFF",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant={isMobile ? "h4" : "h3"}
              component="h2"
              align="center"
              gutterBottom
              sx={{ color: "#FFD700", fontWeight: "bold", mb: 6 }}
            >
              Our Journey
            </Typography>
          </motion.div>

          <Box sx={{ position: "relative" }}>
            {/* Timeline for desktop */}
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                position: "relative",
                width: "100%",
              }}
            >
              {/* Timeline line */}
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "4px",
                  height: "100%",
                  bgcolor: "#FFD700",
                  zIndex: 0,
                }}
              />

              {/* Timeline events */}
              {historyTimeline.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      mb: 4,
                      flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                    }}
                  >
                    <Grid
                      item
                      md={5}
                      sx={{
                        textAlign: index % 2 === 0 ? "right" : "left",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "bold",
                          color: "#FFD700",
                          mt: 2,
                        }}
                      >
                        {event.year}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      md={2}
                      sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          bgcolor: "#FFD700",
                          border: "4px solid #000",
                          boxShadow: "0 0 0 3px #FFD700",
                          zIndex: 1,
                          mt: 2,
                        }}
                      />
                    </Grid>
                    <Grid item md={5}>
                      <Paper
                        elevation={2}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: "rgba(0, 0, 0, 0.7)",
                          border: "1px solid rgba(255, 215, 0, 0.3)",
                          color: "#FFF",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", color: "#FFD700" }}
                        >
                          {event.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#FFF" }}>
                          {event.description}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </motion.div>
              ))}
            </Box>

            {/* Timeline for mobile - completely different layout */}
            <Box
              sx={{
                display: { xs: "block", md: "none" },
                position: "relative",
                width: "100%",
                pl: 4, // Space for the timeline on the left
              }}
            >
              {/* Timeline line for mobile */}
              <Box
                sx={{
                  position: "absolute",
                  left: "15px",
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  bgcolor: "#FFD700",
                  zIndex: 0,
                }}
              />

              {/* Timeline events for mobile */}
              {historyTimeline.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Year marker */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: "-27px", // Center on the timeline
                      top: "24px",
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      bgcolor: "#000",
                      border: "2px solid #FFD700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        bgcolor: "#FFD700",
                      }}
                    />
                  </Box>

                  {/* Content box */}
                  <Box sx={{ mb: 5, mt: 1 }}>
                    {/* Year */}
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: "bold",
                        color: "#FFD700",
                        mb: 1,
                      }}
                    >
                      {event.year}
                    </Typography>

                    {/* Event content */}
                    <Paper
                      elevation={3}
                      sx={{
                        p: 2.5,
                        borderRadius: 2,
                        bgcolor: "rgba(0, 0, 0, 0.7)",
                        border: "1px solid rgba(255, 215, 0, 0.3)",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#FFD700",
                          fontSize: "1.3rem",
                          mb: 1,
                        }}
                      >
                        {event.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#FFF",
                          fontSize: "1rem",
                          lineHeight: 1.6,
                        }}
                      >
                        {event.description}
                      </Typography>
                    </Paper>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Contact Information */}
      <Box
        sx={{
          background: "linear-gradient(145deg, #000000 0%, #1a1a1a 100%)",
          color: "white",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant={isMobile ? "h4" : "h3"}
              component="h2"
              align="center"
              gutterBottom
              sx={{ color: "#FFD700", fontWeight: "bold", mb: 4 }}
            >
              Visit Us
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <MapPin
                      size={24}
                      color="#FFD700"
                      style={{ marginRight: 10 }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Our Location
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    Deshpande Chess Academy, Goregaon , Maharashtra 402104
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Mail
                      size={24}
                      color="#FFD700"
                      style={{ marginRight: 10 }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Email Us
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    deshpande.chess.academy.web@gmail.com
                  </Typography>
                </Box>

                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Phone
                      size={24}
                      color="#FFD700"
                      style={{ marginRight: 10 }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Call Us
                    </Typography>
                  </Box>
                  <Typography variant="body1">+91 8007646492</Typography>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: "250px", sm: "300px", md: "350px" },
                    border: "2px solid #FFD700",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3791.174231045579!2d73.29757941079183!3d18.155886080140636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be82de1b400ef83%3A0x60634212101e7130!2zRGVzaHBhbmRlIENoZXNzIEFjYWRlbXkg4KSm4KWH4KS24KSq4KS-4KSC4KSh4KWHIOCkmuClh-CkuCDgpbLgpJXgpYXgpKHgpK7gpYAu!5e0!3m2!1sen!2sin!4v1752966007815!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Academy Location"
                  ></iframe>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default About;
