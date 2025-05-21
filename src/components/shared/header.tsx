import React from 'react';
import { Container } from './container';
import Link from 'next/link';
import { Button } from '../ui/button';
import { FaBookOpen } from 'react-icons/fa6';


interface HeaderProps {
    className?: string;
}


export const Header: React.FC<HeaderProps> = ({ className }) => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-[rgb(18, 18, 18)] shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-all duration-300">
            <Container className={`flex items-center justify-between py-4 ${className}`}>
                <div className="flex items-center gap-3">
                    <FaBookOpen className="text-2xl text-[#e2f5f3]" />
                    <Link
                        href="/"
                        className="text-2xl font-bold tracking-wide text-[#e2f5f3] hover:text-[#ff6b81] transition-colors duration-200"
                    >
                        AniKoManga
                    </Link>
                </div>
                <nav className="flex items-center gap-6">
                    <Link
                        href="/search"
                        className="text-base font-medium text-[#e2f5f3] hover:text-[#ff6b81] transition-colors duration-200"
                    >
                        Search
                    </Link>
                    <Link
                        href="/random"
                        className="text-base font-medium text-[#e2f5f3] hover:text-[#ff6b81] transition-colors duration-200"
                    >
                        Random Manga
                    </Link>
                    <Link
                        href="/favorites"
                        className="text-base font-medium text-[#e2f5f3] hover:text-[#ff6b81] transition-colors duration-200"
                    >
                        Favorites
                    </Link>
                    <Link
                        href="/about"
                        className="text-base font-medium text-[#e2f5f3] hover:text-[#ff6b81] transition-colors duration-200"
                    >
                        About
                    </Link>
                </nav>
            </Container>
        </header>
    );
};
