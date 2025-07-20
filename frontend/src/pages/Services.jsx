import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { Crown, Users, User, PlayCircle } from "lucide-react";

const Services = () => {
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const [selectedService, setSelectedService] = useState(null);

  const offlineServices = [
    {
      title: "Real Silver",
      description: "Every Sunday",
      price: "₹999",
      sessions: "4 Sessions",
      category: "offline",
    },
    {
      title: "Real Gold",
      description: "Every Sunday",
      price: "₹2999",
      sessions: "24 Sessions",
      category: "offline",
    },
  ];

  const onlineServices = [
    {
      title: "Solo Bronze",
      description: "Individual Coaching - 45 minutes per session",
      price: "₹1999",
      sessions: "4 Sessions",
      category: "individual",
    },
    {
      title: "Solo Silver",
      description: "Individual Coaching - 45 minutes per session",
      price: "₹4999",
      sessions: "12 Sessions",
      category: "individual",
    },
    {
      title: "Solo Gold",
      description: "Individual Coaching - 45 minutes per session",
      price: "₹8999",
      sessions: "24 Sessions",
      category: "individual",
    },
    {
      title: "Silver Group",
      description: "Group Coaching - 55 minutes per session",
      price: "₹999",
      sessions: "4 Sessions",
      category: "group",
    },
    {
      title: "Gold Group",
      description: "Group Coaching - 55 minutes per session",
      price: "₹1999",
      sessions: "12 Sessions",
      category: "group",
    },
    {
      title: "Demo Session",
      description:
        "Get the best experience & learn more about Deshpande Chess Academy",
      price: "Free",
      sessions: "1 Session",
      category: "demo",
    },
  ];

  const handleOpenDialog = (service) => {
    setSelectedService(service);
  };

  const handleCloseDialog = () => {
    setSelectedService(null);
  };

  const ServiceCard = ({ service }) => (
    <Card
      component={motion.div}
      variants={itemVariants}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        border: `1px solid ${theme.palette.primary.main}20`,
        borderRadius: 2,
        transition: "all 0.3s ease",
        "&:hover": {
          border: `1px solid ${theme.palette.primary.main}50`,
          boxShadow: `0 4px 20px ${theme.palette.primary.main}20`,
        },
      }}
    >
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          {service.category === "offline" ? (
            <Crown size={24} />
          ) : service.category === "individual" ? (
            <User size={24} />
          ) : service.category === "group" ? (
            <Users size={24} />
          ) : (
            <PlayCircle size={24} />
          )}
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
            {service.title}
          </Typography>
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textShadow: `0 0 20px ${theme.palette.primary.main}40`,
          }}
        >
          {service.price}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {service.sessions}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ flex: 1 }}>
          {service.description}
        </Typography>
        <Button
          component={motion.button}
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog(service)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          sx={{
            mt: "auto",
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            boxShadow: `0 4px 15px ${theme.palette.primary.main}30`,
            "&:hover": {
              background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            },
          }}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{ pt: 12, pb: 8, minHeight: "100vh", bgcolor: "background.default" }}
    >
      <Container
        maxWidth="lg"
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box
          sx={{ mb: 6, textAlign: "center" }}
          component={motion.div}
          variants={itemVariants}
        >
          <Typography variant="h2" align="center" gutterBottom>
            Our Services
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Comprehensive chess training programs for all skill levels
          </Typography>
        </Box>

        {/* Offline Services */}
        <Box sx={{ mb: 8 }} component={motion.div} variants={itemVariants}>
          <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
            Offline Membership
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Join our main offline chess academy for unlimited access to
            resources and studies. Take your game to the next level with
            Deshpande Chess Academy
          </Typography>
          <Grid container spacing={4}>
            {offlineServices.map((service, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <ServiceCard service={service} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Online Services */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
            Online Coaching
          </Typography>

          {/* Individual Coaching */}
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Individual Coaching
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            One-on-one expertise from experienced chess coaches. Receive
            personalised guidance specially made for your skill level.
          </Typography>
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {onlineServices
              .filter((service) => service.category === "individual")
              .map((service, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ServiceCard service={service} />
                </Grid>
              ))}
          </Grid>

          {/* Group Coaching */}
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Group Coaching
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Master the fundamentals of chess with an affordable prize. Start
            your journey with Deshpande Chess Academy within your
            pocket-friendly budget.
          </Typography>
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {onlineServices
              .filter((service) => service.category === "group")
              .map((service, index) => (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <ServiceCard service={service} />
                </Grid>
              ))}
          </Grid>

          {/* Demo Session */}
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Try a Demo Session
          </Typography>
          <Grid container spacing={4}>
            {onlineServices
              .filter((service) => service.category === "demo")
              .map((service, index) => (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <ServiceCard service={service} />
                </Grid>
              ))}
          </Grid>
        </Box>

        {/* Service Details Dialog */}
        <Dialog
          open={Boolean(selectedService)}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              background: theme.palette.background.paper,
              backgroundImage: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
              border: `1px solid ${theme.palette.primary.main}30`,
            },
          }}
        >
          {selectedService && (
            <>
              <DialogTitle>{selectedService.title}</DialogTitle>
              <DialogContent>
                <Typography variant="h4" color="primary" gutterBottom>
                  {selectedService.price}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {selectedService.sessions}
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedService.description}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Close</Button>
                <Button
                  variant="contained"
                  color="primary"
                  component="a"
                  href={`https://wa.me/+918007646492?text=${encodeURIComponent(
                    `Hi, I'm interested in the ${selectedService.title} program (${selectedService.sessions}) at Deshpande Chess Academy.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enquire Now
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default Services;
