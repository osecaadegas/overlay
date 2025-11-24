import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Twitch OAuth
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Sign in with your Twitch account to manage permissions
        </p>
        
        <Link
          href="/api/auth/signin"
          className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
        >
          Sign in with Twitch
        </Link>

        <div className="mt-6 text-center">
          <Link
            href="/admin"
            className="text-purple-600 dark:text-purple-400 hover:underline text-sm"
          >
            Admin Panel →
          </Link>
        </div>
      </div>
    </div>
  );
}
