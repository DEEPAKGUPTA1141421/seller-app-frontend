
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/MobileLayout';
import { ShieldCheck, ShieldAlert, FileText, Smartphone, Mail, Store } from 'lucide-react';

const SellerProfile: React.FC = () => {
  const navigate = useNavigate();
  // Mock user for now, in real app fetch from API
  const [user] = useState<any>({
    name: 'Super Electronics',
    email: 'seller@flipkart.com',
    storeName: 'Super Electronics Store',
    mobile: '+91 9876543210',
    gstin: '22AAAAA0000A1Z5',
    isVerified: false // Set to false to demonstrate verification flow
  });

  return (
    <MobileLayout showBack title="Seller Profile">
      <div className="p-4 space-y-6">
        {/* Header Avatar */}
        <div className="flex flex-col items-center py-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-3xl mb-3">
            {user.name.charAt(0)}
          </div>
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${user.isVerified ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
             {user.isVerified ? <ShieldCheck size={12}/> : <ShieldAlert size={12}/>}
             {user.isVerified ? 'Verified Seller' : 'Unverified'}
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4">
           <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Business Details</h3>
           
           <ProfileField icon={Store} label="Store Name" value={user.storeName} />
           <ProfileField icon={Mail} label="Email" value={user.email} />
           <ProfileField icon={Smartphone} label="Mobile" value={user.mobile} />
        </div>

        {/* Verification Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4">
           <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="font-semibold text-gray-900">KYC & Compliance</h3>
              {!user.isVerified && (
                <button 
                  onClick={() => navigate('/verification')}
                  className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-full font-medium"
                >
                  Verify Now
                </button>
              )}
           </div>

           <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                 <FileText className="text-gray-400" size={20} />
                 <div>
                    <p className="text-sm font-medium text-gray-900">GSTIN</p>
                    <p className="text-xs text-gray-500">{user.gstin || 'Not added'}</p>
                 </div>
              </div>
              {user.gstin ? <ShieldCheck className="text-green-500" size={18} /> : <ShieldAlert className="text-orange-500" size={18} />}
           </div>

           <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                 <ShieldCheck className="text-gray-400" size={20} />
                 <div>
                    <p className="text-sm font-medium text-gray-900">Aadhar Card</p>
                    <p className="text-xs text-gray-500">{user.isVerified ? 'Verified' : 'Pending'}</p>
                 </div>
              </div>
              {user.isVerified ? <ShieldCheck className="text-green-500" size={18} /> : <ShieldAlert className="text-orange-500" size={18} />}
           </div>
        </div>
      </div>
    </MobileLayout>
  );
};

const ProfileField = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center gap-3">
     <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
        <Icon size={16} />
     </div>
     <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
     </div>
  </div>
);

export default SellerProfile;
