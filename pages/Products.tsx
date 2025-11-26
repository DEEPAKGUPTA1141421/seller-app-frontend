
import React, { useEffect, useState } from 'react';
import { Plus, Search, MoreVertical, CheckSquare, Square, Edit2, Trash2 } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { Product } from '../types';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const [bulkPrice, setBulkPrice] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    api.getProducts().then(setProducts);
  };

  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const handleLongPress = (id: string) => {
    setIsSelectionMode(true);
    setSelectedIds([id]);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this product?')) {
        await api.deleteProduct(id);
        loadProducts();
    }
  };

  const handleBulkUpdate = async () => {
    if (!bulkPrice) return;
    await api.bulkUpdateProducts(selectedIds, { price: parseFloat(bulkPrice) });
    setIsBulkEditOpen(false);
    setIsSelectionMode(false);
    setSelectedIds([]);
    setBulkPrice('');
    loadProducts();
    alert('Products updated successfully');
  };

  return (
    <MobileLayout title="Inventory">
      {/* Search Bar */}
      <div className="p-4 bg-white sticky top-0 z-10 border-b border-gray-100 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search products/SKU"
            className="w-full bg-gray-100 text-sm rounded-lg pl-9 pr-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        {isSelectionMode && (
          <button onClick={() => { setIsSelectionMode(false); setSelectedIds([]); }} className="text-xs font-medium text-gray-600">
            Cancel
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 divide-y divide-gray-100 bg-white pb-20">
        {products.map(product => (
          <div 
            key={product.id} 
            className={`p-4 flex gap-3 ${selectedIds.includes(product.id) ? 'bg-blue-50' : ''}`}
            onClick={() => isSelectionMode ? toggleSelection(product.id) : null}
            // Simple simulation of long press
            onContextMenu={(e) => { e.preventDefault(); handleLongPress(product.id); }} 
          >
             {isSelectionMode && (
               <div className="flex items-center justify-center">
                 {selectedIds.includes(product.id) ? (
                   <CheckSquare className="text-blue-600 w-6 h-6" />
                 ) : (
                   <Square className="text-gray-300 w-6 h-6" />
                 )}
               </div>
             )}

             <img src={product.image} className="w-20 h-20 rounded bg-gray-50 object-cover" />
             <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                  {!isSelectionMode && (
                    <button 
                      onClick={(e) => handleDelete(product.id, e)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-2">
                   <span className="text-xs text-gray-500">SKU: {product.sku}</span>
                   <span className={`text-[10px] px-1.5 py-0.5 rounded ${product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.status}
                   </span>
                </div>
                <div className="mt-3 flex justify-between items-end">
                   <div>
                      <span className="text-sm font-bold">₹{product.price}</span>
                      <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                   </div>
                   {!isSelectionMode && (
                     <div className="flex gap-2">
                       <button 
                        onClick={(e) => { e.stopPropagation(); navigate(`/products/edit/${product.id}`); }}
                        className="text-xs font-medium text-blue-600 border border-blue-200 px-3 py-1 rounded"
                       >
                         Edit
                       </button>
                     </div>
                   )}
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Bulk Action Bar */}
      {isSelectionMode && selectedIds.length > 0 && (
        <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 p-3 shadow-lg z-50 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-700">{selectedIds.length} Selected</span>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsBulkEditOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Edit2 size={16} /> Edit Price
            </button>
            <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}

      {/* FAB (Only show when not selecting) */}
      {!isSelectionMode && (
        <button 
          onClick={() => navigate('/products/add')}
          className="fixed bottom-20 right-4 w-14 h-14 bg-blue-600 rounded-full text-white shadow-lg flex items-center justify-center z-40 active:scale-95 transition-transform"
        >
          <Plus size={28} />
        </button>
      )}

      {/* Bulk Edit Modal */}
      {isBulkEditOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-t-xl sm:rounded-xl p-6 animate-slide-up">
            <h3 className="text-lg font-bold mb-4">Bulk Edit Price</h3>
            <p className="text-sm text-gray-500 mb-4">Updating price for {selectedIds.length} products</p>
            <input 
              type="number"
              placeholder="Enter new price"
              value={bulkPrice}
              onChange={e => setBulkPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-gray-900 outline-none focus:border-blue-500"
            />
            <div className="flex gap-3">
              <button 
                onClick={() => setIsBulkEditOpen(false)}
                className="flex-1 py-3 text-gray-600 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleBulkUpdate}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold"
              >
                Update All
              </button>
            </div>
          </div>
        </div>
      )}
    </MobileLayout>
  );
};

export default Products;
