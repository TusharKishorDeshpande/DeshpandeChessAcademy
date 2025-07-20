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
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { achievements } from "../utils/api";
import { Award, X, Expand, Calendar, MapPin, Search } from "lucide-react";
import ChessLoader from "../components/common/ChessLoader";

const Achievements = () => {
  const [expandedAchievement, setExpandedAchievement] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [viewerImage, setViewerImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: achievementsList = [], isLoading } = useQuery({
    queryKey: ["achievements"],
    queryFn: () => achievements.getAll().then((res) => res.data.data),
  });

  const handleCardClick = (achievement) => {
    setExpandedAchievement(achievement);
  };

  const handleCloseDialog = () => {
    setExpandedAchievement(null);
  };

  const handleImageClick = (imageUrl, title) => {
    setViewerImage({ url: imageUrl, title });
    setShowImageViewer(true);
  };

  const handleCloseImageViewer = () => {
    setShowImageViewer(false);
    setViewerImage(null);
  };

  // Filter and sort achievements
  const filteredAndSortedAchievements = React.useMemo(() => {
    let filtered = [...achievementsList];

    // Search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (achievement) =>
          achievement.title.toLowerCase().includes(searchLower) ||
          achievement.studentName.toLowerCase().includes(searchLower) ||
          achievement.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    if (sortBy === "recent") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => {
        const ratingA = parseInt(a.ratingChange) || 0;
        const ratingB = parseInt(b.ratingChange) || 0;
        return ratingB - ratingA;
      });
    }

    return filtered;
  }, [achievementsList, searchTerm, sortBy]);

  if (isLoading) {
    return <ChessLoader />;
  }

  return (
    <Box
      sx={{ pt: 12, pb: 8, minHeight: "100vh", bgcolor: "background.default" }}
    >
      <Container maxWidth="lg">
        {/* Header */}
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
            The Hall of Fame
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
            Celebrating the hard work, dedication, and strategic brilliance of
            our students
          </Typography>
        </Box>

        {/* Search and Filters */}
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
          <Grid container spacing={3} alignItems="center">
            {/* Search */}
            <Grid item xs={12} md={8}>
              <Box sx={{ position: "relative" }}>
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
                  placeholder="Search achievements..."
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
            </Grid>

            {/* Sort */}
            <Grid item xs={12} md={4}>
              <Box
                component="select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                sx={{
                  width: "100%",
                  p: 1.5,
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
                }}
              >
                <option value="recent">Sort: Most Recent</option>
                <option value="rating">Sort: Rating Gain</option>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Achievements Grid */}
        {filteredAndSortedAchievements.length > 0 ? (
          <Grid container spacing={4}>
            {filteredAndSortedAchievements.map((achievement, index) => (
              <Grid item xs={12} md={6} lg={4} key={achievement._id}>
                <Card
                  component={motion.div}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => handleCardClick(achievement)}
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
                  {achievement.image && (
                    <Box sx={{ position: "relative", overflow: "hidden" }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={achievement.image}
                        alt={achievement.title}
                        sx={{
                          objectFit: "contain",
                          aspectRatio: "3/4",
                          bgcolor: "background.default",
                          transition: "transform 0.3s ease",
                          cursor: "pointer",
                          "&:hover": { transform: "scale(1.05)" },
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageClick(
                            achievement.image,
                            achievement.title
                          );
                        }}
                      />
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageClick(
                            achievement.image,
                            achievement.title
                          );
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
                    {/* Tags */}
                    <Box
                      sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}
                    >
                      {achievement.tags?.slice(0, 3).map((tag, tagIndex) => (
                        <Chip
                          key={tagIndex}
                          label={tag}
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(135deg, #FFD700, #FDB931)",
                            color: "#000",
                            fontWeight: 700,
                            border: "1px solid rgba(255, 215, 0, 0.5)",
                            boxShadow: "0 2px 4px rgba(255, 215, 0, 0.2)",
                            fontSize: "0.75rem",
                            "& .MuiChip-label": {
                              px: 1.5,
                            },
                          }}
                        />
                      ))}
                      {achievement.tags?.length > 3 && (
                        <Chip
                          label={`+${achievement.tags.length - 3}`}
                          size="small"
                          sx={{
                            bgcolor: "rgba(128, 128, 128, 0.1)",
                            color: "text.secondary",
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </Box>

                    {/* Title and Student Name */}
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        mb: 1,
                        lineHeight: 1.3,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {achievement.title}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        color: "#FFD700",
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      {achievement.studentName}
                    </Typography>

                    {/* Description */}
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
                      {achievement.description}
                    </Typography>

                    {/* Achievement Details */}
                    <Box
                      sx={{
                        mb: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Calendar size={16} color="#666" />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(achievement.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <MapPin size={16} color="#666" />
                        <Typography variant="body2" color="text.secondary">
                          {achievement.location}
                        </Typography>
                      </Box>
                      {achievement.ratingChange && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#3b82f6",
                              fontWeight: 700,
                              fontSize: "0.875rem",
                              px: 1.5,
                              py: 0.5,
                              bgcolor: "rgba(59, 130, 246, 0.1)",
                              borderRadius: 1,
                              border: "1px solid rgba(59, 130, 246, 0.2)",
                            }}
                          >
                            Rating: {achievement.ratingChange}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
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
            {achievementsList.length === 0 ? (
              <>
                <Award size={64} color="#FFD700" style={{ marginBottom: 16 }} />
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: 700, color: "text.primary" }}
                >
                  No achievements yet
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Check back soon for exciting student achievements!
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: 700, color: "text.primary" }}
                >
                  No Results Found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Try adjusting your search or filter criteria.
                </Typography>
              </>
            )}
          </Box>
        )}

        {/* Expanded Achievement Dialog */}
        <Dialog
          open={expandedAchievement !== null}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              overflow: "hidden",
              bgcolor: "background.paper",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              maxHeight: "85vh",
              m: { xs: 1, sm: 2 },
              maxWidth: { xs: "calc(100vw - 16px)", sm: "600px", md: "700px" },
            },
          }}
        >
          {expandedAchievement && (
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
                  flexDirection: "column",
                  minHeight: "auto",
                }}
              >
                {/* Image Section */}
                {expandedAchievement.image && (
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      bgcolor: "background.default",
                      p: 2,
                      "&:hover .expand-icon": {
                        opacity: 1,
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={expandedAchievement.image}
                      alt={expandedAchievement.title}
                      sx={{
                        maxWidth: { xs: "200px", sm: "250px" },
                        height: "auto",
                        objectFit: "contain",
                        aspectRatio: "3/4",
                        cursor: "pointer",
                        borderRadius: 2,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                      onClick={() =>
                        handleImageClick(
                          expandedAchievement.image,
                          expandedAchievement.title
                        )
                      }
                    />
                    <IconButton
                      className="expand-icon"
                      onClick={() =>
                        handleImageClick(
                          expandedAchievement.image,
                          expandedAchievement.title
                        )
                      }
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
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
                )}

                {/* Content Section */}
                <Box
                  sx={{
                    p: { xs: 2, sm: 3 },
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {/* Tags */}
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {expandedAchievement.tags?.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{
                          background:
                            "linear-gradient(135deg, #FFD700, #FDB931)",
                          color: "#000",
                          fontWeight: 700,
                          border: "1px solid rgba(255, 215, 0, 0.5)",
                          boxShadow: "0 2px 4px rgba(255, 215, 0, 0.2)",
                          fontSize: "0.75rem",
                          "& .MuiChip-label": {
                            px: 1.5,
                          },
                        }}
                      />
                    ))}
                  </Box>

                  <Typography
                    variant={{ xs: "h6", sm: "h5" }}
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      lineHeight: 1.3,
                    }}
                  >
                    {expandedAchievement.title}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#FFD700",
                      fontWeight: 600,
                    }}
                  >
                    {expandedAchievement.studentName}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {expandedAchievement.description}
                  </Typography>

                  {/* Achievement Details */}
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Calendar size={16} color="#666" />
                      <Typography variant="body2" color="text.secondary">
                        <strong>Date:</strong>{" "}
                        {new Date(
                          expandedAchievement.date
                        ).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <MapPin size={16} color="#666" />
                      <Typography variant="body2" color="text.secondary">
                        <strong>Location:</strong>{" "}
                        {expandedAchievement.location}
                      </Typography>
                    </Box>
                    {expandedAchievement.ratingChange && (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#3b82f6",
                            fontWeight: 700,
                            px: 1.5,
                            py: 0.5,
                            bgcolor: "rgba(59, 130, 246, 0.1)",
                            borderRadius: 1,
                            border: "1px solid rgba(59, 130, 246, 0.2)",
                            fontSize: "0.875rem",
                          }}
                        >
                          <strong>Rating:</strong>{" "}
                          {expandedAchievement.ratingChange}
                        </Typography>
                      </Box>
                    )}
                  </Box>
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

export default Achievements;
