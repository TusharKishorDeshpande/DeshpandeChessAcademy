import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Rating,
  Avatar,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// Mock testimonial data
const MOCK_TESTIMONIALS = [
  {
    id: 1,
    name: "Aryan Sharma",
    rating: 5,
    message: "The coaching at Deshpande Chess Academy transformed my game completely. I went from a beginner to winning my first local tournament in just 8 months!",
    course: "Advanced Strategy"
  },
  {
    id: 2,
    name: "Priya Patel",
    rating: 5,
    message: "The instructors are incredibly patient and knowledgeable. My daughter has improved tremendously and enjoys every class. Highly recommended for children!",
    course: "Junior Champions Program"
  },
  {
    id: 3,
    name: "Vikram Mehta",
    rating: 4,
    message: "Great academy with excellent teaching methods. The personalized feedback after each session has been invaluable for my improvement.",
    course: "Tournament Preparation"
  },
  {
    id: 4,
    name: "Ananya Desai",
    rating: 5,
    message: "I've tried several chess academies before, but the structured curriculum here is by far the best. My rating has improved by 300 points in just one year!",
    course: "FIDE Rating Improvement"
  },
  {
    id: 5,
    name: "Rohan Kapoor",
    rating: 4,
    message: "The online classes are just as effective as in-person sessions. The coaches use excellent visual aids and interactive tools to explain complex concepts.",
    course: "Online Masterclass"
  },
  {
    id: 6,
    name: "Neha Singh",
    rating: 5,
    message: "My son has developed not just chess skills but also improved concentration and logical thinking. The academy focuses on overall development through chess.",
    course: "Beginner Chess Course"
  }
];

const Testimonials = () => {
  return (
    <Box sx={{ pt: 12, pb: 8, minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h2"
            component={motion.h1}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            gutterBottom
            sx={{
              fontWeight: 700,
              background: "linear-gradient(45deg, #FFD700, #FDB931)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 2,
            }}
          >
            Student Testimonials
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            paragraph
            component={motion.p}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hear what our students say about their chess journey
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {MOCK_TESTIMONIALS.map((testimonial, index) => (
            <Grid item xs={12} md={6} lg={4} key={testimonial.id}>
              <Card
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "visible",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": {
                    borderColor: "#FFD700",
                    boxShadow: "0 8px 25px rgba(255, 215, 0, 0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: -10,
                    left: 20,
                    bgcolor: "#FFD700",
                    borderRadius: "50%",
                    p: 1,
                  }}
                >
                  <Quote size={20} color="black" />
                </Box>
                <CardContent sx={{ pt: 4, flexGrow: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "#FFD700",
                        color: "black",
                        fontWeight: 600,
                        mr: 2,
                      }}
                    >
                      {testimonial.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {testimonial.name}
                      </Typography>
                      <Chip
                        label={testimonial.course}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255, 215, 0, 0.1)",
                          color: "#FFD700",
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                  </Box>
                  <Rating
                    value={testimonial.rating}
                    readOnly
                    sx={{
                      mb: 2,
                      "& .MuiRating-iconFilled": { color: "#FFD700" },
                    }}
                  />
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontStyle: "italic", lineHeight: 1.6 }}
                  >
                    "{testimonial.message}"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
