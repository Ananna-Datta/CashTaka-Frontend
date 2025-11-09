import { Link } from "react-router";
import Logo from "@/assets/images/Logo/logo.png";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t bg-white dark:bg-gray-900 dark:border-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={Logo} alt="CashTaka Logo" className="w-10 h-10" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">CashTaka</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            A secure and smart digital wallet to help you send, receive, and manage money anytime, anywhere.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 text-sm">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-teal-600 dark:hover:text-teal-400" to="/about">About Us</Link></li>
            <li><Link className="hover:text-teal-600 dark:hover:text-teal-400" to="/features">Features</Link></li>
            <li><Link className="hover:text-teal-600 dark:hover:text-teal-400" to="/contact">Contact</Link></li>
            <li><Link className="hover:text-teal-600 dark:hover:text-teal-400" to="/faq">FAQ</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 text-sm">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-teal-600 dark:hover:text-teal-400" to="/privacy">Privacy Policy</Link></li>
            <li><Link className="hover:text-teal-600 dark:hover:text-teal-400" to="/terms">Terms & Conditions</Link></li>
            <li><Link className="hover:text-teal-600 dark:hover:text-teal-400" to="/security">Security</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 text-sm">Follow Us</h3>
          <div className="flex gap-4 text-xl text-gray-600 dark:text-gray-400">
            <FaFacebook className="hover:text-teal-600 cursor-pointer" />
            <FaTwitter className="hover:text-teal-600 cursor-pointer" />
            <FaInstagram className="hover:text-teal-600 cursor-pointer" />
            <FaLinkedin className="hover:text-teal-600 cursor-pointer" />
          </div>
        </div>

      </div>

      <div className="border-t dark:border-gray-700 py-4 text-center text-xs text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} CashTaka — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
