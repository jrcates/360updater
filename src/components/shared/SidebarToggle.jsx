import { PanelLeft } from 'lucide-react'
import { useSidebar } from '../../context/SidebarContext'

export default function SidebarToggle() {
  const { collapsed, setCollapsed } = useSidebar()
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <PanelLeft size={16} />
      </button>
      <div className="w-px h-4 bg-gray-200" />
    </div>
  )
}
