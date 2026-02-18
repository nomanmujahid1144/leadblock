import apiData from '@/data/mock-data.json';
import { computeStats, computeQuickActions, computeActivities } from '@/data/home/transformers/dashboard';

// ─── Current User ────────────────────────────────────────────────────────────
const currentUser = apiData.users.find(u => u.type === 'Customer');
export const currentUserName = currentUser?.username ?? 'User';

// ─── Dashboard Data ───────────────────────────────────────────────────────────
export const statsData = computeStats(apiData.campaign_prospects);
export const quickActionsData = computeQuickActions(apiData.campaign_prospects.length);
export const recentActivities = computeActivities(
  apiData.campaign_prospects,
  apiData.prospects,
  apiData.companies
);