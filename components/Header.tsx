import React from 'react';
import Image from 'next/image';
import { HomeIcon, ArrowRightIcon, LogoutIcon, MultiPersonsIcon } from './home/Icons';
import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-white sticky top-0 z-50 py-2">
            <div className="flex items-center justify-between h-14 md:h-16">
                {/* Logo */}
                <div className="flex items-center gap-4 md:gap-8">
                    <Image src="/logo.svg" alt="NOVA Logo" width={100} height={32} className="md:w-[124px] md:h-[40px]" priority />

                    {/* Breadcrumbs */}
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
                    <LogoutIcon size={20} className="group-hover:translate-x-0.5 transition-transform md:w-5 md:h-5" />
                    <span className="text-xs md:text-sm font-medium">Log Out</span>
                </button>
            </div>
        </header>
    );
};

export default Header;