import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const auth = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getProfile: () => api.get("/auth/profile"),
  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
};

// Tournament API endpoints
export const tournaments = {
  getAll: () => api.get("/tournaments"), // Public endpoint
  getAllAdmin: () => api.get("/tournaments/admin"), // Admin endpoint
  getById: (id) => api.get(`/tournaments/${id}`),
  create: (tournamentData) => {
    // Handle FormData for file uploads
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return api.post("/tournaments", tournamentData, config);
  },
  update: (id, tournamentData) => {
    // Handle FormData for file uploads
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return api.put(`/tournaments/${id}`, tournamentData, config);
  },
  delete: (id) => api.delete(`/tournaments/${id}`),
};

// Testimonials API endpoints
export const testimonials = {
  getAll: () => api.get("/testimonials"), // Public endpoint
  getAllAdmin: () => api.get("/testimonials/admin"), // Admin endpoint
  getById: (id) => api.get(`/testimonials/${id}`),
  create: (testimonialData) => api.post("/testimonials", testimonialData),
  approve: (id, isApproved) =>
    api.patch(`/testimonials/${id}/approve`, { isApproved }),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

// Contact API endpoints
export const contacts = {
  getAll: () => api.get("/contacts"),
  getById: (id) => api.get(`/contacts/${id}`),
  create: (contactData) => api.post("/contacts", contactData),
  delete: (id) => api.delete(`/contacts/${id}`),
  markAsRead: (id) => api.patch(`/contacts/${id}/read`),
};

// Settings API endpoints
export const settings = {
  get: () => api.get("/settings"),
  update: (settingsData) => api.put("/settings", settingsData),
  updateEmails: (emails) => api.put("/settings/emails", { emails }),
  updateNotifications: (enabled) =>
    api.put("/settings/notifications", { enabled }),
};

// Achievements API endpoints
export const achievements = {
  getAll: () => api.get("/achievements"), // Public endpoint
  getAllAdmin: () => api.get("/achievements/admin"), // Admin endpoint
  getById: (id) => api.get(`/achievements/${id}`),
  create: (achievementData) => {
    // Handle FormData for file uploads
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return api.post("/achievements", achievementData, config);
  },
  update: (id, achievementData) => {
    // Handle FormData for file uploads
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return api.put(`/achievements/${id}`, achievementData, config);
  },
  delete: (id) => api.delete(`/achievements/${id}`),
};

// Contact form API (singular for public contact form submission)
export const contact = {
  submit: (contactData) => api.post("/contacts", contactData),
};

export default api;
