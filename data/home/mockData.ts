import { StatCard, QuickAction, Activity } from '@/types/home';

export const statsData: StatCard[] = [
  {
    id: '1',
    label: 'Total Requests Sent',
    value: 475,
    icon: 'users',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-500',
  },
  {
    id: '2',
    label: 'Connected',
    value: 294,
    percentage: 25,
    icon: 'link',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-500',
  },
  {
    id: '3',
    label: 'Replied',
    value: 107,
    percentage: 36,
    icon: 'message',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-500',
  },
  {
    id: '4',
    label: 'Positive',
    value: 24,
    percentage: 15,
    icon: 'thumbsup',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-500',
  },
];

export const quickActionsData: QuickAction[] = [
  {
    id: '1',
    title: 'View Statistics',
    description: 'Analyze your campaign performance',
    icon: 'chart',
    buttonText: 'Open Statistics',
    variant: 'default',
    bgColor: 'bg-white',
  },
  {
    id: '2',
    title: 'Manage Leads',
    description: '475 leads need attention',
    icon: 'users-group',
    buttonText: 'Check Leads',
    variant: 'primary',
    bgColor: 'bg-red-50',
  },
  {
    id: '3',
    title: 'All Prospects',
    description: 'Browse your complete prospect list',
    icon: 'user-list',
    buttonText: 'View Prospects',
    variant: 'default',
    bgColor: 'bg-white',
  },
  {
    id: '4',
    title: 'Private Chats',
    description: 'View conversations outside leadgen',
    icon: 'chat',
    buttonText: 'View Chats',
    variant: 'default',
    bgColor: 'bg-white',
  },
];

export const recentActivities: Activity[] = [
  {
    id: '1',
    type: 'new_lead',
    userName: 'Emma Belean',
    userInitials: 'EB',
    timestamp: '2 min ago',
    details: {
      position: 'Business Development Manager',
      company: 'b futurist',
      chatterDate: '01-01-26',
      internalDate: '04-01-26',
    },
    socials:{
      linkedin: "#"
    }
  },
  {
    id: '2',
    type: 'meeting_booked',
    userName: 'Arnoud van Lent',
    userInitials: 'AvL',
    timestamp: '15 min ago',
    details: {},
    socials:{
      linkedin: ""
    }
  },
  {
    id: '3',
    type: 'message_replied',
    userName: 'Koen Driessens',
    userInitials: 'KD',
    timestamp: '1 hour ago',
    details: {
      platform: 'LinkedIn',
    },
    socials:{
      linkedin: ""
    }
  },
  {
    id: '4',
    type: 'phase_changed',
    userName: 'Mourad Doudouh',
    userInitials: 'MD',
    timestamp: '2 hours ago',
    details: {
      phase: 'Maybe interested',
      status: 'Hot lead',
    },
    socials:{
      linkedin: ""
    }
  },
];