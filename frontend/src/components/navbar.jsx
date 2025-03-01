import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaseballBatBall } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ scrollToSection, isAdmin, setIsadmin }) {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigation = [
    { name: "Introduction", section: "introduction" },
    { name: "Teams", section: "teams" },
    { name: "Players Registered", section: "playersRegistered" },
    { name: "Rules", section: "rules" },
    { name: "Venue", section: "venue" },
    { name: "Date And Timings", section: "dateTimings" },
    { name: "Contact", section: "contact" },
    { name: "Organiser Login", section: "login" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsadmin(false);
  };

  return (
    <Disclosure
      as="nav"
      className={`fixed top-0 w-full z-50 transition-all duration-300 shadow-lg ${scrolling ? "bg-[#802BB1] shadow-lg" : "bg-[#2a024b]"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-[#2a024b] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            </Disclosure.Button>
          </div>

          {/* Logo and Title */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faBaseballBatBall}
                className="text-2xl mr-2 text-white animate-spin"
              />
              <span className="font-bold text-2xl text-white">
                Farewell Cup 2025
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex space-x-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.section)}
                className="text-gray-300 hover:bg-[#ffffff30] hover:text-white rounded-md px-3 py-2 text-sm font-medium transition-all"
              >
                {item.name}
              </button>
            ))}

            {/* Admin Logout Button */}
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="bg-#2a024b text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              onClick={() => scrollToSection(item.section)}
              className="block text-gray-300 hover:bg-[#802BB1] hover:text-white rounded-md px-3 py-2 text-base font-medium"
            >
              {item.name}
            </Disclosure.Button>
          ))}

          {/* Admin Logout Button (Mobile View) */}
          {isAdmin && (
            <Disclosure.Button
              onClick={handleLogout}
              className="block w-full text-center bg-red-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-red-700 transition"
            >
              Logout
            </Disclosure.Button>
          )}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
