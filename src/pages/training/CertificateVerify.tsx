import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, CheckCircle, XCircle, Calendar, User, Award } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { CertificateVerification } from '../../types/training';

const CertificateVerify: React.FC = () => {
  const { certId } = useParams<{ certId: string }>();
  const [certificate, setCertificate] = useState<CertificateVerification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (certId) {
      verifyCertificate();
    }
  }, [certId]);

  const verifyCertificate = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { data, error: queryError } = await supabase
        .from('v_certificate_public')
        .select('*')
        .eq('certificate_number', certId)
        .single();

      if (queryError) {
        if (queryError.code === 'PGRST116') {
          setError('Certificate not found');
        } else {
          setError('Error verifying certificate');
        }
      } else {
        setCertificate(data);
      }
    } catch (err) {
      setError('Error verifying certificate');
      console.error('Certificate verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Verifying certificate...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-10 w-10 text-navy-600" />
          </div>
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Certificate Verification</h1>
          <p className="text-slate-600">Verify the authenticity of SafetyWarden training certificates</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          {error ? (
            <div className="p-8 text-center">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-red-900 mb-2">Verification Failed</h2>
              <p className="text-red-700 mb-6">{error}</p>
              <p className="text-sm text-slate-600">
                Certificate ID: <span className="font-mono">{certId}</span>
              </p>
            </div>
          ) : certificate ? (
            <>
              {/* Status Header */}
              <div className={`p-6 text-center ${
                certificate.is_valid 
                  ? 'bg-emerald-50 border-b border-emerald-200' 
                  : 'bg-red-50 border-b border-red-200'
              }`}>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {certificate.is_valid ? (
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-600" />
                  )}
                  <h2 className={`text-xl font-bold ${
                    certificate.is_valid ? 'text-emerald-900' : 'text-red-900'
                  }`}>
                    {certificate.is_valid ? 'Valid Certificate' : 'Invalid Certificate'}
                  </h2>
                </div>
                <p className={`text-sm ${
                  certificate.is_valid ? 'text-emerald-700' : 'text-red-700'
                }`}>
                  {certificate.is_valid 
                    ? 'This certificate is authentic and currently valid'
                    : `This certificate is ${certificate.status.toLowerCase()}`
                  }
                </p>
              </div>

              {/* Certificate Details */}
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-navy-900 mb-2">
                    {certificate.course_title}
                  </h3>
                  <p className="text-lg text-slate-600">
                    Awarded to <span className="font-semibold">{certificate.trainee_name}</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">Trainee</p>
                        <p className="text-slate-600">{certificate.trainee_name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">Training Provider</p>
                        <p className="text-slate-600">{certificate.provider_name}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">Issue Date</p>
                        <p className="text-slate-600">
                          {new Date(certificate.issue_date).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">Expiry Date</p>
                        <p className={`${
                          new Date(certificate.expiry_date) > new Date() 
                            ? 'text-slate-600' 
                            : 'text-red-600 font-medium'
                        }`}>
                          {new Date(certificate.expiry_date).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm font-medium text-slate-900 mb-2">Certificate Number</p>
                  <p className="font-mono text-slate-700 text-lg">{certificate.certificate_number}</p>
                </div>

                {!certificate.is_valid && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-900 mb-2">Certificate Status</h4>
                    <p className="text-red-700 text-sm">
                      This certificate is currently <strong>{certificate.status.toLowerCase()}</strong>
                      {certificate.status === 'Expired' && ' and needs to be renewed'}
                      {certificate.status === 'Revoked' && ' and is no longer valid'}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>

        {/* Verification Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">About Certificate Verification</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• All SafetyWarden certificates are digitally signed and tamper-proof</p>
            <p>• QR codes provide instant verification without internet dependency</p>
            <p>• Certificate data is stored securely with blockchain-level integrity</p>
            <p>• Employers can verify certificates online using this verification system</p>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 mb-2">
            Questions about this certificate?
          </p>
          <a
            href="mailto:certificates@safetywarden.com"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            Contact Certificate Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerify;
