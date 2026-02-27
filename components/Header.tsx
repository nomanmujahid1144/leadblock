import React from 'react';
import Image from 'next/image';
import { HomeIcon, ArrowRightIcon, LogoutIcon, MultiPersonsIcon } from './home/Icons';
import Link from 'next/link';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
    return (
        <header className="bg-white fixed top-0 left-0 right-0 z-50">
            <div className="flex items-center justify-between h-16 px-4 md:px-6">
                {/* Left: Hamburger (mobile) + Logo + Breadcrumbs */}
                <div className="flex items-center gap-3 md:gap-4">
                    {/* Hamburger Button - Mobile only */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden flex items-center justify-center w-8 h-8 text-neutral-600 hover:text-neutral-900"
                        aria-label="Toggle menu"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M3 6H17M3 10H17M3 14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>

                    {/* Logo */}
                    <Image src="/logo.svg" alt="NOVA Logo" width={100} height={32} className="md:w-[124px] md:h-[40px]" priority />

                    {/* Breadcrumbs - Desktop only */}
                    <nav className="hidden md:flex items-center gap-2 text-sm">
                        <Link href="#" className="text-sm flex items-center justify-center gap-1 text-text-breadcrumb hover:text-text-heading cursor-pointer">
                            <HomeIcon size={14} />
                            <span>Home</span>
                        </Link>
                        <ArrowRightIcon size={14} />
                        <Link href="#" className="text-sm flex items-center gap-1 text-text-breadcrumb hover:text-text-heading cursor-pointer">
                            <MultiPersonsIcon size={14} />
                            <span>Leads</span>
                        </Link>
                    </nav>
                </div>

                {/* Logout Button */}
                <button className="flex items-center gap-1.5 md:gap-2 text-text-breadcrumb hover:text-text-heading transition-colors group cursor-pointer">
                    <LogoutIcon size={18} className="group-hover:translate-x-0.5 transition-transform md:w-5 md:h-5" />
                    <span className="text-xs md:text-sm font-medium">Log Out</span>
                </button>
            </div>
        </header>
    );
};

export default Header;