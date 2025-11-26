
import React from 'react';
import { Download, Calendar, ArrowUpRight } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';

const Payments: React.FC = () => {
  return (
    <MobileLayout title="Payments">
       <div className="p-4 space-y-4">
          {/* Main Card */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
             <p className="text-sm text-gray-500">Next Payout</p>
             <h1 className="text-3xl font-bold text-gray-900 mt-1">₹12,450</h1>
             <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded">Due Oct 28</span>
                <span className="text-gray-400">Transaction ID: #TRX992</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500">Last Settlement</p>
                <p className="text-lg font-bold">₹8,320</p>
             </div>
             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500">Hold Amount</p>
                <p className="text-lg font-bold text-orange-600">₹450</p>
             </div>
          </div>

          <div>
             <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
                <button className="text-blue-600 text-xs font-medium">View All</button>
             </div>
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                {[1,2,3].map(i => (
                   <div key={i} className="p-4 flex justify-between items-center">
                      <div className="flex gap-3 items-center">
                         <div className="bg-green-100 p-2 rounded-full text-green-600">
                            <ArrowUpRight size={16} />
                         </div>
                         <div>
                            <p className="text-sm font-medium">Order Settlement</p>
                            <p className="text-xs text-gray-400">Oct 24, 10:30 AM</p>
                         </div>
                      </div>
                      <span className="font-bold text-sm text-green-600">+ ₹1,499</span>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </MobileLayout>
  );
};

export default Payments;
