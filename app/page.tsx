import Header from '@/components/Header';
import HeroBanner from '@/components/home/HeroBanner';
import StatCard from '@/components/home/StatCard';
import QuickActionCard from '@/components/home/QuickActionCard';
import ActivityItem from '@/components/home/ActivityItem';
import { statsData, quickActionsData, recentActivities } from '@/data/home/mockData';

export default function Home() {
  return (
    <div className="min-h-screen max-w-350 mx-auto px-6 lg:px-6 xl:px-8">
      {/* Header */}
      <Header />

      {/* Hero Banner */}
      <HeroBanner userName="Tom" />

      {/* Main Content */}
      <main className="px-8 lg:px-10 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>

        {/* Quick Actions Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-1">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActionsData.map((action, index) => (
              <QuickActionCard key={action.id} action={action} index={index} />
            ))}
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="bg-white rounded-lg border border-neutral-200 px-4 py-2.5 animate-fade-in w-full lg:w-1/2" style={{ animationDelay: '800ms' }}>
          <h2 className="text-xl font-bold text-neutral-900 mb-2.5">Recent Activity</h2>
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