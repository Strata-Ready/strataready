import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          StrataReady
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          BC Strata Management Licensing Exam Prep
        </p>
        <p className="text-gray-500 mb-10">
          105 questions · Instant results · Exact study references · Adaptive retakes
        </p>
        <Link
          href="/exam"
          className="inline-block bg-blue-600 text-white text-lg font-medium px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Practice Exam
        </Link>
        <p className="mt-6 text-sm text-gray-400">
          Mirrors the real UBC Sauder exam — 100 questions, 70% to pass
        </p>
      </div>
    </main>
  );
}