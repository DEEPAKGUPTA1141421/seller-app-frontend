
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, AlertCircle, ChevronRight, Package, Clock } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { api } from '../services/api';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getDashboardStats().then(data => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <MobileLayout title="Dashboard">
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    </MobileLayout>
  );

  return (
    <MobileLayout title="SellerHub" showMenu>
      {/* Verification Banner */}
      <div className="bg-orange-50 p-4 border-b border-orange-100 flex gap-3 items-start">
        <AlertCircle className="text-orange-500 w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-orange-800">Complete KYC</h3>
          <p className="text-xs text-orange-600 mt-1">Verify your bank details to start receiving payments.</p>
        </div>
        <ChevronRight className="text-orange-400 w-5 h-5" />
      </div>

      <div className="p-4 space-y-4">
        {/* Sales Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-blue-100 text-sm">Today's Sales</p>
              <h2 className="text-3xl font-bold mt-1">₹{stats?.sales?.toLocaleString()}</h2>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex gap-4 text-xs font-medium text-blue-100">
             <span>Orders: {stats?.orders}</span>
             <span>•</span>
             <span>Views: 1.2k</span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div onClick={() => navigate('/orders')} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 active:bg-gray-50">
            <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
               <Clock size={20} />
            </div>
            <span className="text-2xl font-bold text-gray-800">{stats?.pending}</span>
            <span className="text-xs text-gray-500">Pending Orders</span>
          </div>
          <div onClick={() => navigate('/products')} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 active:bg-gray-50">
            <div className="bg-purple-100 p-2 rounded-full text-purple-600">
               <Package size={20} />
            </div>
            <span className="text-2xl font-bold text-gray-800">4</span>
            <span className="text-xs text-gray-500">Low Stock</span>
          </div>
        </div>

        {/* Growth Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
           <h3 className="font-semibold text-gray-800 mb-3">Growth Opportunities</h3>
           <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                 <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold">
                    %
                 </div>
                 <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Join Big Billion Days</p>
                    <p className="text-xs text-gray-500">Boost sales by 3x</p>
                 </div>
                 <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-full">Opt-in</button>
              </div>
           </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Dashboard;
