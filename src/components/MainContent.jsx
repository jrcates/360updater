import { useNavigate } from 'react-router-dom'
import {
  Home,
  Search,
  UserPlus,
  Building2,
  ListChecks,
  FileText,
  ShoppingCart,
  DollarSign,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { quotes } from '../data/quotes'
import { orders } from '../data/orders'
import SidebarToggle from './shared/SidebarToggle'

// ── Helpers ──────────────────────────────────────────────
const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)

const formatCurrencyShort = (amount) => {
  if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}k`
  return `$${amount}`
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// ── Computed Data ────────────────────────────────────────

// Quote stats
const quotesByStatus = {
  Draft: quotes.filter((q) => q.status === 'Draft'),
  'Pending Review': quotes.filter((q) => q.status === 'Pending Review'),
  Approved: quotes.filter((q) => q.status === 'Approved'),
}
const totalQuoteValue = quotes.reduce((sum, q) => sum + q.totalPrice, 0)
const approvedQuoteValue = quotesByStatus['Approved'].reduce((sum, q) => sum + q.totalPrice, 0)

// Order stats
const ordersByStatus = {
  'In Production': orders.filter((o) => o.status === 'In Production'),
  'Production Complete': orders.filter((o) => o.status === 'Production Complete'),
  Shipped: orders.filter((o) => o.status === 'Shipped'),
  Delivered: orders.filter((o) => o.status === 'Delivered'),
}
const totalOrderValue = orders.reduce((sum, o) => sum + o.totalPrice, 0)
const deliveredValue = ordersByStatus['Delivered'].reduce((sum, o) => sum + o.totalPrice, 0)
const activeOrders = orders.filter((o) => o.status !== 'Delivered').length

// Pipeline donut data (by dollar value)
const pipelineDonutData = [
  { name: 'Draft', value: quotesByStatus['Draft'].reduce((s, q) => s + q.totalPrice, 0), color: '#9ca3af' },
  { name: 'Pending Review', value: quotesByStatus['Pending Review'].reduce((s, q) => s + q.totalPrice, 0), color: '#f59e0b' },
  { name: 'Approved', value: quotesByStatus['Approved'].reduce((s, q) => s + q.totalPrice, 0), color: '#22c55e' },
]

// Customer revenue bar chart
const customerMap = {}
quotes.forEach((q) => {
  if (!customerMap[q.customer]) customerMap[q.customer] = { name: q.customer, quotes: 0, orders: 0 }
  customerMap[q.customer].quotes += q.totalPrice
})
orders.forEach((o) => {
  if (!customerMap[o.customer]) customerMap[o.customer] = { name: o.customer, quotes: 0, orders: 0 }
  customerMap[o.customer].orders += o.totalPrice
})
const customerData = Object.values(customerMap)

// Contact revenue (top 5)
const contactMap = {}
quotes.forEach((q) => {
  contactMap[q.contact] = (contactMap[q.contact] || 0) + q.totalPrice
})
orders.forEach((o) => {
  contactMap[o.contact] = (contactMap[o.contact] || 0) + o.totalPrice
})
const contactData = Object.entries(contactMap)
  .map(([name, value]) => ({ name: name.split(' ')[0], fullName: name, value }))
  .sort((a, b) => b.value - a.value)
  .slice(0, 5)

// Order fulfillment
const orderStepColors = ['#f97316', '#3b82f6', '#6366f1', '#22c55e']
const orderFulfillment = orders.map((o) => {
  const totalSteps = o.workflow.steps.length
  const completed = o.workflow.steps.filter((s) => s.completedAt).length
  return { id: o.id, project: o.projectName, status: o.status, completed, totalSteps, pct: Math.round((completed / totalSteps) * 100) }
}).sort((a, b) => b.pct - a.pct)

// Recent items
const recentItems = [
  ...quotes.map((q) => ({ type: 'quote', id: q.id, project: q.projectName, status: q.status, date: q.configDate, path: `/quotes/${q.id}` })),
  ...orders.map((o) => ({ type: 'order', id: o.id, project: o.projectName, status: o.status, date: o.orderDate, path: `/orders/${o.id}` })),
].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)

const quoteStatusColors = {
  Draft: 'bg-gray-100 text-gray-600',
  'Pending Review': 'bg-amber-100 text-amber-700',
  Approved: 'bg-green-100 text-green-700',
}
const orderStatusColors = {
  'In Production': 'bg-orange-100 text-orange-700',
  'Production Complete': 'bg-blue-100 text-blue-700',
  Shipped: 'bg-indigo-100 text-indigo-700',
  Delivered: 'bg-green-100 text-green-700',
}

const orderStatusBarColors = {
  'In Production': 'bg-orange-500',
  'Production Complete': 'bg-blue-500',
  Shipped: 'bg-indigo-500',
  Delivered: 'bg-green-500',
}

// Custom tooltip
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 text-xs">
      <p className="font-semibold text-gray-900 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-gray-600">
          <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: p.color }} />
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  )
}

// ── Component ────────────────────────────────────────────
export default function MainContent() {
  const navigate = useNavigate()

  return (
    <main className="flex-1 min-w-0 overflow-auto bg-gray-50/80">
      {/* Top breadcrumb bar */}
      <div className="flex items-center gap-2 px-4 py-3 text-sm text-gray-500 border-b border-gray-200 bg-white">
        <SidebarToggle />
        <Home size={15} className="text-gray-400" />
        <span className="font-medium text-gray-700">Dashboard</span>
      </div>

      <div className="px-8 py-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here&apos;s your overview</p>
        </div>

        {/* Search & Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-5">
          <div className="flex items-center gap-2.5 px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input type="text" placeholder="Search contacts, quotes, or orders..." className="bg-transparent outline-none text-sm text-gray-600 w-full placeholder:text-gray-400" />
          </div>
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

        {/* ── Row 1: Stat Cards ────────────────────────── */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          <button onClick={() => navigate('/quotes')} className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <FileText size={18} className="text-indigo-600" />
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-indigo-500 transition-colors" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{quotes.length}</p>
            <p className="text-xs font-medium text-gray-500 mt-0.5">Total Quotes</p>
            <p className="text-[11px] text-indigo-600 mt-2">{quotesByStatus['Approved'].length} approved &middot; {quotesByStatus['Pending Review'].length} pending</p>
          </button>

          <button onClick={() => navigate('/orders')} className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <ShoppingCart size={18} className="text-orange-600" />
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-orange-500 transition-colors" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            <p className="text-xs font-medium text-gray-500 mt-0.5">Total Orders</p>
            <p className="text-[11px] text-orange-600 mt-2">{activeOrders} active &middot; {ordersByStatus['Delivered'].length} delivered</p>
          </button>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <DollarSign size={18} className="text-blue-600" />
              </div>
              <TrendingUp size={14} className="text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrencyShort(totalQuoteValue)}</p>
            <p className="text-xs font-medium text-gray-500 mt-0.5">Quote Pipeline</p>
            <p className="text-[11px] text-blue-600 mt-2">{formatCurrency(approvedQuoteValue)} approved</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <DollarSign size={18} className="text-green-600" />
              </div>
              <TrendingUp size={14} className="text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrencyShort(totalOrderValue)}</p>
            <p className="text-xs font-medium text-gray-500 mt-0.5">Order Revenue</p>
            <p className="text-[11px] text-green-600 mt-2">{formatCurrency(deliveredValue)} delivered</p>
          </div>
        </div>

        {/* ── Row 2: Charts ────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          {/* Customer Revenue — bar chart */}
          <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-gray-900">Revenue by Customer</h3>
              <div className="flex items-center gap-4 text-[11px] text-gray-500">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-indigo-500" />Quotes</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-orange-500" />Orders</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-4">Total pipeline value by customer</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={customerData} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 0 }} barGap={4}>
                <XAxis type="number" tickFormatter={formatCurrencyShort} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 12, fill: '#374151', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f9fafb' }} />
                <Bar dataKey="quotes" name="Quotes" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={18} />
                <Bar dataKey="orders" name="Orders" fill="#f97316" radius={[0, 4, 4, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pipeline Donut */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-1">Quote Pipeline</h3>
            <p className="text-xs text-gray-400 mb-2">By dollar value</p>
            <div className="relative">
              <ResponsiveContainer width="100%" height={170}>
                <PieChart>
                  <Pie
                    data={pipelineDonutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {pipelineDonutData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => formatCurrency(val)} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center label */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginTop: -4 }}>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{formatCurrencyShort(totalQuoteValue)}</p>
                  <p className="text-[10px] text-gray-400">Total</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 mt-2">
              {pipelineDonutData.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-xs text-gray-600">{d.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-900">{formatCurrency(d.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 3: Details ───────────────────────────── */}
        <div className="grid grid-cols-3 gap-4">
          {/* Order Fulfillment */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900">Order Fulfillment</h3>
              <button onClick={() => navigate('/orders')} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 transition-colors">
                View all <ArrowRight size={12} />
              </button>
            </div>
            <div className="space-y-3">
              {orderFulfillment.map((o) => (
                <button key={o.id} onClick={() => navigate(`/orders/${o.id}`)} className="w-full text-left hover:bg-gray-50 rounded-lg px-2 py-2 -mx-2 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs font-semibold text-gray-900 truncate pr-2">{o.project}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${orderStatusColors[o.status] || 'bg-gray-100 text-gray-600'}`}>{o.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex rounded-full overflow-hidden h-2 bg-gray-100">
                      {o.completed > 0 && orderStepColors.slice(0, o.completed).map((color, i) => (
                        <div key={i} className="h-full" style={{ backgroundColor: color, width: `${100 / o.totalSteps}%` }} />
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 shrink-0 w-8 text-right">{o.pct}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Revenue by Contact */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-1">Top Sales Reps</h3>
            <p className="text-xs text-gray-400 mb-4">By total pipeline value</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={contactData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={formatCurrencyShort} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={45} />
                <Tooltip content={({ active, payload }) => {
                  if (!active || !payload?.length) return null
                  return (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 text-xs">
                      <p className="font-semibold text-gray-900">{payload[0].payload.fullName}</p>
                      <p className="text-gray-600">{formatCurrency(payload[0].value)}</p>
                    </div>
                  )
                }} cursor={{ fill: '#f9fafb' }} />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-2.5">
              {recentItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-3 text-left hover:bg-gray-50 rounded-lg px-2 py-2 -mx-2 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                    {item.type === 'quote' ? (
                      <FileText size={14} className="text-indigo-500" />
                    ) : (
                      <ShoppingCart size={14} className="text-orange-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{item.id}</p>
                    <p className="text-[10px] text-gray-500 truncate">{item.project}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.type === 'quote'
                        ? (quoteStatusColors[item.status] || 'bg-gray-100 text-gray-600')
                        : (orderStatusColors[item.status] || 'bg-gray-100 text-gray-600')
                    }`}>
                      {item.status}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-0.5">{formatDate(item.date)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
