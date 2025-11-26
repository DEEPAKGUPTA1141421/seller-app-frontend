
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Upload, ShieldCheck, FileText } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { api } from '../services/api';

const Verification: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [gst, setGst] = useState('');
  const [aadhar, setAadhar] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await api.submitKYC({ gstin: gst, aadharFile: aadhar });
    setLoading(false);
    alert("Verification submitted successfully!");
    navigate('/account');
  };

  return (
    <MobileLayout showBack title="Seller Verification">
      <div className="p-4 space-y-6">
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
          <ShieldCheck className="text-blue-600 w-6 h-6 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900">Complete KYC</h3>
            <p className="text-sm text-blue-700 mt-1">Verify your identity and business details to receive payments without interruption.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* GST Section */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FileText size={18} /> GST Details
            </h3>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
               <label className="block text-xs font-semibold text-gray-500 mb-1">GSTIN Number</label>
               <input 
                 value={gst}
                 onChange={(e) => setGst(e.target.value)}
                 placeholder="22AAAAA0000A1Z5"
                 className="w-full border-b border-gray-300 py-2 outline-none text-base text-gray-900 uppercase font-mono"
               />
            </div>
          </div>

          {/* Aadhar Section */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <ShieldCheck size={18} /> Identity Proof (Aadhar)
            </h3>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 text-blue-600">
                  <Camera size={20} />
               </div>
               <p className="text-sm font-medium text-gray-700">Upload Front Side</p>
               <button type="button" className="text-xs text-blue-600 font-bold mt-2">BROWSE FILES</button>
            </div>
          </div>

          <button 
             type="submit" 
             disabled={loading}
             className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold text-lg shadow-lg mt-8"
          >
             {loading ? 'Submitting...' : 'Submit for Verification'}
          </button>
        </form>
      </div>
    </MobileLayout>
  );
};

export default Verification;
