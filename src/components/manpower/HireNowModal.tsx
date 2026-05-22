import React, { useState } from 'react';
import { X } from 'lucide-react';
import { HireNowForm } from '../../types/manpower';

interface HireNowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HireNowModal: React.FC<HireNowModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<HireNowForm>({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    role_title: '',
    job_type: 'Temp',
    vacancies: 1,
    location: '',
    start_date: '',
    duration: '',
    skills: [],
    experience_required: '',
    budget_range: '',
    additional_requirements: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Thank you! Our team will contact you within 2 hours to discuss your requirements.');
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      company_name: '',
      contact_name: '',
      email: '',
      phone: '',
      role_title: '',
      job_type: 'Temp',
      vacancies: 1,
      location: '',
      start_date: '',
      duration: '',
      skills: [],
      experience_required: '',
      budget_range: '',
      additional_requirements: '',
      consent: false
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-navy-900">Hire Staff Now</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-semibold text-navy-900 mb-4">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company_name" className="block text-sm font-medium text-slate-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  required
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label htmlFor="contact_name" className="block text-sm font-medium text-slate-700 mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  id="contact_name"
                  name="contact_name"
                  required
                  value={formData.contact_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Job Requirements */}
          <div>
            <h3 className="text-lg font-semibold text-navy-900 mb-4">Job Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="role_title" className="block text-sm font-medium text-slate-700 mb-1">
                  Role Title *
                </label>
                <input
                  type="text"
                  id="role_title"
                  name="role_title"
                  required
                  value={formData.role_title}
                  onChange={handleChange}
                  placeholder="e.g., Safety Officer, Fire Warden"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label htmlFor="job_type" className="block text-sm font-medium text-slate-700 mb-1">
                  Job Type *
                </label>
                <select
                  id="job_type"
                  name="job_type"
                  required
                  value={formData.job_type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="Temp">Temporary</option>
                  <option value="Contract-to-Hire">Contract-to-Hire</option>
                  <option value="Permanent">Permanent</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="vacancies" className="block text-sm font-medium text-slate-700 mb-1">
                  Number of Positions *
                </label>
                <input
                  type="number"
                  id="vacancies"
                  name="vacancies"
                  required
                  min="1"
                  value={formData.vacancies}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label htmlFor="start_date" className="block text-sm font-medium text-slate-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  required
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              {formData.job_type === 'Temp' && (
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-slate-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 3 months, 6 months"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Required Skills
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Add a skill and press Enter"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                type="button"
                onClick={addSkill}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="experience_required" className="block text-sm font-medium text-slate-700 mb-1">
                Experience Required
              </label>
              <select
                id="experience_required"
                name="experience_required"
                value={formData.experience_required}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select experience level</option>
                <option value="0-1 years">0-1 years (Fresher)</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="budget_range" className="block text-sm font-medium text-slate-700 mb-1">
                Budget Range (Monthly)
              </label>
              <select
                id="budget_range"
                name="budget_range"
                value={formData.budget_range}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select budget range</option>
                <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
                <option value="₹20,000 - ₹30,000">₹20,000 - ₹30,000</option>
                <option value="₹30,000 - ₹50,000">₹30,000 - ₹50,000</option>
                <option value="₹50,000+">₹50,000+</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="additional_requirements" className="block text-sm font-medium text-slate-700 mb-1">
              Additional Requirements
            </label>
            <textarea
              id="additional_requirements"
              name="additional_requirements"
              rows={3}
              value={formData.additional_requirements}
              onChange={handleChange}
              placeholder="Any specific requirements, certifications, or preferences..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              required
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
            />
            <label htmlFor="consent" className="text-sm text-slate-600">
              I agree to the Terms & Conditions and Privacy Policy. I consent to receive communications about SafetyWarden Manpower services. *
            </label>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-slate-300 text-slate-700 py-3 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HireNowModal;