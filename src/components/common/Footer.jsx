// Footer.jsx - Fully Responsive
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-6">
              D-Light
            </h3>
            <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              India's best platform for electrical & electronic products.
              Genuine products at competitive prices with fast delivery across
              India.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="#"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800/50 rounded-xl flex items-center justify-center hover:bg-yellow-400/20 hover:text-yellow-400 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800/50 rounded-xl flex items-center justify-center hover:bg-yellow-400/20 hover:text-yellow-400 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <Disclosure as="div" className="space-y-4">
            <Disclosure.Button className="flex items-center w-full text-left font-semibold text-gray-200 hover:text-yellow-400 transition-colors text-base sm:text-lg mb-4">
              Quick Links
              <ChevronDownIcon className="ml-2 h-5 w-5 group-data-[open]:rotate-180 transition-transform" />
            </Disclosure.Button>
            <Disclosure.Panel className="space-y-2 text-sm sm:text-base text-gray-300 pl-0 sm:pl-4">
              <Link
                to="/#"
                className="hover:text-yellow-400 transition-colors block py-1"
              >
                About Us
              </Link>
              <Link
                to="/#contact"
                className="hover:text-yellow-400 transition-colors block py-1"
              >
                Contact Us
              </Link>
              <Link
                to="/#"
                className="hover:text-yellow-400 transition-colors block py-1"
              >
                Privacy Policy
              </Link>
              <Link
                to="/#"
                className="hover:text-yellow-400 transition-colors block py-1"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/#"
                className="hover:text-yellow-400 transition-colors block py-1"
              >
                Shipping Policy
              </Link>
            </Disclosure.Panel>
          </Disclosure>

          {/* Categories */}
          <Disclosure as="div" className="space-y-4">
            <Disclosure.Button className="flex items-center w-full text-left font-semibold text-gray-200 hover:text-yellow-400 transition-colors text-base sm:text-lg mb-4">
              Categories
              <ChevronDownIcon className="ml-2 h-5 w-5 group-data-[open]:rotate-180 transition-transform" />
            </Disclosure.Button>
            <Disclosure.Panel className="space-y-1 text-sm sm:text-base text-gray-300 pl-0 sm:pl-4">
              <Link
                to="/#categories"
                className="hover:text-yellow-400 transition-colors block py-1"
              >
                Fans (250+)
              </Link>
              <Link
                to="/#categories"
                className="hover:text-yellow-400 transition-colors block py-1"
              >
                Lighting (538+)
              </Link>
              <Link
                to="/#categories"
                className="hover:text-yellow-400 transition-colors block py-1"
              >
                Switches (760+)
              </Link>
              <Link
                to="/#categories"
                className="hover:text-yellow-400 transition-colors block py-1"
              >
                Cables (154+)
              </Link>
              <Link
                to="/#categories"
                className="hover:text-yellow-400 transition-colors block py-1"
              >
                Appliances
              </Link>
              [attached_file:1]
            </Disclosure.Panel>
          </Disclosure>

          {/* Contact */}
          <div id="contact">
            <h3 className="text-lg sm:text-xl font-semibold mb-6 text-yellow-400">
              Contact Info
            </h3>
            <div className="space-y-4 text-sm sm:text-base text-gray-300">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 mt-1 mr-3 text-yellow-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                ></svg>
                <div>
                  <p>India</p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Nationwide Delivery
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a
                  href="tel:+919999999999"
                  className="hover:text-yellow-400 transition-colors"
                >
                  +91 99999 99999
                </a>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a
                  href="mailto:support@electricbasket.in"
                  className="hover:text-yellow-400 transition-colors"
                >
                  support@d_light.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm sm:text-base text-gray-400 space-y-4 sm:space-y-0 sm:space-x-8">
            <p>© {currentYear} D-Light. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-end">
              <Link to="/#" className="hover:text-yellow-400 transition-colors">
                Payment Methods
              </Link>
              <Link to="/#" className="hover:text-yellow-400 transition-colors">
                Secure Shopping
              </Link>
              <Link to="/#" className="hover:text-yellow-400 transition-colors">
                100% Genuine
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
