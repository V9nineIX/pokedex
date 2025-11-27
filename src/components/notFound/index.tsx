import { useRouter } from 'next/navigation';

interface NotFoundProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  onBack?: () => void;
}

export default function NotFound({
  title = 'Pokemon not found',
  message,
  showBackButton = true,
  backButtonText = 'Back to Home',
  onBack,
}: NotFoundProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center px-4">
        <div className="mb-6">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        {message && (
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            {message}
          </p>
        )}
        {showBackButton && (
          <button
            onClick={handleBack}
            className="mt-4 rounded-lg bg-blue-500 px-6 py-3 text-white font-medium hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {backButtonText}
          </button>
        )}
      </div>
    </div>
  );
}

