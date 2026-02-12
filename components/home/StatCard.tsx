import React from 'react';
import { UsersIcon, LinkIcon, MessageIcon, ThumbsUpIcon } from './Icons';
import { StatCard as StatCardType } from '@/types/home';

interface StatCardProps {
  stat: StatCardType;
  index: number;
}

const iconMap = {
  users: UsersIcon,
  link: LinkIcon,
  message: MessageIcon,
  thumbsup: ThumbsUpIcon,
};

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  const IconComponent = iconMap[stat.icon];
  
  return (
    <div 
      className="bg-white rounded-lg border border-neutral-200 p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs leading-4 font-medium text-neutral-600 uppercase tracking-wide">
            {stat.label}
          </p>
          <p className="text-2xl leading-8 font-bold text-neutral-900 mt-2 mb-1">
            {stat.value.toLocaleString()}
          </p>
          {stat.percentage !== undefined && (
            <p className="text-sm text-percentage font-medium">
              {stat.percentage}%
            </p>
          )}
        </div>
        
        <div 
          className={`${stat.bgColor} rounded-lg w-10 h-10 flex justify-center items-center transition-transform hover:scale-110`}
        >
          <IconComponent className={stat.iconColor} size={20} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;