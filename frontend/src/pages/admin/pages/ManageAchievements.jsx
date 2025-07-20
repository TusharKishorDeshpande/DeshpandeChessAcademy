import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Plus,
  Trash2,
  Edit,
  X,
  UploadCloud,
  Award,
  Expand,
  Search,
  Filter,
  Calendar,
  MapPin,
} from "lucide-react";
import { achievements } from "../../../utils/api";
import CropModal from "../components/cropModal";

// Theme colors
const theme = {
  card: "bg-gray-800",
  modal: "bg-gray-800",
  primaryText: "text-gray-100",
  secondaryText: "text-gray-400",
  accent: "yellow-500",
  accentText: "text-yellow-500",
  accentBg: "bg-yellow-500",
  accentHoverBg: "hover:bg-yellow-600",
  borderColor: "border-gray-700",
  focusRing: "focus:ring-yellow-500",
  focusBorder: "focus:border-yellow-500",
};

// Helper component for form inputs
const Input = ({ id, label, type = "text", value, onChange, placeholder }) => (
  <div>
    <label
      htmlFor={id}
      className={`block text-sm font-medium ${theme.secondaryText} mb-1`}
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 ${theme.card} ${theme.borderColor} border rounded-md shadow-sm ${theme.focusRing} ${theme.focusBorder} sm:text-sm ${theme.primaryText} bg-gray-900`}
    />
  </div>
);

// Image Viewer Modal Component
const ImageViewerModal = ({ isOpen, onClose, imageUrl, title }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[70] p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 z-10"
        >
          <X size={24} />
        </button>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

// Achievement Modal Component
const AchievementModal = ({ isOpen, onClose, onSave, achievement }) => {
  const [formData, setFormData] = useState({
    title: "",
    studentName: "",
    description: "",
    date: "",
    location: "",
    ratingChange: "",
    tags: [],
    image: "",
    isActive: true,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [showCropModal, setShowCropModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImageBlob, setCroppedImageBlob] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (achievement) {
      setFormData({
        ...achievement,
        date: achievement.date
          ? new Date(achievement.date).toISOString().split("T")[0]
          : "",
        tags: achievement.tags || [],
      });
      if (achievement.image) {
        setImagePreview(achievement.image);
      }
    } else {
      setFormData({
        title: "",
        studentName: "",
        description: "",
        date: "",
        location: "",
        ratingChange: "",
        tags: [],
        image: "",
        isActive: true,
      });
      setImagePreview("");
    }
    setErrors({});
    setShowImageViewer(false);
    setIsSubmitting(false);
    setShowCropModal(false);
    setSelectedImage(null);
    setCroppedImageBlob(null);
    setTagInput("");
  }, [achievement, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showImageViewer || showCropModal) {
        return;
      }

      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, showImageViewer, showCropModal]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setShowCropModal(true);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find((file) => file.type.startsWith("image/"));

    if (imageFile) {
      setSelectedImage(imageFile);
      setShowCropModal(true);
    }
  };

  const handleCroppedImage = async (croppedImageUrl) => {
    const response = await fetch(croppedImageUrl);
    const blob = await response.blob();

    setCroppedImageBlob(blob);
    setImagePreview(croppedImageUrl);
    setShowCropModal(false);
    setSelectedImage(null);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setErrors({});
    setIsSubmitting(true);

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("studentName", formData.studentName);
    submitData.append("description", formData.description);
    submitData.append("date", formData.date);
    submitData.append("location", formData.location);
    submitData.append("ratingChange", formData.ratingChange);
    submitData.append("tags", JSON.stringify(formData.tags));
    submitData.append("isActive", formData.isActive);

    if (croppedImageBlob) {
      submitData.append("image", croppedImageBlob, "achievement-image.jpg");
    }

    try {
      await onSave(submitData);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div
          ref={modalRef}
          className={`${theme.modal} rounded-lg shadow-xl w-full max-w-2xl border ${theme.borderColor} max-h-[90vh] overflow-hidden`}
        >
          <div
            className={`flex justify-between items-center p-4 border-b ${theme.borderColor}`}
          >
            <h3 className={`text-xl font-semibold ${theme.primaryText}`}>
              {achievement ? "Edit Achievement" : "Create New Achievement"}
            </h3>
            <button
              onClick={() => {
                setShowCropModal(false);
                setShowImageViewer(false);
                setSelectedImage(null);
                setCroppedImageBlob(null);
                onClose();
              }}
              className={`p-1 rounded-full hover:bg-gray-700`}
            >
              <X size={20} className={theme.secondaryText} />
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  id="title"
                  label="Achievement Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., National Under-14 Girls Champion"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>
              <div>
                <Input
                  id="studentName"
                  label="Student Name"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="e.g., Ananya Sharma"
                />
                {errors.studentName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.studentName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className={`block text-sm font-medium ${theme.secondaryText} mb-1`}
              >
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detailed description of the achievement..."
                rows="4"
                className={`w-full px-3 py-2 ${theme.card} ${theme.borderColor} border rounded-md shadow-sm ${theme.focusRing} ${theme.focusBorder} sm:text-sm ${theme.primaryText} bg-gray-900`}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Input
                  id="date"
                  label="Achievement Date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>
              <div>
                <Input
                  id="location"
                  label="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., New Delhi, India"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>
              <div>
                <Input
                  id="ratingChange"
                  label="Rating (Optional)"
                  value={formData.ratingChange}
                  onChange={handleInputChange}
                  placeholder="e.g., +115 or 2300+"
                />
              </div>
            </div>

            {/* Tags Section */}
            <div>
              <label
                className={`block text-sm font-medium ${theme.secondaryText} mb-1`}
              >
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-medium shadow-sm border border-yellow-300"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 hover:text-red-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagInputKeyPress}
                  placeholder="Add a tag..."
                  className={`flex-1 px-3 py-2 ${theme.card} ${theme.borderColor} border rounded-md shadow-sm ${theme.focusRing} ${theme.focusBorder} sm:text-sm ${theme.primaryText} bg-gray-900`}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label
                className={`block text-sm font-medium ${theme.secondaryText} mb-1`}
              >
                Achievement Image (3:4 Ratio)
              </label>
              <div
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                  isDragOver
                    ? "border-yellow-500 bg-yellow-500 bg-opacity-10"
                    : theme.borderColor
                } border-dashed rounded-md transition-colors cursor-pointer`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="space-y-1 text-center">
                  <UploadCloud
                    className={`mx-auto h-12 w-12 ${
                      isDragOver ? "text-yellow-500" : theme.secondaryText
                    }`}
                  />
                  <div className={`flex text-sm ${theme.secondaryText}`}>
                    <span
                      className={`relative cursor-pointer bg-gray-900 rounded-md font-medium ${theme.accentText} hover:text-yellow-400 focus-within:outline-none`}
                    >
                      Click to upload or drag and drop
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB (will be cropped to 3:4 ratio)
                  </p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>

            {imagePreview && (
              <div className="mt-4">
                <p className={`text-sm font-medium ${theme.secondaryText}`}>
                  Image Preview:
                </p>
                <div className="relative mt-2 group">
                  <img
                    src={imagePreview}
                    alt="Achievement Preview"
                    className="w-full h-32 object-contain bg-gray-900 rounded-md border border-gray-700 cursor-pointer"
                    style={{ aspectRatio: "3/4" }}
                    onClick={() => setShowImageViewer(true)}
                  />
                  <button
                    onClick={() => setShowImageViewer(true)}
                    className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Expand size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Active Status Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-md border border-gray-700">
              <div>
                <h4 className={`font-semibold ${theme.primaryText} mb-1`}>
                  Achievement Status
                </h4>
                <p className={`text-sm ${theme.secondaryText}`}>
                  {formData.isActive
                    ? "This achievement is visible to the public"
                    : "This achievement is hidden from the public"}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))
                }
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                  formData.isActive ? theme.accentBg : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                    formData.isActive ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-end pt-4 space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowCropModal(false);
                  setShowImageViewer(false);
                  setSelectedImage(null);
                  setCroppedImageBlob(null);
                  onClose();
                }}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors shadow w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-md transition-colors shadow flex items-center justify-center space-x-2 w-full sm:w-auto ${
                  isSubmitting
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {isSubmitting && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                <span>{isSubmitting ? "Saving..." : "Save"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {showCropModal && (
        <div style={{ zIndex: 9999 }}>
          <CropModal
            isOpen={showCropModal}
            onClose={() => {
              setShowCropModal(false);
              setSelectedImage(null);
            }}
            onCrop={handleCroppedImage}
            image={selectedImage}
            aspectRatio={3 / 4}
          />
        </div>
      )}

      {showImageViewer && (
        <ImageViewerModal
          isOpen={showImageViewer}
          onClose={() => setShowImageViewer(false)}
          imageUrl={imagePreview}
          title={formData.title}
        />
      )}
    </>
  );
};

function ManageAchievements() {
  const [achievementsList, setAchievementsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await achievements.getAllAdmin();
      setAchievementsList(response.data.data || []);
      setError("");
    } catch (err) {
      console.error("Failed to fetch achievements:", err);
      setError("Failed to load achievements");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (achievement = null) => {
    setEditingAchievement(achievement);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAchievement(null);
  };

  const handleSaveAchievement = async (achievementData) => {
    try {
      if (editingAchievement) {
        const response = await achievements.update(
          editingAchievement._id,
          achievementData
        );
        setAchievementsList(
          achievementsList.map((a) =>
            a._id === editingAchievement._id ? response.data.data : a
          )
        );
      } else {
        const response = await achievements.create(achievementData);
        setAchievementsList([response.data.data, ...achievementsList]);
      }
      handleCloseModal();
      setError("");
    } catch (err) {
      console.error("Failed to save achievement:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to save achievement");
      }
      throw err;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      try {
        await achievements.delete(id);
        setAchievementsList((prev) => prev.filter((a) => a._id !== id));
        setError("");
      } catch (err) {
        console.error("Failed to delete achievement:", err);
        setError("Failed to delete achievement");
      }
    }
  };

  // Get all unique tags for filter
  const allTags = useMemo(() => {
    const tags = new Set();
    achievementsList.forEach((achievement) => {
      achievement.tags?.forEach((tag) => tags.add(tag));
    });
    return ["all", ...Array.from(tags)];
  }, [achievementsList]);

  // Filter and search logic
  const filteredAchievements = useMemo(() => {
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

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((achievement) =>
        statusFilter === "active" ? achievement.isActive : !achievement.isActive
      );
    }

    // Tag filter
    if (tagFilter !== "all") {
      filtered = filtered.filter((achievement) =>
        achievement.tags?.includes(tagFilter)
      );
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [achievementsList, searchTerm, statusFilter, tagFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTagFilter("all");
  };

  const hasActiveFilters =
    searchTerm || statusFilter !== "all" || tagFilter !== "all";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold ${theme.primaryText}`}>
            Achievement Management
          </h1>
          <p className={theme.secondaryText}>
            Create and manage student achievements
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <span
            className={`text-sm ${theme.secondaryText} text-center sm:text-left`}
          >
            {filteredAchievements.length} of {achievementsList.length}{" "}
            achievements
          </span>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-md border ${theme.borderColor} ${theme.card} ${theme.primaryText} hover:bg-gray-700 transition-colors w-full sm:w-auto`}
          >
            <Filter size={16} />
            <span>Filters</span>
          </button>
          <button
            onClick={() => handleOpenModal()}
            className={`${theme.accentBg} text-black px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold ${theme.accentHoverBg} transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto`}
          >
            <Plus size={20} />
            <span>Add Achievement</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div
        className={`mb-6 ${theme.card} rounded-lg border ${theme.borderColor} p-3 sm:p-4`}
      >
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search
            size={18}
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.secondaryText}`}
          />
          <input
            type="text"
            placeholder="Search achievements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 sm:py-2 bg-gray-900 border ${theme.borderColor} rounded-md ${theme.primaryText} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base`}
          />
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <label
                  className={`block text-sm font-medium ${theme.secondaryText} mb-2`}
                >
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`w-full px-3 py-2.5 sm:py-2 bg-gray-900 border ${theme.borderColor} rounded-md ${theme.primaryText} focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base`}
                >
                  <option value="all">All Achievements</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
              </div>

              {/* Tag Filter */}
              <div>
                <label
                  className={`block text-sm font-medium ${theme.secondaryText} mb-2`}
                >
                  Tag
                </label>
                <select
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className={`w-full px-3 py-2.5 sm:py-2 bg-gray-900 border ${theme.borderColor} rounded-md ${theme.primaryText} focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base`}
                >
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag === "all" ? "All Tags" : tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="flex justify-center sm:justify-start">
                <button
                  onClick={clearFilters}
                  className={`flex items-center justify-center space-x-2 px-4 py-2 bg-gray-700 ${theme.primaryText} rounded-md hover:bg-gray-600 transition-colors w-full sm:w-auto max-w-xs`}
                >
                  <X size={16} />
                  <span>Clear Filters</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-600 text-white p-4 rounded-lg mb-6">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredAchievements.map((achievement) => (
          <div
            key={achievement._id}
            className={`${theme.card} rounded-lg border ${theme.borderColor} overflow-hidden`}
          >
            {achievement.image && (
              <img
                src={achievement.image}
                alt={achievement.title}
                className="w-full h-40 object-contain bg-gray-900"
                style={{ aspectRatio: "3/4" }}
              />
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3
                  className={`text-lg font-semibold ${theme.primaryText} line-clamp-1`}
                >
                  {achievement.title}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleOpenModal(achievement)}
                    className="p-2 text-blue-400 hover:bg-gray-700 rounded"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(achievement._id)}
                    className="p-2 text-red-400 hover:bg-gray-700 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className={`${theme.accentText} text-sm font-semibold mb-2`}>
                {achievement.studentName}
              </p>

              <p className={`${theme.secondaryText} text-sm mb-3 line-clamp-2`}>
                {achievement.description}
              </p>

              {/* Achievement Details */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center text-xs text-gray-400">
                  <Calendar size={12} className="mr-1" />
                  <span>{new Date(achievement.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <MapPin size={12} className="mr-1" />
                  <span>{achievement.location}</span>
                </div>
                {achievement.ratingChange && (
                  <div className="flex items-center text-xs">
                    <span className="text-blue-400 font-semibold">
                      Rating: {achievement.ratingChange}
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {achievement.tags && achievement.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {achievement.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs rounded-full font-medium shadow-sm border border-yellow-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {achievement.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-full">
                      +{achievement.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    achievement.isActive
                      ? "bg-green-600 text-white"
                      : "bg-gray-600 text-gray-300"
                  }`}
                >
                  {achievement.isActive ? "Active" : "Inactive"}
                </span>
                <span className={`text-xs ${theme.secondaryText}`}>
                  {new Date(achievement.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {achievementsList.length === 0 ? (
        <div className="text-center py-12">
          <Award size={48} className={`mx-auto ${theme.secondaryText} mb-4`} />
          <h3 className={`text-xl font-semibold ${theme.primaryText} mb-2`}>
            No achievements yet
          </h3>
          <p className={theme.secondaryText}>
            Create your first achievement to get started
          </p>
        </div>
      ) : filteredAchievements.length === 0 ? (
        <div className="text-center py-12">
          <Search size={48} className={`mx-auto ${theme.secondaryText} mb-4`} />
          <h3 className={`text-xl font-semibold ${theme.primaryText} mb-2`}>
            No achievements found
          </h3>
          <p className={`${theme.secondaryText} mb-4`}>
            Try adjusting your search terms or filters to find what you're
            looking for.
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className={`px-4 py-2 bg-yellow-600 text-black rounded-md hover:bg-yellow-700 transition-colors font-medium`}
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : null}

      <AchievementModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAchievement}
        achievement={editingAchievement}
      />
    </div>
  );
}

export default ManageAchievements;
