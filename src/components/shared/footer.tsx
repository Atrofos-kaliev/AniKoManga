import React from 'react';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';
import { Container } from './container';

interface FooterProps {
    className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={`w-full border-t border-border/60 bg-gradient-to-r from-[#232526] via-[#414345] to-[#232526] text-[#e2f5f3] ${className}`}
        >
            <Container className="py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <Link
                            href="/"
                            className="text-xl font-bold tracking-wide text-[#e2f5f3] hover:text-[#ff6b81] transition-colors duration-200"
                        >
                            AniKoManga
                        </Link>
                        <p className="mt-2 text-sm text-gray-400">
                            © {currentYear} AniKoManga. All Rights Reserved.
                        </p>
                        <p className="mt-1 text-xs text-gray-500"> 
                            Your portal to endless manga adventures.
                        </p>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        <Link
                            href="/about"
                            className="text-sm font-medium text-[#e2f5f3] hover:text-[#ff6b81] transition-colors duration-200"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-medium text-[#e2f5f3] hover:text-[#ff6b81] transition-colors duration-200"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-sm font-medium text-[#e2f5f3] hover:text-[#ff6b81] transition-colors duration-200"
                        >
                            Privacy Policy
                        </Link>
                    </nav>

                    {}
                    <div className="flex items-center gap-5">
                        <a
                            href="https://twitter.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                            className="text-[#e2f5f3] hover:text-[#ff6b81] transition-colors duration-200"
                        >
                            <FaTwitter size={22} />
                        </a>
                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="text-[#e2f5f3] hover:text-[#ff6b81] transition-colors duration-200"
                        >
                            <FaGithub size={22} />
                        </a>
                        <a
                            href="https://discord.gg/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Discord"
                            className="text-[#e2f5f3] hover:text-[#ff6b81] transition-colors duration-200"
                        >
                            <FaDiscord size={22} />
                        </a>
                    </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-border/40 text-center text-xs text-gray-500">
                    <p>
                        Crafted with by Ablaykan
                    </p>
                </div>
            </Container>
        </footer>
    );
};