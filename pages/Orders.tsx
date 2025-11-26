import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order, OrderStatus } from '../types';
import MobileLayout from '../components/MobileLayout';
import { api } from '../services/api';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<string>('All');
  const navigate = useNavigate();

  useEffect(() => {
    api.getOrders().then(setOrders);
  }, []);

  const tabs = ['All', OrderStatus.PENDING, OrderStatus.SHIPPED];
  const filteredOrders = activeTab === 'All' ? orders : orders.filter(o => o.status === activeTab);

  return (
    <MobileLayout title="My Orders">
      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 px-4 pt-2">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100">
        {filteredOrders.map(order => (
          <div 
            key={order.id} 
            onClick={() => navigate(`/orders/${order.id}`)}
            className="bg-white p-4 active:bg-gray-50"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-mono text-gray-500">{order.id}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                order.status === OrderStatus.PENDING ? 'bg-yellow-100 text-yellow-800' : 
                order.status === OrderStatus.SHIPPED ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'
              }`}>
                {order.status}
              </span>
            </div>
            
            <div className="flex gap-3">
              <img src={order.items[0].image} alt="" className="w-16 h-16 rounded bg-gray-100 object-cover" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{order.items[0].name}</h4>
                {order.items.length > 1 && <p className="text-xs text-gray-500">+{order.items.length - 1} more items</p>}
                <p className="text-xs text-gray-500 mt-1">{order.customerName}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-bold">₹{order.amount}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{order.paymentMethod}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredOrders.length === 0 && (
          <div className="p-8 text-center text-gray-500 text-sm">No orders found</div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Orders;