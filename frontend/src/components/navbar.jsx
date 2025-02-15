import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ scrollToSection }) {
  const navigation = [
    { name: 'Introduction', section: 'introduction' },
    { name: 'Rules', section: 'rules' },
    { name: 'Registration', section: 'registration' },
    { name: 'Venue', section: 'venue' },
    { name: 'Date And Timings', section: 'timings' },
    { name: 'Contact', section: 'contact' },
  ];

  return (
    <Disclosure as="nav" className="backgroundColor shadow fixed top-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-[#802BB1] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
            </Disclosure.Button>
          </div>

          {/* Logo and navigation links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faBriefcase} className="text-2xl mr-2 text-white animate-spin mr-5" />
              <span className="font-bold text-2xl text-[#802BB1]">Farewell Cup 2025</span>
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.section)}
                    className="text-gray-300 hover:bg-[#802BB1] hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
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
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}