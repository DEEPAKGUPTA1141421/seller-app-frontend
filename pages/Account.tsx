
import React from 'react';
import { User, Settings, Headphones, LogOut, ChevronRight, FileText } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { useNavigate } from 'react-router-dom';

const Account: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: 'Business Profile', desc: 'Manage store details', path: '/seller-profile' },
    { icon: FileText, label: 'Bank & GST', desc: 'Tax and payout details', path: '/verification' },
    { icon: Settings, label: 'Settings', desc: 'App preferences' },
    { icon: Headphones, label: 'Help Center', desc: 'Get support', path: '/support' },
  ];

  return (
    <MobileLayout title="Account">
      {/* Profile Header - Clickable */}
      <div 
        onClick={() => navigate('/seller-profile')}
        className="bg-white p-6 border-b border-gray-100 flex items-center gap-4 cursor-pointer active:bg-gray-50"
      >
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
           SE
        </div>
        <div className="flex-1">
           <h2 className="text-lg font-bold text-gray-900">Super Electronics</h2>
           <p className="text-sm text-gray-500">seller@flipkart.com</p>
           <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1 inline-block">Verified Seller</span>
        </div>
        <ChevronRight className="text-gray-300 w-5 h-5" />
      </div>

      <div className="mt-4 bg-white border-y border-gray-100 divide-y divide-gray-100">
         {menuItems.map((item, idx) => (
           <div 
             key={idx} 
             onClick={() => item.path && navigate(item.path)}
             className="flex items-center p-4 active:bg-gray-50 cursor-pointer"
            >
              <item.icon className="text-gray-400 w-5 h-5" />
              <div className="flex-1 ml-4">
                 <h4 className="text-sm font-medium text-gray-900">{item.label}</h4>
                 <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <ChevronRight className="text-gray-300 w-5 h-5" />
           </div>
         ))}
      </div>

      <div className="mt-6 px-4">
         <button 
           onClick={() => navigate('/login')}
           className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-lg font-medium"
          >
            <LogOut size={18} />
            Logout
         </button>
      </div>
      
      <p className="text-center text-xs text-gray-400 mt-6 mb-8">Version 2.4.0</p>
    </MobileLayout>
  );
};

export default Account;
