export default function AddressSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="h-28 rounded-2xl bg-white border border-gray-100 animate-pulse"
        />
      ))}
    </div>
  );
}