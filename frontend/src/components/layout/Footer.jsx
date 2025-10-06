import { Link } from "react-router-dom";
import {
  Crown,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

export default function Footer() {
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Courses", path: "/services" },
    { title: "Updates", path: "/updates" },
    { title: "Testimonials", path: "/testimonials" },
    { title: "Contact", path: "/contact" },
    { title: "Login", path: "/login" },
  ];

  return (
    <footer
      className="bg-black text-gray-300"
      style={{
        background: "linear-gradient(145deg, #000000 0%, #1a1a1a 100%)",
      }}
    >
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Chess Academy" width={60} height={60} />
              <span className="text-xl font-bold text-white">
                Deshpande Chess Academy
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Empowering minds through the art of chess. Join us in mastering
              strategy, tactics, and critical thinking with over 10 years of
              excellence in chess education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "#FFD700" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-yellow-400 transition-colors text-gray-300"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "#FFD700" }}
            >
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin size={18} style={{ color: "#FFD700" }} />
                <span className="text-gray-400">
                  Chinchavali, Goregaon, Maharashtra 402103
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} style={{ color: "#FFD700" }} />
                <a
                  href="tel:+1234567890"
                  className="hover:text-yellow-400 text-gray-400 transition-colors"
                >
                  +91 8007646492
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} style={{ color: "#FFD700" }} />
                <a
                  href="mailto:info@chessacademy.com"
                  className="hover:text-yellow-400 text-gray-400 transition-colors"
                >
                  deshpande.chess.academy.web@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="hover:text-yellow-400 transition-colors text-gray-400"
                  aria-label="Social Media"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Deshpande Chess Academy. All rights
              reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
