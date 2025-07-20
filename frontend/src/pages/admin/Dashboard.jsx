import React, { useState, useEffect } from "react";
import {
  Trophy,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/api";
import Tournaments from "./pages/Tournments";
import ReviewContacts from "./pages/ReviewContacts";
import SettingsPage from "./pages/Settings";
import ManageAchievements from "./pages/ManageAchievements";

// Theme colors matching the design
const theme = {
  background: "bg-black",
  sidebar: "bg-gray-900",
  card: "bg-gray-800",
  primaryText: "text-gray-100",
  secondaryText: "text-gray-400",
  accent: "yellow-500",
  accentText: "text-yellow-500",
  accentBg: "bg-yellow-500",
  accentHoverBg: "hover:bg-yellow-600",
  borderColor: "border-gray-700",
};

// Profile Avatar Component
const ProfileAvatar = ({ name, imageUrl }) => {
  const getInitials = (nameStr) => {
    if (!nameStr) return "?";
    const words = nameStr.split(" ").filter(Boolean);
    if (words.length > 1) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return words[0] ? words[0][0].toUpperCase() : "?";
  };

  return (
    <>
      {imageUrl ? (
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={imageUrl}
          alt={name}
        />
      ) : (
        <div
          className={`h-10 w-10 rounded-full ${theme.accentBg} flex items-center justify-center text-black font-bold text-sm`}
        >
          {getInitials(name)}
        </div>
      )}
    </>
  );
};

function Dashboard() {
  const [activeView, setActiveView] = useState("tournaments");
  const [user, setUser] = useState({
    name: "Admin User",
    role: "Academy Director",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await auth.getProfile();
        setUser({
          name: response.data.user.email.split("@")[0] || "Admin User",
          role: "Academy Director",
          imageUrl: "",
          email: response.data.user.email,
        });
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        // If token is invalid, redirect to login
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if API call fails
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${theme.background}`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className={theme.primaryText}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const NavItem = ({ icon, label, view, active, onClick }) => (
    <li
      onClick={() => {
        onClick(view);
        setSidebarOpen(false); // Close sidebar on mobile after selection
      }}
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
        active
          ? `${theme.accentBg} text-black`
          : `text-gray-300 hover:${theme.accentText} hover:bg-gray-700`
      }`}
    >
      {icon}
      <span className="ml-4 font-medium">{label}</span>
    </li>
  );

  const renderView = () => {
    switch (activeView) {
      case "tournaments":
        return <Tournaments />;
      case "achievements":
        return <ManageAchievements />;
      case "contacts":
        return <ReviewContacts />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Tournaments />;
    }
  };

  return (
    <div className={`min-h-screen flex ${theme.background} font-sans`}>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg
              className={`h-8 w-8 ${theme.accentText}`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C11.4477 2 11 2.44772 11 3V4C11 4.55228 11.4477 5 12 5C12.5523 5 13 4.55228 13 4V3C13 2.44772 12.5523 2 12 2ZM7 6C6.44772 6 6 6.44772 6 7V9C6 9.55228 6.44772 10 7 10H17C17.5523 10 18 9.55228 18 9V7C18 6.44772 17.5523 6 17 6H7ZM6 11V18C6 18.5523 6.44772 19 7 19H17C17.5523 19 18 18V11H6ZM5 20C5 19.4477 5.44772 19 6 19H18C18.5523 19 19 19.4477 19 20V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V20Z" />
            </svg>
            <h1 className="text-xl font-bold ml-3 text-gray-100">
              Chess Admin
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-300 hover:text-yellow-500 hover:bg-gray-700 transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 ${
          theme.sidebar
        } text-white flex flex-col p-4 fixed h-full z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center mb-10 p-2">
          <svg
            className={`h-10 w-10 ${theme.accentText}`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C11.4477 2 11 2.44772 11 3V4C11 4.55228 11.4477 5 12 5C12.5523 5 13 4.55228 13 4V3C13 2.44772 12.5523 2 12 2ZM7 6C6.44772 6 6 6.44772 6 7V9C6 9.55228 6.44772 10 7 10H17C17.5523 10 18 9.55228 18 9V7C18 6.44772 17.5523 6 17 6H7ZM6 11V18C6 18.5523 6.44772 19 7 19H17C17.5523 19 18 18V11H6ZM5 20C5 19.4477 5.44772 19 6 19H18C18.5523 19 19 19.4477 19 20V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V20Z" />
          </svg>
          <h1 className="text-2xl font-bold ml-3 text-gray-100">Chess Admin</h1>
        </div>

        {/* Mobile Header in Sidebar */}
        <div className="lg:hidden flex items-center justify-between mb-8 p-2 border-b border-gray-700">
          <div className="flex items-center">
            <svg
              className={`h-8 w-8 ${theme.accentText}`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C11.4477 2 11 2.44772 11 3V4C11 4.55228 11.4477 5 12 5C12.5523 5 13 4.55228 13 4V3C13 2.44772 12.5523 2 12 2ZM7 6C6.44772 6 6 6.44772 6 7V9C6 9.55228 6.44772 10 7 10H17C17.5523 10 18 9.55228 18 9V7C18 6.44772 17.5523 6 17 6H7ZM6 11V18C6 18.5523 6.44772 19 7 19H17C17.5523 19 18 18V11H6ZM5 20C5 19.4477 5.44772 19 6 19H18C18.5523 19 19 19.4477 19 20V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V20Z" />
            </svg>
            <h1 className="text-xl font-bold ml-3 text-gray-100">
              Chess Admin
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md text-gray-300 hover:text-yellow-500"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <NavItem
              icon={<Trophy size={20} />}
              label="Tournaments"
              view="tournaments"
              active={activeView === "tournaments"}
              onClick={setActiveView}
            />
            <NavItem
              icon={<Award size={20} />}
              label="Achievements"
              view="achievements"
              active={activeView === "achievements"}
              onClick={setActiveView}
            />
            <NavItem
              icon={<MessageSquare size={20} />}
              label="Contacts"
              view="contacts"
              active={activeView === "contacts"}
              onClick={setActiveView}
            />
            <NavItem
              icon={<Settings size={20} />}
              label="Settings"
              view="settings"
              active={activeView === "settings"}
              onClick={setActiveView}
            />
          </ul>
        </nav>

        <div className={`mt-auto space-y-4`}>
          <button
            onClick={() => {
              handleLogout();
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center p-3 rounded-lg cursor-pointer transition-colors text-gray-300 hover:text-red-400 hover:bg-gray-700`}
          >
            <LogOut size={20} />
            <span className="ml-4 font-medium">Logout</span>
          </button>
          <div className={`p-2 border-t ${theme.borderColor}`}>
            <div className="flex items-center">
              <ProfileAvatar name={user.name} imageUrl={user.imageUrl} />
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-100 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-400 truncate">{user.role}</p>
                {user.email && (
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-20 lg:pt-0 p-4 lg:p-8">
        {renderView()}
      </main>
    </div>
  );
}

export default Dashboard;
