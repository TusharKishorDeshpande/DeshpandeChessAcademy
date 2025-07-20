import { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import { Menu, X, Crown } from "lucide-react";

const navItems = [
  { title: "HOME", path: "/" },
  { title: "ABOUT", path: "/about" },
  { title: "COURSES", path: "/services" },
  { title: "UPDATES", path: "/updates" },
  { title: "ACHIEVEMENTS", path: "/achievements" },
  { title: "TESTIMONIALS", path: "/testimonials" },
  { title: "CONTACT", path: "/contact" },
];

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AppBar
      component={motion.nav}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      position="fixed"
      sx={{
        background: scrolled ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.8)",
        backdropFilter: scrolled ? "blur(10px)" : "blur(5px)",
        boxShadow: scrolled
          ? "0 4px 30px rgba(0, 0, 0, 0.3)"
          : "0 2px 10px rgba(0, 0, 0, 0.2)",
        color: scrolled ? "#FFD700" : "white",
        transition: "all 0.3s ease",
        zIndex: 1100,
        minHeight: "80px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, sm: 4, md: 6 },
          py: 2,
          maxWidth: "1400px",
          mx: "auto",
          width: "100%",
        }}
      >
        <RouterLink
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            component={motion.div}
            whileHover={{ scale: 1.05 }}
          >
            <img src="/logo.png" alt="Logo" height="50px" width="50px" />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.2rem", md: "1.75rem" },
                background: scrolled
                  ? "linear-gradient(45deg, #FFD700, #FDB931)"
                  : "white",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                textShadow: scrolled
                  ? "0 0 15px rgba(255, 215, 0, 0.3)"
                  : "none",
                display: { xs: "none", sm: "block" },
              }}
            >
              Deshpande Chess Academy
            </Typography>
          </Stack>
        </RouterLink>

        {isMobile ? (
          <>
            <IconButton
              onClick={toggleDrawer}
              sx={{ color: "inherit" }}
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </IconButton>

            <Drawer
              anchor="right"
              open={isOpen}
              onClose={toggleDrawer}
              PaperProps={{
                sx: {
                  width: "100%",
                  maxWidth: "300px",
                  background: "rgba(0, 0, 0, 0.95)",
                  backdropFilter: "blur(10px)",
                },
              }}
            >
              <Box
                sx={{
                  pt: 8,
                  px: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    onClick={toggleDrawer}
                    sx={{
                      py: 2,
                      color: "#FFD700",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: location.pathname === item.path ? "100%" : "0%",
                        height: "2px",
                        bgcolor: "#FFD700",
                        transition: "width 0.3s ease",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#FFD700",
                        fontWeight: 500,
                        textShadow:
                          location.pathname === item.path
                            ? "0 0 10px rgba(255, 215, 0, 0.5)"
                            : "none",
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Button>
                ))}
              </Box>
            </Drawer>
          </>
        ) : (
          <Stack
            direction="row"
            spacing={1}
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={RouterLink}
                to={item.path}
                sx={{
                  color: scrolled ? "#FFD700" : "white",
                  px: 2,
                  position: "relative",
                  "&:hover": {
                    color: "#FFD700",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: location.pathname === item.path ? "100%" : "0%",
                    height: "2px",
                    bgcolor: "#FFD700",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    transition: "color 0.3s ease",
                    color:
                      location.pathname === item.path ? "#FFD700" : "inherit",
                    letterSpacing: "0.5px",
                    textShadow:
                      location.pathname === item.path && scrolled
                        ? "0 0 10px rgba(255, 215, 0, 0.5)"
                        : "none",
                  }}
                >
                  {item.title}
                </Typography>
              </Button>
            ))}
          </Stack>
        )}
      </Box>
    </AppBar>
  );
};

export default Navbar;
