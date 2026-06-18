import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8 text-slate-900 dark:text-white">
        {children}
      </main>
    </div>
  );
}