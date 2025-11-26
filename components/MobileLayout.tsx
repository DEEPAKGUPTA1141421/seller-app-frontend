
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Package, ShoppingBag, CreditCard, Menu, Bell, ArrowLeft, MoreVertical } from 'lucide-react';

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children, title, showBack = false, showMenu = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide bottom nav on detail pages to mimic native behavior if needed, 
  // but for main tabs we keep it.
  const isMainTab = ['/', '/products', '/orders', '/payments', '/account'].includes(location.pathname);

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto shadow-2xl border-x border-gray-200">
      {/* Mobile Header */}
      <header className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between shadow-md z-20">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button onClick={() => navigate(-1)} className="p-1">
              <ArrowLeft size={24} />
            </button>
          ) : (
            showMenu && <Menu size={24} />
          )}
          <h1 className="text-lg font-semibold truncate">{title || 'SellerHub'}</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/notifications')}>
            <Bell size={22} />
          </button>
          <MoreVertical size={22} />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-20 relative">
        {children}
      </main>

      {/* Bottom Navigation */}
      {isMainTab && (
        <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full max-w-md z-30 pb-safe">
          <div className="flex justify-around items-center h-16">
            <NavItem to="/" icon={Home} label="Home" />
            <NavItem to="/orders" icon={ShoppingBag} label="Orders" />
            <NavItem to="/products" icon={Package} label="Products" />
            <NavItem to="/payments" icon={CreditCard} label="Pay" />
            {/* Using Menu icon for Account/Settings tab */}
            <NavItem to="/account" icon={Menu} label="Account" />
          </div>
        </nav>
      )}
    </div>
  );
};

const NavItem = ({ to, icon: Icon, label }: any) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center w-full h-full space-y-1 ${
        isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
      }`
    }
  >
    <Icon size={22} strokeWidth={2.5} />
    <span className="text-[10px] font-medium">{label}</span>
  </NavLink>
);

export default MobileLayout;
