import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SpecialOfferBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 py-3 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1 justify-center space-x-3">
            <Sparkles className="h-5 w-5 text-yellow-200 animate-pulse" />
            <p className="text-sm md:text-base font-semibold text-center">
              <span className="bg-white text-orange-600 px-2 py-1 rounded font-bold mr-2">SPECIAL OFFER</span>
              <span className="hidden sm:inline">Exclusive offer for </span>
              <span className="font-bold">Auditors & Consultants</span>
              <Link
                to="/contact"
                className="ml-3 underline hover:text-yellow-200 transition-colors font-bold"
              >
                Claim Now
              </Link>
            </p>
            <Sparkles className="h-5 w-5 text-yellow-200 animate-pulse" />
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
            aria-label="Close banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOfferBanner;
