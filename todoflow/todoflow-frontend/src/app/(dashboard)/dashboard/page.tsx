import WelcomeCard from "../../../components/dashboard/WelcomeCard";
import TaskSummary from "../../../components/dashboard/TaskSummary";
import RecentTasks from "../../../components/dashboard/RecentTasks";
import UpcomingDeadlines from "../../../components/dashboard/UpcomingDeadlines";
import ProductivityChart from "../../../components/dashboard/ProductivityChart";

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      <WelcomeCard />
      <TaskSummary />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentTasks />
        <UpcomingDeadlines />
      </div>

      <ProductivityChart />
    </div>
  );
}