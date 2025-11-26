
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Plus, X, Trash2, Camera, Sparkles, Loader } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { api } from '../services/api';
import { Product, VariantOption } from '../types';
import { generateProductDescription } from '../services/geminiService';

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const [formData, setFormData] = useState<Product>({
    id: '',
    name: '',
    sku: '',
    category: '',
    price: 0,
    stock: 0,
    image: 'https://picsum.photos/200/200',
    description: '',
    status: 'Active',
    variants: []
  });

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      api.getProduct(id).then(product => {
        if (product) setFormData(product);
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await api.updateProduct(formData);
      } else {
        await api.addProduct(formData);
      }
      navigate('/products');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDescription = async () => {
    if (!formData.name || !formData.category) {
      alert("Please fill in Product Name and Category first.");
      return;
    }
    setAiLoading(true);
    const desc = await generateProductDescription(formData.name, formData.category, "High quality, Best seller");
    setFormData(prev => ({ ...prev, description: desc }));
    setAiLoading(false);
  };

  // Variant Logic
  const addVariantType = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...(prev.variants || []), { name: '', values: [] }]
    }));
  };

  const removeVariantType = (index: number) => {
    const newVariants = [...(formData.variants || [])];
    newVariants.splice(index, 1);
    setFormData(prev => ({ ...prev, variants: newVariants }));
  };

  const updateVariantName = (index: number, name: string) => {
    const newVariants = [...(formData.variants || [])];
    newVariants[index].name = name;
    setFormData(prev => ({ ...prev, variants: newVariants }));
  };

  const addVariantValue = (index: number, value: string) => {
    if (!value.trim()) return;
    const newVariants = [...(formData.variants || [])];
    if (!newVariants[index].values.includes(value)) {
      newVariants[index].values.push(value);
      setFormData(prev => ({ ...prev, variants: newVariants }));
    }
  };

  const removeVariantValue = (vIndex: number, valIndex: number) => {
    const newVariants = [...(formData.variants || [])];
    newVariants[vIndex].values.splice(valIndex, 1);
    setFormData(prev => ({ ...prev, variants: newVariants }));
  };

  if (loading && isEdit) return <MobileLayout title="Edit Product"><div className="p-10 text-center"><Loader className="animate-spin mx-auto"/></div></MobileLayout>;

  return (
    <MobileLayout showBack title={isEdit ? "Edit Product" : "Add Product"}>
      <form onSubmit={handleSave} className="p-4 space-y-6 bg-white min-h-screen pb-24">
        
        {/* Basic Info */}
        <section className="space-y-4">
          <h3 className="font-semibold text-gray-900 border-b pb-2">Basic Details</h3>
          
          <div className="flex justify-center mb-4">
             <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden">
                {formData.image ? (
                   <img src={formData.image} className="w-full h-full object-cover" />
                ) : (
                   <Camera className="text-gray-400" />
                )}
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="e.g. Nike Air Max"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU ID</label>
              <input 
                name="sku" 
                value={formData.sku} 
                onChange={handleChange} 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none" 
                placeholder="SKU-123"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                 name="category"
                 value={formData.category} 
                 onChange={handleChange} 
                 className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none"
              >
                 <option value="">Select</option>
                 <option value="Electronics">Electronics</option>
                 <option value="Fashion">Fashion</option>
                 <option value="Home">Home</option>
              </select>
            </div>
          </div>

          <div>
             <div className="flex justify-between items-center mb-1">
               <label className="block text-sm font-medium text-gray-700">Description</label>
               <button 
                  type="button" 
                  onClick={handleGenerateDescription}
                  disabled={aiLoading}
                  className="text-xs flex items-center text-purple-600 font-medium"
                >
                  <Sparkles size={12} className="mr-1" />
                  {aiLoading ? 'Generating...' : 'Auto-Generate'}
               </button>
             </div>
             <textarea 
               name="description" 
               value={formData.description} 
               onChange={handleChange} 
               rows={4}
               className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none resize-none"
               placeholder="Product description..."
             />
          </div>
        </section>

        {/* Pricing */}
        <section className="space-y-4">
          <h3 className="font-semibold text-gray-900 border-b pb-2">Pricing & Inventory</h3>
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input 
                  type="number"
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none" 
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Qty</label>
                <input 
                  type="number"
                  name="stock" 
                  value={formData.stock} 
                  onChange={handleChange} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none" 
                />
             </div>
          </div>
        </section>

        {/* Variants */}
        <section className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="font-semibold text-gray-900">Variants</h3>
            <button 
              type="button" 
              onClick={addVariantType}
              className="text-sm text-blue-600 font-medium flex items-center"
            >
              <Plus size={16} className="mr-1"/> Add Option
            </button>
          </div>
          
          {formData.variants?.length === 0 && (
             <p className="text-sm text-gray-400 italic">No variants added (e.g. Size, Color).</p>
          )}

          {formData.variants?.map((variant, idx) => (
             <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative">
                <button 
                   type="button" 
                   onClick={() => removeVariantType(idx)}
                   className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                >
                   <Trash2 size={16} />
                </button>
                
                <div className="mb-3">
                   <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Option Name</label>
                   <input 
                      type="text" 
                      value={variant.name}
                      onChange={(e) => updateVariantName(idx, e.target.value)}
                      placeholder="e.g. Size, Color"
                      className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-sm text-gray-900 outline-none"
                   />
                </div>

                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Values</label>
                   <div className="flex flex-wrap gap-2 mb-2">
                      {variant.values.map((val, vIdx) => (
                         <span key={vIdx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs flex items-center">
                            {val}
                            <button 
                               type="button" 
                               onClick={() => removeVariantValue(idx, vIdx)} 
                               className="ml-1 text-blue-400 hover:text-blue-900"
                            >
                               <X size={12} />
                            </button>
                         </span>
                      ))}
                   </div>
                   <input 
                      type="text" 
                      placeholder="Type value & Enter"
                      onKeyDown={(e) => {
                         if (e.key === 'Enter') {
                            e.preventDefault();
                            addVariantValue(idx, e.currentTarget.value);
                            e.currentTarget.value = '';
                         }
                      }}
                      className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-sm text-gray-900 outline-none"
                   />
                   <p className="text-[10px] text-gray-400 mt-1">Press Enter to add a value</p>
                </div>
             </div>
          ))}
        </section>

        {/* Submit Button */}
        <button 
           type="submit" 
           disabled={loading}
           className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 font-bold text-lg flex items-center justify-center gap-2 max-w-md mx-auto z-20"
        >
           {loading ? 'Saving...' : <><Save size={20} /> Save Product</>}
        </button>
      </form>
    </MobileLayout>
  );
};

export default ProductForm;
