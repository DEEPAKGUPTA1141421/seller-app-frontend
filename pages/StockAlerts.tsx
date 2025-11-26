
import React, { useEffect, useState } from 'react';
import { Package, AlertTriangle, Save, Loader } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { Product } from '../types';
import { api } from '../services/api';

const StockAlerts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStock, setNewStock] = useState<number>(0);

  useEffect(() => {
    fetchLowStock();
  }, []);

  const fetchLowStock = () => {
    setLoading(true);
    api.getLowStockProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  };

  const handleUpdateStock = async (product: Product) => {
    // Optimistic update
    const updated = { ...product, stock: newStock };
    await api.updateProduct(updated);
    setEditingId(null);
    fetchLowStock(); // Refresh list
  };

  return (
    <MobileLayout title="Stock Alerts" showBack>
      <div className="p-4">
        <div className="bg-red-50 border border-red-100 rounded-lg p-3 flex gap-2 items-start mb-4">
          <AlertTriangle className="text-red-500 w-5 h-5 shrink-0" />
          <p className="text-xs text-red-700">These items are running low (below 10 units). Update inventory immediately to avoid order cancellations.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-10"><Loader className="animate-spin text-blue-600"/></div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <Package className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p>No stock alerts. Great job!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map(p => (
              <div key={p.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex gap-3">
                <img src={p.image} className="w-16 h-16 rounded object-cover bg-gray-50" alt={p.name} />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{p.name}</h4>
                  <p className="text-xs text-gray-500 mb-2">SKU: {p.sku}</p>
                  
                  <div className="flex items-center justify-between">
                    {editingId === p.id ? (
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          value={newStock}
                          onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                          className="w-16 p-1 border rounded text-sm text-center text-gray-900"
                          autoFocus
                        />
                        <button 
                          onClick={() => handleUpdateStock(p)}
                          className="bg-green-600 text-white p-1.5 rounded"
                        >
                          <Save size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-bold text-sm">{p.stock} units left</span>
                        <button 
                          onClick={() => { setEditingId(p.id); setNewStock(p.stock); }}
                          className="text-xs text-blue-600 underline"
                        >
                          Update
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default StockAlerts;
