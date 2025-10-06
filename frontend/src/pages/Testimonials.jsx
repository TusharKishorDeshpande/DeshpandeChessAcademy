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
    name: "Omkar Andhere",
    rating: 5,
    message: "The Solo Gold program exceeded my expectations! The 24 sessions of personalized coaching helped me improve my FIDE rating by 200 points. The 45-minute individual sessions were perfect for deep analysis of my games.",
    course: "Solo Gold",
    image: "person1.jpg"
  },
  {
    id: 2,
    name: "Omkar Chavan",
    rating: 5,
    message: "I started with the Demo Session and was so impressed that I immediately enrolled in Solo Bronze. The individual coaching approach really works - 4 sessions transformed my opening repertoire completely!",
    course: "Solo Bronze",
    image: "person2.jpg"
  },
  {
    id: 3,
    name: "Vedant Mehta",
    rating: 5,
    message: "The Gold Group sessions are fantastic value for money! 12 sessions of quality group coaching at just ₹1999. The 55-minute sessions allow for thorough discussion and learning from other students too.",
    course: "Gold Group",
    image: "person3.jpg"
  },
  {
    id: 4,
    name: "Kashif Mhalunkar",
    rating: 5,
    message: "Real Gold membership has been incredible! 24 offline sessions every Sunday at the academy gave me access to unlimited resources. The atmosphere and peer learning is unmatched.",
    course: "Real Gold",
    image: "person4.jpg"
  },
  {
    id: 5,
    name: "Shifa Shaikh",
    rating: 4,
    message: "Solo Silver was perfect for my intermediate level. 12 sessions of focused individual coaching helped me understand complex middlegame positions. Great value at ₹4999!",
    course: "Solo Silver",
    image: "person5.jpg"
  },
  {
    id: 6,
    name: "Arya Jadhav",
    rating: 5,
    message: "I started with Silver Group and the results were amazing! The 4 sessions of group coaching built my confidence and I made friends with other chess enthusiasts. The group learning environment is fantastic!",
    course: "Silver Group",
    image: "person6.jpg"
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
                      src={`/src/assets/testimonialsImages/${testimonial.image}`}
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
