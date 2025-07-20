import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  CardActions,
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { tournaments } from "../utils/api";
import { Users, Trophy, ExternalLink, X, Expand, Search } from "lucide-react";
import ChessLoader from "../components/common/ChessLoader";

const Updates = () => {
  const [expandedTournament, setExpandedTournament] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [viewerImage, setViewerImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: tournamentsList = [], isLoading } = useQuery({
    queryKey: ["tournaments"],
    queryFn: () => tournaments.getAll().then((res) => res.data.data),
  });

  // Filter tournaments based on search term
  const filteredTournaments = React.useMemo(() => {
    if (!searchTerm.trim()) {
      return tournamentsList;
    }

    const searchLower = searchTerm.toLowerCase();
    return tournamentsList.filter(
      (tournament) =>
        tournament.title.toLowerCase().includes(searchLower) ||
        tournament.description.toLowerCase().includes(searchLower)
    );
  }, [tournamentsList, searchTerm]);

  const handleCardClick = (tournament) => {
    setExpandedTournament(tournament);
  };

  const handleCloseDialog = () => {
    setExpandedTournament(null);
  };

  const handleImageClick = (imageUrl, title) => {
    setViewerImage({ url: imageUrl, title });
    setShowImageViewer(true);
  };

  const handleCloseImageViewer = () => {
    setShowImageViewer(false);
    setViewerImage(null);
  };

  if (isLoading) {
    return <ChessLoader />;
  }

  return (
    <Box
      sx={{ pt: 12, pb: 8, minHeight: "100vh", bgcolor: "background.default" }}
    >
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
            Tournaments & Events
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
            Join our exciting chess tournaments and compete with fellow players
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          sx={{
            mb: 6,
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box sx={{ position: "relative", maxWidth: "500px", mx: "auto" }}>
            <Search
              size={20}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9CA3AF",
              }}
            />
            <Box
              component="input"
              type="text"
              placeholder="Search tournaments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                width: "100%",
                pl: 5,
                pr: 2,
                py: 1.5,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.default",
                color: "text.primary",
                fontSize: "1rem",
                "&:focus": {
                  outline: "none",
                  borderColor: "#FFD700",
                  boxShadow: "0 0 0 2px rgba(255, 215, 0, 0.2)",
                },
                "&::placeholder": {
                  color: "text.secondary",
                },
              }}
            />
          </Box>
        </Box>

        <Grid container spacing={4}>
          {filteredTournaments.map((tournament, index) => (
            <Grid item xs={12} md={6} lg={4} key={tournament._id}>
              <Card
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => handleCardClick(tournament)}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "#FFD700",
                    boxShadow: "0 12px 40px rgba(255, 215, 0, 0.15)",
                  },
                }}
              >
                {tournament.banner && (
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={tournament.banner}
                      alt={tournament.title}
                      sx={{
                        objectFit: "contain",
                        aspectRatio: "4/3",
                        bgcolor: "background.default",
                        transition: "transform 0.3s ease",
                        cursor: "pointer",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(tournament.banner, tournament.title);
                      }}
                    />
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(tournament.banner, tournament.title);
                      }}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        "&:hover": {
                          bgcolor: "rgba(0, 0, 0, 0.7)",
                        },
                        ".MuiCard-root:hover &": {
                          opacity: 1,
                        },
                      }}
                    >
                      <Expand size={20} />
                    </IconButton>
                  </Box>
                )}

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Chip
                      icon={<Trophy size={16} />}
                      label="Tournament"
                      size="small"
                      sx={{
                        bgcolor: "rgba(255, 215, 0, 0.1)",
                        color: "#FFD700",
                        fontWeight: 600,
                        border: "1px solid rgba(255, 215, 0, 0.3)",
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      mb: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {tournament.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {tournament.description}
                  </Typography>

                  {tournament.maxParticipants && (
                    <Box
                      sx={{
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Users size={16} color="#666" />
                      <Typography variant="body2" color="text.secondary">
                        Max Participants:{" "}
                        <strong>{tournament.maxParticipants}</strong>
                      </Typography>
                    </Box>
                  )}

                  {tournament.prizes && tournament.prizes.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        Prizes:
                      </Typography>
                      {tournament.prizes.map((prize, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1, mb: 0.5 }}
                        >
                          • {prize.position}: ₹{prize.amount}
                          {prize.description && ` - ${prize.description}`}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </CardContent>

                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    href={tournament.formLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<ExternalLink size={18} />}
                    component={motion.button}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => e.stopPropagation()} // Prevent card click when clicking the button
                    sx={{
                      bgcolor: "#FFD700",
                      color: "black",
                      fontWeight: 700,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: "1rem",
                      "&:hover": {
                        bgcolor: "#FDB931",
                        boxShadow: "0 6px 20px rgba(255, 215, 0, 0.4)",
                      },
                    }}
                  >
                    Register Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {tournamentsList.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No tournaments available at the moment.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Check back soon for exciting upcoming events!
            </Typography>
          </Box>
        ) : filteredTournaments.length === 0 ? (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            sx={{
              textAlign: "center",
              py: 12,
              bgcolor: "background.paper",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              No Results Found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search criteria.
            </Typography>
          </Box>
        ) : null}

        {/* Expanded Tournament Dialog */}
        <Dialog
          open={expandedTournament !== null}
          onClose={handleCloseDialog}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              overflow: "hidden",
              bgcolor: "background.paper",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              maxHeight: "90vh",
            },
          }}
        >
          {expandedTournament && (
            <DialogContent sx={{ p: 0 }}>
              <IconButton
                onClick={handleCloseDialog}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  zIndex: 1,
                  "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
                }}
              >
                <X size={20} />
              </IconButton>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  minHeight: isMobile ? "auto" : "500px",
                }}
              >
                {/* Left side - Banner */}
                <Box
                  sx={{
                    width: isMobile ? "100%" : "50%",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "background.default",
                  }}
                >
                  {expandedTournament.banner ? (
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        "&:hover .expand-icon": {
                          opacity: 1,
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={expandedTournament.banner}
                        alt={expandedTournament.title}
                        sx={{
                          width: "100%",
                          height: isMobile ? "300px" : "100%",
                          objectFit: "contain",
                          aspectRatio: "4/3",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleImageClick(
                            expandedTournament.banner,
                            expandedTournament.title
                          )
                        }
                      />
                      <IconButton
                        className="expand-icon"
                        onClick={() =>
                          handleImageClick(
                            expandedTournament.banner,
                            expandedTournament.title
                          )
                        }
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "rgba(0, 0, 0, 0.5)",
                          color: "white",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          "&:hover": {
                            bgcolor: "rgba(0, 0, 0, 0.7)",
                          },
                        }}
                      >
                        <Expand size={20} />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        bgcolor: "rgba(255, 215, 0, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "300px",
                      }}
                    >
                      <Trophy size={64} color="#FFD700" />
                    </Box>
                  )}
                </Box>

                {/* Right side - Content */}
                <Box
                  sx={{
                    width: isMobile ? "100%" : "50%",
                    p: { xs: 2, md: 4 },
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Chip
                      icon={<Trophy size={16} />}
                      label="Tournament"
                      size="small"
                      sx={{
                        bgcolor: "rgba(255, 215, 0, 0.1)",
                        color: "#FFD700",
                        fontWeight: 600,
                        border: "1px solid rgba(255, 215, 0, 0.3)",
                      }}
                    />
                  </Box>

                  <Typography
                    variant={isMobile ? "h5" : "h4"}
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      mb: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {expandedTournament.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.6, flexGrow: 1 }}
                  >
                    {expandedTournament.description}
                  </Typography>

                  {expandedTournament.maxParticipants && (
                    <Box
                      sx={{
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Users size={18} color="#666" />
                      <Typography variant="body1" color="text.secondary">
                        Max Participants:{" "}
                        <strong>{expandedTournament.maxParticipants}</strong>
                      </Typography>
                    </Box>
                  )}

                  {expandedTournament.prizes &&
                    expandedTournament.prizes.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="h6"
                          color="text.primary"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          Prizes:
                        </Typography>
                        {expandedTournament.prizes.map((prize, index) => (
                          <Typography
                            key={index}
                            variant="body1"
                            color="text.secondary"
                            sx={{ ml: 1, mb: 0.5 }}
                          >
                            • {prize.position}: ₹{prize.amount}
                            {prize.description && ` - ${prize.description}`}
                          </Typography>
                        ))}
                      </Box>
                    )}

                  <Button
                    variant="contained"
                    fullWidth
                    href={expandedTournament.formLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<ExternalLink size={20} />}
                    sx={{
                      bgcolor: "#FFD700",
                      color: "black",
                      fontWeight: 700,
                      py: 1.5,
                      mt: "auto",
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: "1rem",
                      "&:hover": {
                        bgcolor: "#FDB931",
                        boxShadow: "0 6px 20px rgba(255, 215, 0, 0.4)",
                      },
                    }}
                  >
                    Register Now
                  </Button>
                </Box>
              </Box>
            </DialogContent>
          )}
        </Dialog>

        {/* Image Viewer Dialog */}
        <Dialog
          open={showImageViewer}
          onClose={handleCloseImageViewer}
          maxWidth={false}
          PaperProps={{
            sx: {
              bgcolor: "transparent",
              boxShadow: "none",
              overflow: "visible",
            },
          }}
        >
          <DialogContent sx={{ p: 0, position: "relative" }}>
            <IconButton
              onClick={handleCloseImageViewer}
              sx={{
                position: "absolute",
                top: -50,
                right: 0,
                color: "white",
                bgcolor: "rgba(0, 0, 0, 0.5)",
                "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
                zIndex: 1,
              }}
            >
              <X size={24} />
            </IconButton>
            {viewerImage && (
              <Box
                component="img"
                src={viewerImage.url}
                alt={viewerImage.title}
                sx={{
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  objectFit: "contain",
                  borderRadius: 2,
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Updates;
