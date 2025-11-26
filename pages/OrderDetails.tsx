
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Phone, Package, CheckCircle } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { api } from '../services/api';
import { Order, OrderStatus } from '../types';

const OrderDetails: React.FC = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) {
      api.getOrderDetails(id).then(setOrder);
    }
  }, [id]);

  if (!order) return <MobileLayout showBack title="Details"><div>Loading...</div></MobileLayout>;

  return (
    <MobileLayout showBack title={`Order #${order.id}`}>
      <div className="p-4 space-y-4">
        {/* Status Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
           <div className="flex items-center gap-3 mb-2">
              <Package className="text-blue-600" size={20} />
              <span className="font-semibold text-gray-800">Status: {order.status}</span>
           </div>
           <p className="text-xs text-gray-500 ml-8">Ordered on {order.date}</p>
        </div>

        {/* Customer Details */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-sm font-semibold text-gray-800 mb-3">Customer Details</h3>
           <div className="flex items-start gap-3 mb-3">
              <MapPin size={18} className="text-gray-400 mt-0.5" />
              <div>
                 <p className="text-sm font-medium">{order.customerName}</p>
                 <p className="text-xs text-gray-500 mt-1">{order.customerAddress}</p>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <Phone size={18} className="text-gray-400" />
              <button className="text-sm text-blue-600 font-medium">Call Customer</button>
           </div>
        </div>

        {/* Items */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-sm font-semibold text-gray-800 mb-3">Order Items</h3>
           {order.items.map((item, idx) => (
             <div key={idx} className="flex gap-3 mb-3 last:mb-0">
                <img src={item.image} className="w-14 h-14 rounded bg-gray-100" />
                <div className="flex-1">
                   <p className="text-sm font-medium">{item.name}</p>
                   <p className="text-xs text-gray-500">Qty: {item.quantity} x ₹{item.price}</p>
                </div>
                <span className="text-sm font-semibold">₹{item.quantity * item.price}</span>
             </div>
           ))}
           <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between">
              <span className="font-semibold text-gray-800">Total Amount</span>
              <span className="font-bold text-lg">₹{order.amount}</span>
           </div>
        </div>
      </div>

      {/* Action Bar */}
      {order.status === OrderStatus.PENDING && (
        <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 p-4 flex gap-3 z-30">
           <button className="flex-1 py-3 rounded-lg border border-red-200 text-red-600 font-medium">Reject</button>
           <button className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-medium shadow-md">Accept Order</button>
        </div>
      )}
    </MobileLayout>
  );
};

export default OrderDetails;
