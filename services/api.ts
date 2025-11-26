
import { Order, OrderStatus, Product, Notification, KYCData } from '../types';

// Mock Data Store
const DELAY = 600; // ms to simulate network

let mockProducts: Product[] = [
  { 
    id: '1', 
    name: 'Wireless Headphones', 
    sku: 'WH-001', 
    category: 'Electronics', 
    price: 2999, 
    stock: 45, 
    image: 'https://picsum.photos/400/400?random=1', 
    status: 'Active', 
    description: 'High quality wireless headphones with noise cancellation.',
    variants: [{ name: 'Color', values: ['Black', 'Blue'] }]
  },
  { 
    id: '2', 
    name: 'Cotton T-Shirt', 
    sku: 'TS-002', 
    category: 'Fashion', 
    price: 499, 
    stock: 120, 
    image: 'https://picsum.photos/400/400?random=2', 
    status: 'Active', 
    description: '100% Cotton breathable fabric.',
    variants: [{ name: 'Size', values: ['S', 'M', 'L', 'XL'] }, { name: 'Color', values: ['White', 'Black'] }]
  },
  { 
    id: '3', 
    name: 'Smart Watch', 
    sku: 'SW-003', 
    category: 'Electronics', 
    price: 4500, 
    stock: 2, // Low stock
    image: 'https://picsum.photos/400/400?random=3', 
    status: 'Active', 
    description: 'Track your fitness goals.' 
  },
  {
    id: '4',
    name: 'Running Shoes',
    sku: 'RS-004',
    category: 'Fashion',
    price: 1299,
    stock: 5, // Low stock
    image: 'https://picsum.photos/400/400?random=4',
    status: 'Active'
  }
];

const mockOrders: Order[] = [
  { 
    id: 'ORD-29382', 
    customerName: 'Amit Sharma', 
    customerAddress: '123, MG Road, Bangalore, KA',
    date: '2023-10-24', 
    amount: 1499, 
    status: OrderStatus.PENDING, 
    items: [{ name: 'Wireless Headphones', quantity: 1, price: 1499, image: 'https://picsum.photos/400/400?random=1' }],
    paymentMethod: 'Prepaid' 
  },
  { 
    id: 'ORD-29383', 
    customerName: 'Priya Singh', 
    customerAddress: 'Flat 4B, Palm Heights, Mumbai, MH',
    date: '2023-10-24', 
    amount: 599, 
    status: OrderStatus.SHIPPED, 
    items: [{ name: 'Cotton T-Shirt', quantity: 1, price: 599, image: 'https://picsum.photos/400/400?random=2' }], 
    paymentMethod: 'COD' 
  },
  {
    id: 'ORD-29384',
    customerName: 'Rahul Verma',
    customerAddress: 'Sector 18, Noida, UP',
    date: '2023-10-20',
    amount: 4500,
    status: OrderStatus.RETURNED,
    items: [{ name: 'Smart Watch', quantity: 1, price: 4500, image: 'https://picsum.photos/400/400?random=3' }],
    paymentMethod: 'Prepaid',
    returnReason: 'Product defective / Screen not working'
  }
];

const mockNotifications: Notification[] = [
  { id: '1', title: 'New Order Received', message: 'You have received a new order from Amit Sharma.', date: '10 mins ago', read: false, type: 'order' },
  { id: '2', title: 'Low Stock Alert', message: 'Smart Watch stock is below 5 units.', date: '1 hour ago', read: false, type: 'system' },
  { id: '3', title: 'Payment Processed', message: '₹12,450 has been settled to your bank account.', date: '2 hours ago', read: true, type: 'payment' },
];

// Helper for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  login: async (email: string, password: string) => {
    await delay(DELAY);
    // Allow any login for testing purposes
    return { 
      token: 'fake-jwt-token', 
      user: { id: 'u1', name: 'Super Electronics', email: email || 'seller@flipkart.com', storeName: 'Super Electronics Store', isVerified: true } 
    };
  },

  register: async (kycData: KYCData) => {
    await delay(1500);
    // Simulate successful registration
    return { success: true, message: "Registration successful. Pending verification." };
  },

  submitKYC: async (data: Partial<KYCData>) => {
    await delay(1500);
    return { success: true };
  },

  getDashboardStats: async () => {
    await delay(DELAY);
    const lowStockCount = mockProducts.filter(p => p.stock < 10).length;
    return {
      sales: 45231,
      orders: 18,
      pending: mockOrders.filter(o => o.status === OrderStatus.PENDING).length,
      rating: 4.8,
      lowStock: lowStockCount
    };
  },

  getProducts: async () => {
    await delay(DELAY);
    return [...mockProducts];
  },

  getLowStockProducts: async () => {
    await delay(DELAY);
    return mockProducts.filter(p => p.stock < 10);
  },

  getProduct: async (id: string) => {
    await delay(DELAY);
    return mockProducts.find(p => p.id === id);
  },

  addProduct: async (product: Product) => {
    await delay(DELAY);
    mockProducts.unshift({ ...product, id: Date.now().toString() });
    return product;
  },

  updateProduct: async (product: Product) => {
    await delay(DELAY);
    const index = mockProducts.findIndex(p => p.id === product.id);
    if (index !== -1) {
      mockProducts[index] = product;
    }
    return product;
  },
  
  deleteProduct: async (id: string) => {
    await delay(DELAY);
    mockProducts = mockProducts.filter(p => p.id !== id);
    return true;
  },

  bulkUpdateProducts: async (ids: string[], updates: Partial<Product>) => {
    await delay(DELAY);
    mockProducts = mockProducts.map(p => {
      if (ids.includes(p.id)) {
        return { ...p, ...updates };
      }
      return p;
    });
    return true;
  },

  getOrders: async () => {
    await delay(DELAY);
    return [...mockOrders];
  },

  getOrderDetails: async (id: string) => {
    await delay(DELAY);
    return mockOrders.find(o => o.id === id);
  },

  updateOrderStatus: async (id: string, status: OrderStatus) => {
    await delay(DELAY);
    const order = mockOrders.find(o => o.id === id);
    if (order) order.status = status;
    return order;
  },

  getNotifications: async () => {
    await delay(DELAY);
    return [...mockNotifications];
  }
};
