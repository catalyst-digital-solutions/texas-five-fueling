import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Operations Platform</h1>
        <div className="bg-blue-50 text-blue-700 p-4 rounded-md mb-6">
          <p className="font-medium">Coming Soon in Phase 2</p>
        </div>
        <p className="text-gray-600 mb-8">
          The Texas Five Fueling operations platform is currently in development and will be available in Phase 2. 
          This platform will include customer management, order tracking, and dispatch features.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 motion-reduce:transition-none"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}

