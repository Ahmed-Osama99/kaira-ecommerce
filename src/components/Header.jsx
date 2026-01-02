import kairaLogo from "../assets/logo/logo.svg";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchedProducts from "./SearchedProducts";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHeart,
  faShoppingCart,
  faSearch,
  faXmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/shop", label: "All Products" },
];

const Header = () => {
  const [openModal, setOpenModal] = useState(null); // Unified state for modals: 'sidebar', 'search', 'login', or null
  const location = useLocation();
  const { user, login } = useAuth();

  const isActive = (path) => location.pathname === path;

  const closeModal = () => setOpenModal(null);

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full shadow-sm"
        style={{ backgroundColor: "var(--primary-offwhite)" }}
      >
        <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex gap-8">
            <Link to="/">
              <img src={kairaLogo} alt="Kaira logo" className="h-8 w-auto" />
            </Link>

            {/* Login / Profile Icon */}
            {user ? (
              <Link
                to="/profile"
                className="text-[var(--primary-black)] hover:text-gray-600 cursor-pointer focus:outline-none"
                aria-label="Go to profile"
              >
                <FontAwesomeIcon icon={faUser} className="text-lg" />
              </Link>
            ) : (
              <button
                onClick={() => setOpenModal("login")}
                className="text-[var(--primary-black)] hover:text-gray-600 focus:outline-none"
                aria-label="Open login"
              >
                <FontAwesomeIcon icon={faUser} className="text-lg" />
              </button>
            )}
          </div>

          {/* Middle: Menu Icon (Mobile) or Nav Links (Desktop) */}
          <div className="flex-1 flex justify-center">
            {/* Mobile Menu Icon */}
            <button
              className="lg:hidden text-2xl text-[var(--primary-black)] border border-[var(--primary-gray)] rounded-sm focus:outline-none"
              onClick={() => setOpenModal("sidebar")}
              aria-label="Open menu"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>

            {/* Desktop Nav Links */}
            <DesktopNav navLinks={navLinks} isActive={isActive} />
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-4 lg:space-x-6 flex-shrink-0">
            {/* Search Button */}
            <button
              onClick={() => setOpenModal("search")}
              className="text-[var(--primary-black)] hover:text-gray-600 focus:outline-none"
              aria-label="Open search"
            >
              <FontAwesomeIcon icon={faSearch} className="text-lg" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="flex items-center text-[var(--primary-black)] hover:text-gray-600"
              aria-label="Go to wishlist"
            >
              <FontAwesomeIcon icon={faHeart} className="text-lg" />
              <span className="hidden lg:block ml-2 font-medium text-sm uppercase">
                Wishlist
              </span>
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="flex items-center text-[var(--primary-black)] hover:text-gray-600"
              aria-label="Go to cart"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
              <span className="hidden lg:block ml-2 font-medium text-sm uppercase">
                Cart
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={openModal === "sidebar"}
        onClose={closeModal}
        navLinks={navLinks}
        isActive={isActive}
      />

      {/* Search Overlay (SearchedProducts) */}
      <SearchedProducts isOpen={openModal === "search"} onClose={closeModal} />

      {/* Login Modal */}
      <LoginModal
        isOpen={openModal === "login"}
        onClose={closeModal}
        onLogin={login}
      />
    </>
  );
};

// Subcomponent: DesktopNav
const DesktopNav = ({ navLinks, isActive }) => (
  <nav className="hidden lg:flex space-x-8">
    {navLinks.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        className={`${
          isActive(link.path)
            ? "text-[var(--primary-black)]"
            : "text-[var(--primary-gray)]"
        } hover:text-[var(--primary-black)] font-medium uppercase tracking-wide text-sm`}
      >
        {link.label}
      </Link>
    ))}
  </nav>
);

// Subcomponent: MobileSidebar
const MobileSidebar = ({ isOpen, onClose, navLinks, isActive }) => (
  <div
    className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
      isOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }`}
  >
    <Backdrop onClick={onClose} opacity="opacity-70" />

    <div
      className={`absolute top-0 right-0 h-full w-80 shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ backgroundColor: "var(--primary-offwhite)" }}
    >
      <div className="p-6 flex justify-between items-center border-b border-gray-200">
        <span className="text-2xl uppercase tracking-widest text-[var(--primary-black)] font-['Marcellus']">
          Menu
        </span>
        <button
          onClick={onClose}
          className="text-2xl text-[var(--primary-black)] focus:outline-none"
          aria-label="Close menu"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="p-6 flex flex-col space-y-4">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-lg font-medium ${
              isActive(link.path)
                ? "text-[var(--primary-black)]"
                : "text-[var(--primary-gray)]"
            } hover:text-[var(--primary-black)]`}
            onClick={onClose}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

// Subcomponent: LoginModal
const LoginModal = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    onLogin({ name: "Google User", email: "google@example.com" });
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, validate and auth here; for demo, hardcoded
    onLogin({ email: e.target.email.value });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <Backdrop onClick={onClose} opacity="opacity-50" />

      <div
        className="relative z-10 w-full max-w-md p-8 shadow-2xl"
        style={{ backgroundColor: "var(--primary-offwhite)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-[var(--primary-black)] hover:text-gray-600 focus:outline-none"
          aria-label="Close login"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h2 className="text-2xl font-['Marcellus'] text-[var(--primary-black)] mb-6 text-center uppercase tracking-widest">
          Login
        </h2>

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 border border-[var(--primary-black)] text-[var(--primary-black)] hover:bg-[var(--primary-black)] hover:text-white transition uppercase tracking-wide text-sm font-medium"
          >
            Login with Google
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">
              Or
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-3 border border-gray-300 bg-transparent focus:outline-none focus:border-[var(--primary-black)]"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 bg-transparent focus:outline-none focus:border-[var(--primary-black)]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[var(--primary-black)] text-white hover:bg-gray-800 transition uppercase tracking-wide text-sm font-medium"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Reusable Backdrop component
const Backdrop = ({ onClick, opacity = "opacity-50" }) => (
  <div
    className={`absolute inset-0 bg-[var(--primary-offwhite)] ${opacity}`}
    onClick={onClick}
  ></div>
);

export default Header;
