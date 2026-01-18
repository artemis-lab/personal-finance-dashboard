import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
      <h2 className="mb-8 text-2xl font-semibold text-gray-600">
        Page Not Found
      </h2>
      <p className="mb-8 text-lg text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
        to="/"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
