import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-terminal-accent mb-4">404</h1>
        <p className="text-2xl mb-8">Page Not Found</p>
        <Link
          href="/"
          className="inline-block bg-terminal-accent text-terminal-bg px-6 py-3 rounded-md hover:bg-opacity-80 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
