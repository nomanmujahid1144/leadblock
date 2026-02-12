import React from 'react';
import Image from 'next/image';

interface HeroBannerProps {
  userName: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ userName }) => {
  return (
    <div className="py-2">
      <div className="relative h-[240px] lg:h-[280px] rounded-lg overflow-hidden">
        {/* Background Image */}
        <Image
          src="/home/background.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            opacity: '54%',
            background: 'linear-gradient(180deg, rgba(35, 54, 92, 0.9) 0%, rgba(35, 54, 92, 0.7) 100%, rgba(35, 54, 92, 0) 100%)'
          }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center px-8 lg:px-12">
          <h1 className="text-3xl lg:text-2xl font-bold text-white mb-2">
            Welcome back, {userName}
          </h1>
          <p className="text-md text-white/90">
            Here's what's happening with your campaigns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;