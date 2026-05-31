import Navbar from "./Navbar";

export default function Layout({
  children,
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-6xl p-6">
        {children}
      </main>
    </div>
  );
}