interface LoadingSkeletonProps {
  count?: number;
  height?: string;
  className?: string;
}

export default function LoadingSkeleton({ count = 3, height = "h-20", className = "" }: LoadingSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`animate-pulse rounded-xl bg-muted ${height} ${className}`} />
      ))}
    </div>
  );
}