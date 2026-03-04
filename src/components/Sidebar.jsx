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

  return (
    <aside className="w-70 min-h-screen bg-white border-r border-gray-200 flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-center">
          <img src="/logo.png" alt="360 Sheet Metal Products" className="w-auto" />
        </div>
      </div>

      {/* User Info */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600 shrink-0">
            R
          </div>
          <span className="font-semibold text-sm text-gray-900">Ryan</span>
        </div>
        <div className="text-[11px] text-gray-500 space-y-0.5 leading-relaxed">
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

      {/* Navigation */}
      <nav className="flex-1 py-1 px-3">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className={section.title ? 'mt-5' : ''}>
            {section.title && (
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1.5">
                {section.title}
              </p>
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
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={16} strokeWidth={isActive ? 2 : 1.75} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}
