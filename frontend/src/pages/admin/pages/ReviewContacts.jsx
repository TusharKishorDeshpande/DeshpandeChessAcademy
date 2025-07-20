import React, { useState, useEffect, useMemo } from "react";
import {
  Mail,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Search,
  Filter,
  X,
} from "lucide-react";
import { contacts } from "../../../utils/api";

// Theme colors
const theme = {
  card: "bg-gray-800",
  primaryText: "text-gray-100",
  secondaryText: "text-gray-400",
  accentText: "text-yellow-500",
  borderColor: "border-gray-700",
};

function ReviewContacts() {
  const [contactsList, setContactsList] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, read, unread
  const [dateFilter, setDateFilter] = useState("all"); // all, today, week, month
  const [showFilters, setShowFilters] = useState(false);

  // Fetch contacts from backend
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contacts.getAll();
      setContactsList(response.data.data || []);
      setError("");
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
      setError("Failed to load contact submissions");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await contacts.markAsRead(id);
      setContactsList(
        contactsList.map((contact) =>
          contact._id === id ? { ...contact, isRead: true } : contact
        )
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Filter and search logic
  const filteredContacts = useMemo(() => {
    let filtered = [...contactsList];

    // Search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchLower) ||
          contact.email.toLowerCase().includes(searchLower) ||
          contact.message.toLowerCase().includes(searchLower) ||
          (contact.subject &&
            contact.subject.toLowerCase().includes(searchLower))
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((contact) =>
        statusFilter === "read" ? contact.isRead : !contact.isRead
      );
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      filtered = filtered.filter((contact) => {
        const contactDate = new Date(contact.createdAt);
        switch (dateFilter) {
          case "today":
            return contactDate >= today;
          case "week":
            return contactDate >= weekAgo;
          case "month":
            return contactDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    // Sort by date (newest first)
    return filtered.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [contactsList, searchTerm, statusFilter, dateFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateFilter("all");
  };

  const hasActiveFilters =
    searchTerm || statusFilter !== "all" || dateFilter !== "all";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className={`text-2xl lg:text-3xl font-bold ${theme.accentText}`}>
          Contact Form Submissions
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <span
            className={`text-sm ${theme.secondaryText} text-center sm:text-left`}
          >
            {filteredContacts.length} of {contactsList.length} contacts
          </span>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-md border ${theme.borderColor} ${theme.card} ${theme.primaryText} hover:bg-gray-700 transition-colors w-full sm:w-auto`}
          >
            <Filter size={16} />
            <span>Filters</span>
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
            placeholder="Search contacts..."
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
                  <option value="all">All Messages</option>
                  <option value="unread">Unread Only</option>
                  <option value="read">Read Only</option>
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <label
                  className={`block text-sm font-medium ${theme.secondaryText} mb-2`}
                >
                  Date Range
                </label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className={`w-full px-3 py-2.5 sm:py-2 bg-gray-900 border ${theme.borderColor} rounded-md ${theme.primaryText} focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base`}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
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
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {contactsList.length === 0 ? (
        <div
          className={`${theme.card} rounded-lg shadow-lg p-8 text-center border ${theme.borderColor}`}
        >
          <MessageSquare
            size={48}
            className={`mx-auto ${theme.secondaryText} mb-4`}
          />
          <h3 className={`text-xl font-semibold ${theme.primaryText} mb-2`}>
            No contact submissions yet
          </h3>
          <p className={`${theme.secondaryText}`}>
            Contact form submissions will appear here when visitors reach out to
            you.
          </p>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div
          className={`${theme.card} rounded-lg shadow-lg p-8 text-center border ${theme.borderColor}`}
        >
          <Search size={48} className={`mx-auto ${theme.secondaryText} mb-4`} />
          <h3 className={`text-xl font-semibold ${theme.primaryText} mb-2`}>
            No contacts found
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
      ) : (
        <div
          className={`${theme.card} rounded-lg shadow-md border ${theme.borderColor} overflow-hidden`}
        >
          <ul className={`divide-y ${theme.borderColor}`}>
            {filteredContacts.map((contact) => (
              <li key={contact._id} className="p-3 sm:p-4">
                <div
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => {
                    toggleExpand(contact._id);
                    if (!contact.isRead) {
                      handleMarkAsRead(contact._id);
                    }
                  }}
                >
                  <div className="flex items-start flex-1 min-w-0">
                    <div
                      className={`${
                        contact.isRead ? "bg-gray-600" : "bg-yellow-900"
                      } ${
                        theme.accentText
                      } rounded-full p-2 mr-3 flex-shrink-0`}
                    >
                      <Mail size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                        <p
                          className={`font-semibold ${theme.primaryText} truncate`}
                        >
                          {contact.name}
                          {!contact.isRead && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              New
                            </span>
                          )}
                        </p>
                      </div>
                      <p
                        className={`text-sm ${theme.secondaryText} truncate mb-1`}
                      >
                        {contact.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        Received on {formatDate(contact.createdAt)}
                      </p>
                      {contact.subject && (
                        <p
                          className={`text-sm ${theme.secondaryText} truncate mt-1`}
                        >
                          <span className="font-medium">Subject:</span>{" "}
                          {contact.subject}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    {expandedId === contact._id ? (
                      <ChevronUp size={20} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-500" />
                    )}
                  </div>
                </div>
                {expandedId === contact._id && (
                  <div className="mt-3 pl-0 sm:pl-12">
                    <div
                      className={`${theme.primaryText} bg-gray-900 p-3 sm:p-4 rounded-md border ${theme.borderColor}`}
                    >
                      <h4
                        className={`font-semibold ${theme.accentText} mb-2 text-sm sm:text-base`}
                      >
                        Message:
                      </h4>
                      <p className="text-sm sm:text-base leading-relaxed">
                        {contact.message}
                      </p>

                      <div className="mt-3 pt-3 border-t border-gray-700 space-y-2">
                        {contact.phone && (
                          <p className={`text-sm ${theme.secondaryText}`}>
                            <strong>Phone:</strong>
                            <a
                              href={`tel:${contact.phone}`}
                              className="ml-1 text-yellow-500 hover:text-yellow-400"
                            >
                              {contact.phone}
                            </a>
                          </p>
                        )}
                        {contact.subject && (
                          <p className={`text-sm ${theme.secondaryText}`}>
                            <strong>Subject:</strong> {contact.subject}
                          </p>
                        )}
                        <p className={`text-xs ${theme.secondaryText}`}>
                          <strong>Email:</strong>
                          <a
                            href={`mailto:${contact.email}`}
                            className="ml-1 text-yellow-500 hover:text-yellow-400"
                          >
                            {contact.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ReviewContacts;
