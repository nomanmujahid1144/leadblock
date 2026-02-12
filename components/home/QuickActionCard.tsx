import React from 'react';
import { ChartIcon, UsersGroupIcon, UserListIcon, ChatIcon, ArrowRightIcon } from './Icons';
import { QuickAction } from '@/types/home';

interface QuickActionCardProps {
  action: QuickAction;
  index: number;
}

const iconMap = {
  chart: ChartIcon,
  'users-group': UsersGroupIcon,
  'user-list': UserListIcon,
  chat: ChatIcon,
};

const QuickActionCard: React.FC<QuickActionCardProps> = ({ action, index }) => {
  const IconComponent = iconMap[action.icon];
  const isPrimary = action.variant === 'primary';

  return (
    <div className={`${action.bgColor} rounded-lg border ${isPrimary ? 'border-primary/20' : 'border-neutral-200'} p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in`}
      style={{ animationDelay: `${(index + 4) * 100}ms` }} >
      <div className='grid grid-rows-3'>
        <div className="flex items-start row-span-2 gap-3 mb-4 w-9/12">
          <div className={`${isPrimary ? 'bg-white' : 'bg-neutral-100'} rounded-lg w-9 h-9 flex justify-center items-center transition-transform hover:scale-110`}>
            <IconComponent
              className={isPrimary ? 'text-primary' : 'text-neutral-600'}
              size={16}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-sm leading-4 font-semibold text-neutral-900 mb-1">
              {action.title}
            </h3>
            <p className="text-xs text-neutral-600">
              {action.description}
            </p>
          </div>
        </div>

        <button
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 group ${isPrimary
            ? 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md'
            : 'bg-white text-neutral-700 border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50'
            }`}
        >
          <span>{action.buttonText}</span>
          <ArrowRightIcon
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};

export default QuickActionCard;