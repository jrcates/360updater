import {
  Home,
  Search,
  UserPlus,
  Building2,
  ListChecks,
  Star,
  Info,
  Target,
  UserCheck,
  MessageSquare,
} from 'lucide-react'

const stats = [
  {
    label: 'Total Contacts',
    value: '12',
    subtitle: '12 new contacts',
    bg: 'bg-green-50',
    border: 'border-green-200',
    subtitleColor: 'text-green-600',
    dotColor: 'bg-green-500',
  },
  {
    label: 'Total Companies',
    value: '2',
    subtitle: '0 new companies',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    subtitleColor: 'text-blue-600',
    dotColor: 'bg-blue-500',
  },
  {
    label: 'Active Customers',
    value: '2',
    subtitle: '0 prospects',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    subtitleColor: 'text-orange-600',
    dotColor: 'bg-orange-500',
  },
  {
    label: 'Branches',
    value: '4',
    subtitle: 'Across all companies',
    bg: 'bg-red-50',
    border: 'border-red-200',
    subtitleColor: 'text-red-600',
    dotColor: 'bg-red-500',
  },
]

const tiers = [
  { tier: 'A', label: 'Key Contacts', count: 7, color: 'bg-red-500' },
  { tier: 'B', label: 'Important', count: 2, color: 'bg-yellow-500' },
  { tier: 'C', label: 'Regular', count: 2, color: 'bg-green-500' },
]

export default function MainContent() {
  return (
    <main className="flex-1 min-w-0 overflow-auto bg-gray-50/80">
      {/* Top breadcrumb bar */}
      <div className="flex items-center gap-2 px-8 py-3 text-sm text-gray-500 border-b border-gray-200 bg-white">
        <Home size={15} className="text-gray-400" />
        <span className="font-medium text-gray-700">Dashboard</span>
      </div>

      <div className="px-8 py-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Here&apos;s your overview
          </p>
        </div>

        {/* Search & Actions Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 mb-5">
          <div className="flex items-center gap-2.5 px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search contacts or companies"
              className="bg-transparent outline-none text-sm text-gray-600 w-full placeholder:text-gray-400"
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
              <UserPlus size={16} className="text-amber-500" />
              Add Contact
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
              <Building2 size={16} className="text-amber-500" />
              Add Company
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
              <ListChecks size={16} className="text-amber-500" />
              Add Actions
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} ${stat.border} border rounded-lg p-4`}
            >
              <p className="text-xs font-medium text-gray-500 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 leading-tight">
                {stat.value}
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className={`w-2 h-2 rounded-full ${stat.dotColor}`} />
                <span className={`text-xs ${stat.subtitleColor}`}>{stat.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Cards Row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Contacts by Tier */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-5">
              <Star size={16} className="text-amber-400" />
              <h3 className="font-semibold text-sm text-gray-900">Contacts by Tier</h3>
            </div>
            <div className="space-y-4">
              {tiers.map((t) => (
                <div key={t.tier} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-md ${t.color} text-white text-xs font-bold flex items-center justify-center`}
                    >
                      {t.tier}
                    </span>
                    <span className="text-sm text-gray-700">{t.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{t.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-5">
              <Info size={16} className="text-blue-500" />
              <h3 className="font-semibold text-sm text-gray-900">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserCheck size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-700">New Contacts (30d)</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-700">Communications (7d)</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">1</span>
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-5">
              <Target size={16} className="text-orange-500" />
              <h3 className="font-semibold text-sm text-gray-900">Profile Completion</h3>
            </div>
            <div className="mb-3">
              <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
                <span className="text-sm text-gray-700">Incomplete Contacts</span>
                <span className="text-sm font-bold text-gray-900">12</span>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Contacts with incomplete profile data
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
