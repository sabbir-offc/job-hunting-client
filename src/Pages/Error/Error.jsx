import Lottie from "lottie-react";
import Animation from "/public/Animation/404.json";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="py-10 w-full h-screen flex items-center justify-center">
      <div className="text-center">
        <Lottie animationData={Animation}></Lottie>
        <p className="mt-4 text-base leading-7 text-gray-600">
          {`Sorry, we couldn't find the page you're looking for.`}
        </p>
        <div className="mt-4 flex items-center justify-center gap-x-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <Link to="/" className="flex items-center" replace>
              <ArrowLeft size={16} className="mr-2" />
              Go Home
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
