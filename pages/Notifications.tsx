
import React from 'react';
import MobileLayout from '../components/MobileLayout';
import { Bell } from 'lucide-react';

const Notifications: React.FC = () => {
  return (
    <MobileLayout title="Notifications" showBack>
       <div className="divide-y divide-gray-100 bg-white">
          {[1,2,3].map(i => (
             <div key={i} className={`p-4 ${i === 1 ? 'bg-blue-50/50' : ''}`}>
                <div className="flex gap-3">
                   <div className="mt-1">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                   </div>
                   <div>
                      <h4 className="text-sm font-medium text-gray-900">New Order Received</h4>
                      <p className="text-xs text-gray-500 mt-1">You received an order of ₹1,499 from Amit Sharma.</p>
                      <p className="text-[10px] text-gray-400 mt-2">2 hours ago</p>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </MobileLayout>
  );
};

export default Notifications;
