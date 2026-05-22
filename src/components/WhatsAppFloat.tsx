import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
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
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default WhatsAppFloat;