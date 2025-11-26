
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Camera, Upload } from 'lucide-react';
import { api } from '../services/api';
import { KYCData } from '../types';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<KYCData>({
    fullName: '',
    mobile: '',
    email: '',
    storeName: '',
    gstin: '',
    address: '',
    bankAccount: '',
    ifsc: '',
    aadharFile: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = async () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Submit
      setLoading(true);
      await api.register(formData);
      setLoading(false);
      navigate('/'); // Go to dashboard after success
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-between mb-8 px-2">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className={`w-2 h-2 rounded-full ${i <= step ? 'bg-blue-600' : 'bg-gray-200'}`} />
      ))}
    </div>
  );

  return (
    <div className="h-screen bg-white flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}>
          <ArrowLeft className="text-gray-600" />
        </button>
        <span className="font-semibold text-lg">Create Account</span>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {renderStepIndicator()}

        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900">Basic Details</h2>
            <p className="text-gray-500 text-sm mb-6">Let's get you started with the basics.</p>
            
            <input 
              name="fullName" 
              placeholder="Full Name" 
              value={formData.fullName} 
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              name="mobile" 
              placeholder="Mobile Number" 
              value={formData.mobile} 
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              name="email" 
              placeholder="Email Address" 
              value={formData.email} 
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900">Store Details</h2>
            <p className="text-gray-500 text-sm mb-6">Tell us about your business.</p>

            <input 
              name="storeName" 
              placeholder="Store Display Name" 
              value={formData.storeName} 
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              name="address" 
              placeholder="Pickup Address" 
              value={formData.address} 
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
            <p className="text-gray-500 text-sm mb-6">Verify your identity.</p>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-3">
                <Camera size={24} />
              </div>
              <p className="font-medium text-gray-900">Upload Aadhar Card</p>
              <p className="text-xs text-gray-400 mt-1">Front and Back side</p>
            </div>

            <input 
              name="gstin" 
              placeholder="GSTIN (Optional)" 
              value={formData.gstin} 
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900">Bank Details</h2>
            <p className="text-gray-500 text-sm mb-6">Where should we send your payouts?</p>

            <input 
              name="bankAccount" 
              placeholder="Account Number" 
              value={formData.bankAccount} 
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              name="ifsc" 
              placeholder="IFSC Code" 
              value={formData.ifsc} 
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4 animate-fade-in text-center pt-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-4">
               <Check size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">You're Ready!</h2>
            <p className="text-gray-500 text-sm">Review your details and submit to start selling.</p>
            
            <div className="bg-gray-50 p-4 rounded-xl text-left text-sm space-y-2 mt-6">
               <p><span className="text-gray-500">Name:</span> {formData.fullName}</p>
               <p><span className="text-gray-500">Store:</span> {formData.storeName}</p>
               <p><span className="text-gray-500">Mobile:</span> {formData.mobile}</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={handleNext}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold text-lg shadow-lg active:scale-95 transition-transform"
        >
          {loading ? 'Creating Account...' : step === 5 ? 'Submit Application' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};

export default Signup;
