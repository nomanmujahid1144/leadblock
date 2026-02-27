import HeroBanner from '@/components/home/HeroBanner';
import StatCard from '@/components/home/StatCard';
import QuickActionCard from '@/components/home/QuickActionCard';
import ActivityItem from '@/components/home/ActivityItem';
import { statsData, quickActionsData, recentActivities, currentUserName } from '@/data/home/mockData';

export default function Home() {
  return (
    <div className="min-h-screen px-6 md:px-0">
      {/* Hero Banner */}
      <HeroBanner userName={currentUserName} />

      {/* Main Content */}
      <main className="px-0 md:px-4 lg:px-6 py-6 md:py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          {statsData.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>

        {/* Quick Actions Section */}
        <section className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-bold text-text-heading mb-2 md:mb-1">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {quickActionsData.map((action, index) => (
              <QuickActionCard key={action.id} action={action} index={index} />
            ))}
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="rounded-lg border border-stroke px-4 py-2.5 animate-fade-in w-full lg:w-1/2" style={{ animationDelay: '800ms' }}>
          <h2 className="text-lg md:text-xl font-bold text-text-heading mb-2.5">Recent Activity</h2>
          <div className="space-y-0">
            {recentActivities.map((activity, index) => (
              <ActivityItem key={activity.id} activity={activity} index={index} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}