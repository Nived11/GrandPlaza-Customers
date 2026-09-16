export default function OrdersSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-24 rounded-2xl bg-white border border-gray-100 animate-pulse"
        />
      ))}
    </div>
  );
}