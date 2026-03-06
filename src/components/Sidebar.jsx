import { useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  ShoppingCart,
  Bell,
  Zap,
  Settings,
  Palette,
  User,
  LogOut,
} from 'lucide-react'
import { useSidebar } from '../context/SidebarContext'

const navSections = [
  {
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    ],
  },
  {
    title: 'Accounts',
    items: [
      { icon: Users, label: 'Contacts', path: '/contacts' },
      { icon: Building2, label: 'Companies', path: '/companies' },
    ],
  },
  {
    title: 'Quotes & Orders',
    items: [
      { icon: FileText, label: 'Quotes', path: '/quotes' },
      { icon: ShoppingCart, label: 'Orders', path: '/orders' },
    ],
  },
  {
    title: 'Notifications & Actions',
    items: [
      { icon: Bell, label: 'Notifications', path: '/notifications' },
      { icon: Zap, label: 'Actions', path: '/actions' },
    ],
  },
  {
    title: 'System',
    items: [
      { icon: Settings, label: 'Settings', path: '/settings' },
      { icon: Palette, label: 'Design System', path: '/design-system' },
    ],
  },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { collapsed } = useSidebar()

  return (
    <aside
      className={`min-h-screen bg-white border-r border-gray-200 flex flex-col shrink-0 transition-all duration-300 ${
        collapsed ? 'w-[68px]' : 'w-70'
      }`}
    >
      {/* Logo */}
      <div className={`pt-4 pb-3 ${collapsed ? 'px-2' : 'px-4'}`}>
        <div className="flex items-center justify-center">
          {collapsed ? (
            <img src="/logo.png" alt="360" className="w-10 h-10 object-contain" />
          ) : (
            <img src="/logo.png" alt="360 Sheet Metal Products" className="w-auto" />
          )}
        </div>
      </div>

      {/* User Info */}
      {collapsed ? (
        <div className="px-2 py-3 flex flex-col items-center border-b border-gray-100 mx-2 mb-1">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
            R
          </div>
        </div>
      ) : (
        <div className="px-4 py-3">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600 shrink-0">
              R
            </div>
            <span className="font-semibold text-sm text-gray-900">Ryan</span>
          </div>
          <div className="text-xs text-gray-600 space-y-0.5 leading-relaxed">
            <p>Email: jrcatipay@gmail.com</p>
            <p>Account Type: ADMIN</p>
            <p>Company: 360</p>
          </div>
          <div className="flex gap-2 mt-3 pb-3 border-b border-gray-100">
            <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 transition-colors">
              <User size={15} />
            </button>
            <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 transition-colors">
              <Settings size={15} />
            </button>
            <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 transition-colors">
              <LogOut size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`flex-1 py-1 ${collapsed ? 'px-2' : 'px-3'}`}>
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className={section.title ? 'mt-5' : ''}>
            {section.title && !collapsed && (
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1.5">
                {section.title}
              </p>
            )}
            {collapsed && section.title && (
              <div className="border-t border-gray-100 my-2 mx-1" />
            )}
            {section.items.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path)
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center ${
                    collapsed ? 'justify-center px-0' : 'gap-2.5 px-3'
                  } py-2 rounded-md text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={16} strokeWidth={isActive ? 2 : 1.75} />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}
