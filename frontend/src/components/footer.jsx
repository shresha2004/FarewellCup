import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#1a0000] to-[#8b0000] text-white py-6">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">

                {/* Brand Section */}
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold">Farewell Cup 2026</h2>
                    <p className="text-sm opacity-80">Developed by Shresha & Amogh</p>
                </div>

                {/* Social Media Links */}
                <div className="flex space-x-6 text-xl">
                    <a href="#" className="hover:text-gray-300 transition duration-300"><FaFacebook /></a>
                    <a href="https://www.instagram.com/nmit_hcl/" className="hover:text-gray-300 transition duration-300"><FaInstagram /></a>
                    <a href="#" className="hover:text-gray-300 transition duration-300"><FaTwitter /></a>
                    <a href="#" className="hover:text-gray-300 transition duration-300"><FaLinkedin /></a>
                </div>

                {/* Copyright */}
                <div className="text-sm text-center md:text-right opacity-80">
                    &copy; {new Date().getFullYear()} Farewell Cup. All Rights Reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
