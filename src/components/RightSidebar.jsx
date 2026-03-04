import {
  TrendingUp,
  Clock,
  Truck,
  User,
  Building2,
  PlusCircle,
  Square,
  CheckSquare,
} from 'lucide-react'

const tierAccounts = [
  {
    name: 'Mike Zimmerman',
    role: 'SALES_REP',
    company: 'AirReps',
    tier: 'TIER 1',
  },
  {
    name: 'Tyson McGraw',
    role: 'SALES_REP',
    company: 'AirReps',
    tier: 'TIER 1',
  },
  {
    name: 'Bryan Barnes',
    role: 'BRANC...',
    company: 'Refrigeration ...',
    tier: 'TIER 1',
  },
  {
    name: 'Rob Grace',
    role: 'PROJECT_MAN...',
    company: 'AirR...',
    tier: 'TIER 1',
  },
  {
    name: 'Aaron Cohn',
    role: 'SALES_REP',
    company: 'AirReps',
    tier: 'TIER 1',
  },
]

const actions = [
  {
    text: 'Call Sarah Connor at 11:00 AM on January 1, 2026',
    priority: 'Urgent',
    completed: false,
  },
  {
    text: 'Review Job #: CLP102930',
    priority: 'Normal',
    completed: true,
  },
  {
    text: 'Add new contractor for Company 1',
    priority: 'Urgent',
    completed: false,
  },
]

export default function RightSidebar() {
  return (
    <aside className="w-70 min-h-screen border-l border-gray-200 bg-white p-4 space-y-4 shrink-0 overflow-y-auto">
      {/* Total Revenue */}
      <div className="bg-linear-to-br from-indigo-900 to-indigo-700 rounded-xl p-5 text-white">
        <p className="text-[11px] font-medium text-indigo-300/80 mb-1 uppercase tracking-wide">
          Total Revenue
        </p>
        <p className="text-3xl font-bold tracking-tight">$42.5k</p>
        <div className="flex items-center gap-1.5 mt-2">
          <TrendingUp size={14} className="text-green-400" />
          <span className="text-xs text-green-400">+12% this week</span>
        </div>
      </div>

      {/* Active Quotes / Ready Orders */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <p className="text-[11px] text-gray-500 font-medium">Active Quotes</p>
          <p className="text-2xl font-bold text-gray-900 mt-0.5">100</p>
          <div className="flex items-center gap-1 mt-1.5">
            <Clock size={11} className="text-green-500 shrink-0" />
            <span className="text-[10px] text-green-600 leading-tight">
              3 awaiting payment
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <p className="text-[11px] text-gray-500 font-medium">Ready Orders</p>
          <p className="text-2xl font-bold text-gray-900 mt-0.5">20</p>
          <div className="flex items-center gap-1 mt-1.5">
            <Truck size={11} className="text-gray-400 shrink-0" />
            <span className="text-[10px] text-gray-500 leading-tight">
              2 orders are ready for shipment
            </span>
          </div>
        </div>
      </div>

      {/* Tier A Accounts */}
      <div>
        <h3 className="font-bold text-sm text-gray-900 mb-3">
          Tier A Accounts For This Month
        </h3>
        <div className="space-y-3">
          {tierAccounts.map((account, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <User size={14} className="text-gray-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900 truncate">
                    {account.name}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 truncate">
                    <User size={9} className="shrink-0" />
                    <span className="truncate">{account.role}</span>
                    <span className="shrink-0">.</span>
                    <Building2 size={9} className="shrink-0" />
                    <span className="truncate">{account.company}</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded shrink-0">
                {account.tier}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Actions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-gray-900">Actions</h3>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <PlusCircle size={18} />
          </button>
        </div>
        <div className="space-y-3">
          {actions.map((action, i) => (
            <div key={i} className="flex items-start gap-2.5">
              {action.completed ? (
                <CheckSquare
                  size={18}
                  className="text-blue-600 mt-0.5 shrink-0"
                />
              ) : (
                <Square size={18} className="text-gray-300 mt-0.5 shrink-0" />
              )}
              <div>
                <p
                  className={`text-xs leading-relaxed ${
                    action.completed
                      ? 'line-through text-gray-400'
                      : 'text-gray-700'
                  }`}
                >
                  {action.text}
                </p>
                <span
                  className={`inline-block text-[10px] font-medium mt-1 px-2 py-0.5 rounded ${
                    action.priority === 'Urgent'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {action.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
