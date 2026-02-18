import { ApiCampaignProspect, ApiProspect, ApiCompany, StatCard, QuickAction, Activity } from '@/types/home';
import { formatDate } from '@/lib/utils/formatDate';

// ─── Helpers ────────────────────────────────────────────────────────────────

const toPercentage = (value: number, total: number): number =>
  total === 0 ? 0 : Math.round((value / total) * 100);

const getInitials = (firstName: string, lastName: string): string =>
  `${firstName[0]}${lastName[0]}`.toUpperCase();

// ─── Stats ───────────────────────────────────────────────────────────────────

export const computeStats = (campaignProspects: ApiCampaignProspect[]): StatCard[] => {
  const total = campaignProspects.length;
  const connected = campaignProspects.filter(cp => cp.prospect_status === 'Connected').length;
  const replied = campaignProspects.filter(cp => cp.date_replied !== null).length;
  const positive = campaignProspects.filter(cp => cp.date_positive_tag !== null).length;

  return [
    {
      id: '1',
      label: 'Total Requests Sent',
      value: total,
      icon: 'users',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500',
    },
    {
      id: '2',
      label: 'Connected',
      value: connected,
      percentage: toPercentage(connected, total),
      icon: 'link',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500',
    },
    {
      id: '3',
      label: 'Replied',
      value: replied,
      percentage: toPercentage(replied, total),
      icon: 'message',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500',
    },
    {
      id: '4',
      label: 'Positive',
      value: positive,
      percentage: toPercentage(positive, total),
      icon: 'thumbsup',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500',
    },
  ];
};

// ─── Quick Actions ────────────────────────────────────────────────────────────

export const computeQuickActions = (totalLeads: number): QuickAction[] => [
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
    description: `${totalLeads} leads need attention`,
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

// ─── Recent Activity ──────────────────────────────────────────────────────────

export const computeActivities = (
  campaignProspects: ApiCampaignProspect[],
  prospects: ApiProspect[],
  companies: ApiCompany[]
): Activity[] => {
  const getProspect = (id: number) => prospects.find(p => p.id === id);
  const getCompany = (id: number) => companies.find(c => c.id === id);

  const activities: Activity[] = [];

  campaignProspects.forEach(cp => {
    const prospect = getProspect(cp.prospect);
    if (!prospect) return;

    const company = getCompany(prospect.company_id);
    const userName = `${prospect.first_name} ${prospect.last_name}`;
    const userInitials = getInitials(prospect.first_name, prospect.last_name);

    if (cp.lead_phase === 'In process') {
      activities.push({
        id: String(cp.id),
        type: 'new_lead',
        userName,
        userInitials,
        timestamp: formatDate(cp.date_connection_requested),
        details: {
          position: cp.job_title,
          company: company?.name ?? '',
          chatterDate: formatDate(cp.date_connected),
          internalDate: formatDate(cp.date_positive_tag),
        },
        socials: { linkedin: prospect.linkedin_url },
      });
    } else if (cp.lead_phase === 'Meeting planned') {
      activities.push({
        id: String(cp.id),
        type: 'meeting_booked',
        userName,
        userInitials,
        timestamp: formatDate(cp.date_replied),
        details: {},
        socials: { linkedin: prospect.linkedin_url },
      });
    } else if (cp.date_replied !== null && cp.prospect_status !== 'Connected') {
      activities.push({
        id: String(cp.id),
        type: 'message_replied',
        userName,
        userInitials,
        timestamp: formatDate(cp.date_replied),
        details: { platform: 'LinkedIn' },
        socials: { linkedin: prospect.linkedin_url },
      });
    } else if (['Closed lost', 'Closed won', 'Negotiation'].includes(cp.lead_phase)) {
      activities.push({
        id: String(cp.id),
        type: 'phase_changed',
        userName,
        userInitials,
        timestamp: formatDate(cp.date_connected),
        details: {
          phase: cp.lead_phase,
          status: cp.job_title,
        },
        socials: { linkedin: prospect.linkedin_url },
      });
    }
  });

  return activities;
};