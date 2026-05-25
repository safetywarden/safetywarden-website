import React, { useState } from 'react';
import { trackWhatsAppClick } from '../utils/analytics';

const WhatsAppFloat: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick();
    window.open('https://wa.me/918341339444?text=Hi, I want to learn more about SafetyWarden.com', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {isHovered && (
        <div className="bg-white text-slate-800 px-4 py-2 rounded-lg shadow-lg font-medium whitespace-nowrap animate-in fade-in slide-in-from-right-2">
          Chat with us on WhatsApp
        </div>
      )}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.4 8.4 0 0 1-12.1 7.6L3 21l1.9-5.6A8.4 8.4 0 1 1 21 11.5Z" />
      <path d="M9.5 8.8c.2-.5.4-.6.7-.6h.5c.2 0 .4.1.5.4l.8 1.8c.1.3.1.5-.1.7l-.4.5c.8 1.3 1.8 2.3 3.1 3.1l.5-.4c.2-.2.5-.2.7-.1l1.8.8c.3.1.4.3.4.5v.5c0 .3-.2.6-.6.7-.8.3-2 .1-3.7-.9-1.5-.9-2.8-2.1-3.7-3.7-1-1.7-1.2-2.9-.9-3.7Z" />
    </svg>
  );
}

export default WhatsAppFloat;
