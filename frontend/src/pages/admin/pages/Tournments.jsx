import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Plus,
  Trash2,
  Edit,
  X,
  UploadCloud,
  Trophy,
  Expand,
  Search,
  Filter,
} from "lucide-react";
import { tournaments } from "../../../utils/api";
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

// Tournament Modal Component
const TournamentModal = ({ isOpen, onClose, onSave, tournament }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    formLink: "",
    banner: "",
    isActive: true,
  });
  const [bannerPreview, setBannerPreview] = useState("");
  const [showCropModal, setShowCropModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImageBlob, setCroppedImageBlob] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (tournament) {
      setFormData(tournament);
      if (tournament.banner) {
        setBannerPreview(tournament.banner);
      }
    } else {
      setFormData({
        title: "",
        description: "",
        formLink: "",
        banner: "",
        isActive: true,
      });
      setBannerPreview("");
    }
    setErrors({});
    setShowImageViewer(false); // Reset image viewer state when modal opens/closes
    setIsSubmitting(false); // Reset submitting state when modal opens/closes
    setShowCropModal(false); // Reset crop modal state when modal opens/closes
    setSelectedImage(null); // Reset selected image when modal opens/closes
    setCroppedImageBlob(null); // Reset cropped image blob when modal opens/closes
  }, [tournament, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close the main modal if the image viewer or crop modal is open
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
    // Clear error when user starts typing
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
    // Convert the cropped image URL to a blob
    const response = await fetch(croppedImageUrl);
    const blob = await response.blob();

    setCroppedImageBlob(blob);
    setBannerPreview(croppedImageUrl);
    setShowCropModal(false);
    setSelectedImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    setErrors({});
    setIsSubmitting(true);

    // Create FormData for file upload
    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    submitData.append("formLink", formData.formLink);
    submitData.append("isActive", formData.isActive);

    // If we have a cropped image, append it
    if (croppedImageBlob) {
      submitData.append("banner", croppedImageBlob, "tournament-banner.jpg");
    }

    try {
      await onSave(submitData);
      // onSave will handle closing the modal on success
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
      setIsSubmitting(false); // Re-enable button on error
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
              {tournament ? "Edit Tournament" : "Create New Tournament"}
            </h3>
            <button
              onClick={() => {
                // Reset all modal states before closing
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
            <div>
              <Input
                id="title"
                label="Tournament Title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Summer Blitz Championship"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
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
                placeholder="A brief description of the tournament"
                rows="4"
                className={`w-full px-3 py-2 ${theme.card} ${theme.borderColor} border rounded-md shadow-sm ${theme.focusRing} ${theme.focusBorder} sm:text-sm ${theme.primaryText} bg-gray-900`}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
            <div>
              <Input
                id="formLink"
                label="Google Form Link"
                type="url"
                value={formData.formLink}
                onChange={handleInputChange}
                placeholder="https://forms.gle/..."
              />
              {errors.formLink && (
                <p className="text-red-500 text-sm mt-1">{errors.formLink}</p>
              )}
            </div>
            <div>
              <label
                className={`block text-sm font-medium ${theme.secondaryText} mb-1`}
              >
                Banner Image (4:3 Ratio)
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
                    PNG, JPG, GIF up to 10MB (will be cropped to 4:3 ratio)
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
            {bannerPreview && (
              <div className="mt-4">
                <p className={`text-sm font-medium ${theme.secondaryText}`}>
                  Banner Preview:
                </p>
                <div className="relative mt-2 group">
                  <img
                    src={bannerPreview}
                    alt="Banner Preview"
                    className="w-full h-32 object-contain bg-gray-900 rounded-md border border-gray-700 cursor-pointer"
                    style={{ aspectRatio: "4/3" }}
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
                  Tournament Status
                </h4>
                <p className={`text-sm ${theme.secondaryText}`}>
                  {formData.isActive
                    ? "This tournament is visible to the public"
                    : "This tournament is hidden from the public"}
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
                  // Reset all modal states before closing
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
          />
        </div>
      )}

      {showImageViewer && (
        <ImageViewerModal
          isOpen={showImageViewer}
          onClose={() => setShowImageViewer(false)}
          imageUrl={bannerPreview}
          title={formData.title}
        />
      )}
    </>
  );
};

function Tournaments() {
  const [tournamentsList, setTournamentsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTournament, setEditingTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, active, inactive
  const [showFilters, setShowFilters] = useState(false);

  // Fetch tournaments from backend
  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const response = await tournaments.getAllAdmin();
      setTournamentsList(response.data.data || []);
      setError("");
    } catch (err) {
      console.error("Failed to fetch tournaments:", err);
      setError("Failed to load tournaments");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (tournament = null) => {
    setEditingTournament(tournament);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTournament(null);
  };

  const handleSaveTournament = async (tournamentData) => {
    try {
      if (editingTournament) {
        // Editing existing tournament
        const response = await tournaments.update(
          editingTournament._id,
          tournamentData
        );
        setTournamentsList(
          tournamentsList.map((t) =>
            t._id === editingTournament._id ? response.data.data : t
          )
        );
      } else {
        // Adding new tournament
        const response = await tournaments.create(tournamentData);
        setTournamentsList([response.data.data, ...tournamentsList]);
      }
      handleCloseModal();
      setError("");
    } catch (err) {
      console.error("Failed to save tournament:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to save tournament");
      }
      throw err; // Re-throw to handle in modal
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tournament?")) {
      try {
        await tournaments.delete(id);
        setTournamentsList((prev) => prev.filter((t) => t._id !== id));
        setError("");
      } catch (err) {
        console.error("Failed to delete tournament:", err);
        setError("Failed to delete tournament");
      }
    }
  };

  // Filter and search logic
  const filteredTournaments = useMemo(() => {
    let filtered = [...tournamentsList];

    // Search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (tournament) =>
          tournament.title.toLowerCase().includes(searchLower) ||
          tournament.description.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((tournament) =>
        statusFilter === "active" ? tournament.isActive : !tournament.isActive
      );
    }

    // Sort by date (newest first)
    return filtered.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [tournamentsList, searchTerm, statusFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const hasActiveFilters = searchTerm || statusFilter !== "all";

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
            Tournament Management
          </h1>
          <p className={theme.secondaryText}>
            Create and manage chess tournaments
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <span
            className={`text-sm ${theme.secondaryText} text-center sm:text-left`}
          >
            {filteredTournaments.length} of {tournamentsList.length} tournaments
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
            <span>Add Tournament</span>
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
            placeholder="Search tournaments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 sm:py-2 bg-gray-900 border ${theme.borderColor} rounded-md ${theme.primaryText} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base`}
          />
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <option value="all">All Tournaments</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
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
        {filteredTournaments.map((tournament) => (
          <div
            key={tournament._id}
            className={`${theme.card} rounded-lg border ${theme.borderColor} overflow-hidden`}
          >
            {tournament.banner && (
              <img
                src={tournament.banner}
                alt={tournament.title}
                className="w-full h-48 object-contain bg-gray-900"
                style={{ aspectRatio: "4/3" }}
              />
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`text-lg font-semibold ${theme.primaryText}`}>
                  {tournament.title}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleOpenModal(tournament)}
                    className="p-2 text-blue-400 hover:bg-gray-700 rounded"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(tournament._id)}
                    className="p-2 text-red-400 hover:bg-gray-700 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className={`${theme.secondaryText} text-sm mb-3 line-clamp-3`}>
                {tournament.description}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    tournament.isActive
                      ? "bg-green-600 text-white"
                      : "bg-gray-600 text-gray-300"
                  }`}
                >
                  {tournament.isActive ? "Active" : "Inactive"}
                </span>
                <span className={`text-xs ${theme.secondaryText}`}>
                  {new Date(tournament.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tournamentsList.length === 0 ? (
        <div className="text-center py-12">
          <Trophy size={48} className={`mx-auto ${theme.secondaryText} mb-4`} />
          <h3 className={`text-xl font-semibold ${theme.primaryText} mb-2`}>
            No tournaments yet
          </h3>
          <p className={theme.secondaryText}>
            Create your first tournament to get started
          </p>
        </div>
      ) : filteredTournaments.length === 0 ? (
        <div className="text-center py-12">
          <Search size={48} className={`mx-auto ${theme.secondaryText} mb-4`} />
          <h3 className={`text-xl font-semibold ${theme.primaryText} mb-2`}>
            No tournaments found
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

      <TournamentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTournament}
        tournament={editingTournament}
      />
    </div>
  );
}

export default Tournaments;
