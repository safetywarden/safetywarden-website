import React from 'react';
import { Calendar, Mail, MessageCircle } from 'lucide-react';
import { trackDemoRequest, trackFormSubmission, trackWhatsAppClick } from '../utils/analytics';
import { emailLink, meetLink, whatsappLink } from '../utils/directOutreach';

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  showBookDemo?: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({
  title = 'Connect with SafetyWarden',
  subtitle = 'Choose a direct outreach channel to discuss your compliance operations.',
}) => {
  const handleMeetClick = () => {
    trackDemoRequest('direct_outreach');
  };

  const handleEmailClick = () => {
    trackFormSubmission('direct_email');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-navy-900 mb-2">{title}</h3>
        <p className="text-slate-600">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <a
          href={meetLink}
          onClick={handleMeetClick}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-slate-900 transition-colors hover:border-orange-300 hover:bg-orange-50"
        >
          <span className="flex items-center gap-3 font-semibold">
            <Calendar className="h-5 w-5 text-orange-600" />
            Schedule a Google Meet
          </span>
        </a>

        <a
          href={whatsappLink}
          onClick={trackWhatsAppClick}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-slate-900 transition-colors hover:border-emerald-300 hover:bg-emerald-50"
        >
          <span className="flex items-center gap-3 font-semibold">
            <MessageCircle className="h-5 w-5 text-emerald-600" />
            Chat on WhatsApp
          </span>
        </a>

        <a
          href={emailLink}
          onClick={handleEmailClick}
          className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-slate-900 transition-colors hover:border-blue-300 hover:bg-blue-50"
        >
          <span className="flex items-center gap-3 font-semibold">
            <Mail className="h-5 w-5 text-blue-600" />
            Email SafetyWarden
          </span>
        </a>
      </div>
    </div>
  );
};

export default LeadForm;
