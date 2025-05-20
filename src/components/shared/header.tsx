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
                        href="/explore"
                        className="text-base font-medium text-[#e2f5f3] hover:text-[#ff6b81] transition-colors duration-200"
                    >
                        Explore
                    </Link>
                    <Link
                        href="/favorites"
                        className="text-base font-medium text-[#e2f5f3] hover:text-[#ff6b81] transition-colors duration-200"
                    >
                        Favorites
                    </Link>
                    <Link
                        href="/profile"
                        className="text-base font-medium text-[#e2f5f3] hover:text-[#ff6b81] transition-colors duration-200"
                    >
                        Profile
                    </Link>
                    <Button
                        asChild
                        className="flex items-center rounded-md px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-[#ff6b81] to-[#ff4757] hover:from-[#ff4757] hover:to-[#ff6b81] shadow-md transition-all duration-200"
                    >
                        <Link href="/login">Login</Link>
                    </Button>
                </nav>
            </Container>
        </header>
    );
};
