export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-9999 min-h-screen w-full bg-white flex items-center justify-center">
      {children}
    </div>
  );
}