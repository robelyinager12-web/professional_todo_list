import AnimatedCounter from "../shared/AnimatedCounter";

const stats = [
  { value: 10000, suffix: "+", label: "Tasks Completed" },
  { value: 5000, suffix: "+", label: "Happy Users" },
  { value: 99, suffix: "%", label: "Customer Satisfaction" },
  { value: 24, suffix: "/7", label: "Cloud Sync" },
];

export default function Statistics() {
  return (
    <section className="border-y border-border bg-muted/40 px-6 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 text-center lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}