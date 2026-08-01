import TaskSummary from "../../../../components/dashboard/TaskSummary";
import ProductivityChart from "../../../../components/dashboard/ProductivityChart";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-foreground">Analytics</h1>
      <TaskSummary />
      <ProductivityChart />
    </div>
  );
}