import React from 'react';
import { Calendar, Mail, MessageCircle, X } from 'lucide-react';
import { trackCtaClick, trackDemoRequest, trackWhatsAppClick } from '../utils/analytics';
import { emailLink, meetLink, whatsappLink } from '../utils/directOutreach';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-slate-900">Discuss SafetyWarden</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          <a
            href={meetLink}
            onClick={() => {
              trackDemoRequest('modal_direct_outreach');
              trackCtaClick('schedule_google_meet', 'demo_modal');
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-900 transition-colors hover:border-orange-300 hover:bg-orange-50"
          >
            <Calendar className="h-5 w-5 text-orange-600" />
            Schedule a Google Meet
          </a>

          <a
            href={whatsappLink}
            onClick={() => {
              trackCtaClick('whatsapp_click', 'demo_modal');
              trackWhatsAppClick();
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-900 transition-colors hover:border-emerald-300 hover:bg-emerald-50"
          >
            <MessageCircle className="h-5 w-5 text-emerald-600" />
            Chat on WhatsApp
          </a>

          <a
            href={emailLink}
            onClick={() => trackCtaClick('email_safetywarden', 'demo_modal')}
            className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-900 transition-colors hover:border-blue-300 hover:bg-blue-50"
          >
            <Mail className="h-5 w-5 text-blue-600" />
            Email SafetyWarden
          </a>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;
