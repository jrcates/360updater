import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  FileText,
  Pencil,
  MoreVertical,
  Settings2,
  List,
  Users,
  StickyNote,
  Package,
  DollarSign,
  Calendar,
  Download,
  Copy,
} from 'lucide-react'
import { quotes } from '../data/quotes'

const tabs = [
  { icon: Settings2, label: 'Configuration' },
  { icon: List, label: 'Line Items' },
  { icon: Users, label: 'Contact & Customer' },
  { icon: StickyNote, label: 'Notes' },
]

export default function QuoteDetailContent() {
  const { quoteId } = useParams()
  const navigate = useNavigate()
  const quote = quotes.find((q) => q.id === quoteId)
  const [activeTab, setActiveTab] = useState('Configuration')

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700'
      case 'Pending Review':
        return 'bg-orange-100 text-orange-700'
      case 'Draft':
        return 'bg-gray-100 text-gray-600'
      case 'Sent to Customer':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  if (!quote) {
    return (
      <main className="flex-1 min-w-0 overflow-auto bg-gray-50/80 flex items-center justify-center">
        <p className="text-gray-500">Quote not found.</p>
      </main>
    )
  }

  return (
    <main className="flex-1 min-w-0 overflow-auto bg-gray-50/80">
      {/* Top breadcrumb bar */}
      <div className="flex items-center gap-2 px-8 py-3 text-sm text-gray-500 border-b border-gray-200 bg-white">
        <FileText size={15} className="text-gray-400" />
        <span
          className="text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={() => navigate('/quotes')}
        >
          Quotes
        </span>
        <span className="text-gray-300">/</span>
        <span className="font-medium text-gray-700">{quote.id}</span>
      </div>

      <div className="px-8 py-6 max-w-6xl mx-auto">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/quotes')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              <Pencil size={15} />
              Edit Quote
            </button>
            <button className="p-2.5 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Quote Summary Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-bold text-indigo-600">{quote.id}</span>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusStyle(quote.status)}`}
            >
              {quote.status}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">{quote.projectName}</h1>
          <p className="text-sm text-gray-500 mb-5">{quote.adapterName}</p>

          <div className="border-t border-gray-100 pt-4 mb-4" />

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Package size={15} className="text-gray-400" />
                Quantity
              </div>
              <span className="text-lg font-bold text-gray-900">{quote.quantity}</span>
            </div>
            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-green-700">
                <DollarSign size={15} />
                Total Price
              </div>
              <span className="text-lg font-bold text-gray-900">{formatCurrency(quote.totalPrice)}</span>
            </div>
            <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-indigo-700">
                <Calendar size={15} />
                Config Date
              </div>
              <span className="text-lg font-bold text-gray-900">{formatDate(quote.configDate)}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
            <span className="text-sm font-semibold text-gray-700">Quick Action</span>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-4 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Download size={14} />
                Download PDF
              </button>
              <button className="flex items-center gap-1.5 px-4 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Copy size={14} />
                Duplicate Quote
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-5">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.label
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Configuration' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-5">
              <Settings2 size={16} className="text-gray-500" />
              Curb Adapter Specifications
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <div>
                <p className="text-xs text-gray-400 mb-1">Width</p>
                <p className="text-sm font-medium text-gray-900">{quote.specs.width}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Length</p>
                <p className="text-sm font-medium text-gray-900">{quote.specs.length}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Height</p>
                <p className="text-sm font-medium text-gray-900">{quote.specs.height}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Material</p>
                <p className="text-sm font-medium text-gray-900">{quote.specs.material}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Gauge</p>
                <p className="text-sm font-medium text-gray-900">{quote.specs.gauge}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Insulation</p>
                <p className="text-sm font-medium text-gray-900">{quote.specs.insulation}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Roof Type</p>
                <p className="text-sm font-medium text-gray-900">{quote.specs.roofType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Duct Connection</p>
                <p className="text-sm font-medium text-gray-900">{quote.specs.ductConnection}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Line Items' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-5">
              <List size={16} className="text-gray-500" />
              Pricing Breakdown
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-[11px] font-medium text-gray-400 uppercase tracking-wide pb-3">
                    Description
                  </th>
                  <th className="text-right text-[11px] font-medium text-gray-400 uppercase tracking-wide pb-3">
                    Qty
                  </th>
                  <th className="text-right text-[11px] font-medium text-gray-400 uppercase tracking-wide pb-3">
                    Unit Price
                  </th>
                  <th className="text-right text-[11px] font-medium text-gray-400 uppercase tracking-wide pb-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {quote.lineItems.map((item, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0">
                    <td className="py-3 text-sm text-gray-900">{item.description}</td>
                    <td className="py-3 text-sm text-gray-700 text-right">{item.qty}</td>
                    <td className="py-3 text-sm text-gray-700 text-right">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="py-3 text-sm font-medium text-gray-900 text-right">
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-200">
                  <td colSpan={3} className="pt-3 text-sm font-bold text-gray-900 text-right">
                    Total
                  </td>
                  <td className="pt-3 text-sm font-bold text-gray-900 text-right">
                    {formatCurrency(quote.totalPrice)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {activeTab === 'Contact & Customer' && (
          <div className="grid grid-cols-2 gap-4">
            {/* 360 Contact Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-5">
                <Users size={16} className="text-gray-500" />
                360 Contact
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Name</p>
                  <p className="text-sm font-medium text-gray-900">{quote.contact}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Role</p>
                  <p className="text-sm text-gray-700">Sales Representative</p>
                </div>
              </div>
            </div>

            {/* 360 Customer Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-5">
                <Package size={16} className="text-gray-500" />
                360 Customer
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Company</p>
                  <p className="text-sm font-medium text-gray-900">{quote.customer}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Quote Date</p>
                  <p className="text-sm text-gray-700">{formatDate(quote.createdDate)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Notes' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                <StickyNote size={16} className="text-gray-500" />
                Quote Notes
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Pencil size={14} />
                Edit
              </button>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {quote.notes || 'No notes added.'}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
