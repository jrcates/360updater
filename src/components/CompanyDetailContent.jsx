import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Building2,
  GitBranch,
  Users,
  DollarSign,
  Phone,
  Mail,
  FileText,
  Plus,
  Globe,
  ExternalLink,
  MapPin,
  ChevronDown,
  Pencil,
  Tags,
  LayoutGrid,
  Package,
  X,
  Check,
  Star,
} from 'lucide-react'
import { companies } from '../data/companies'
import { PHONE_TYPE_LABELS } from '../constants/phoneTypes'
import AddBranchModal from './AddBranchModal'
import CompanyEditDrawer from './CompanyEditContent'

const tabs = [
  { icon: Building2, label: 'Overview' },
  { icon: Tags, label: 'Categorization' },
]

export default function CompanyDetailContent() {
  const { companyId } = useParams()
  const navigate = useNavigate()
  const [refreshKey, setRefreshKey] = useState(0)
  const company = companies.find((c) => c.id === Number(companyId))
  const [activeTab, setActiveTab] = useState('Overview')
  const [expandedBranch, setExpandedBranch] = useState(0)
  const [editingBranch, setEditingBranch] = useState(false)
  const [branchForm, setBranchForm] = useState(null)
  const [showAddBranch, setShowAddBranch] = useState(false)
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false)
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [, forceUpdate] = useState(0)

  const startEditing = (branch) => {
    const [cityName, stateZip] = (branch.city || '').split(', ')
    const [st, zipCode] = (stateZip || '').split(' ')
    const phones = branch.phones || []
    const branchMain = phones.find((p) => p.type === 'Branch-Main')
    const branchFax = phones.find((p) => p.type === 'Branch-Fax')
    setBranchForm({
      email: 'branch@company.com',
      branchMain: branchMain?.number || '',
      branchFax: branchFax?.number || '',
      address: branch.address || '',
      addressLine2: '',
      city: cityName || '',
      state: st || '',
      zip: zipCode || '',
      country: 'United States',
      union: 'No',
    })
    setEditingBranch(true)
  }

  const cancelEditing = () => {
    setEditingBranch(false)
    setBranchForm(null)
  }

  const updateForm = (field, value) => {
    setBranchForm((prev) => ({ ...prev, [field]: value }))
  }

  if (!company) {
    return (
      <main className="flex-1 min-w-0 overflow-auto bg-gray-50/80 flex items-center justify-center">
        <p className="text-gray-500">Company not found.</p>
      </main>
    )
  }

  const branch = company.branchList[expandedBranch]

  return (
    <main className="flex-1 min-w-0 overflow-auto bg-gray-50/80">
      {/* Top breadcrumb bar */}
      <div className="flex items-center gap-2 px-8 py-3 text-sm text-gray-500 border-b border-gray-200 bg-white">
        <Building2 size={15} className="text-gray-400" />
        <span className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => navigate('/companies')}>Companies</span>
        <span className="text-gray-300">/</span>
        <span className="font-medium text-gray-700">{company.name}</span>
      </div>

      <div className="px-8 py-6 max-w-6xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/companies')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            onClick={() => setEditDrawerOpen(true)}
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <Pencil size={15} />
            Edit Company
          </button>
        </div>

        {/* Company Overview Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-3">
            <Building2 size={16} />
            Company Overview
          </div>

          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
            <div className="flex items-center gap-2">
              {company.tags.map((tag) => {
                const prefix = tag === 'Customer' ? 'C' : tag === 'Vendor' ? 'V' : ''
                const colors =
                  tag === 'Active'
                    ? 'bg-green-500 text-white'
                    : 'bg-green-100 text-green-700'
                return (
                  <span
                    key={tag}
                    className={`text-xs font-medium px-2.5 py-1 rounded ${colors}`}
                  >
                    {prefix ? `${prefix} - ${tag}` : tag}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Website */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Globe size={14} className="text-gray-400" />
            <span className="text-gray-400 text-xs">Website</span>
          </div>
          <a
            href={`https://${company.website}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-700 hover:underline flex items-center gap-1 -mt-2 mb-4"
          >
            {company.website}
            <ExternalLink size={12} />
          </a>

          <div className="border-t border-gray-100 pt-4 mb-4" />

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <GitBranch size={15} className="text-gray-400" />
                Branches
              </div>
              <span className="text-lg font-bold text-gray-900">{company.branches}</span>
            </div>
            <div className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-yellow-700">
                <Users size={15} />
                Active Contacts
              </div>
              <span className="text-lg font-bold text-gray-900">{company.activeUsers}</span>
            </div>
            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-green-700">
                <DollarSign size={15} />
                Total Sales
              </div>
              <span className="text-lg font-bold text-gray-900">{company.totalSales}</span>
            </div>
          </div>

          {/* Quick Action */}
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
            <span className="text-sm font-semibold text-gray-700">Quick Action</span>
            <div className="flex items-center gap-2">
              <button className="px-4 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                Call
              </button>
              <button className="px-4 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                Email
              </button>
              <button className="flex items-center gap-1.5 px-4 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <FileText size={14} />
                Log
              </button>
            </div>
          </div>
        </div>

        {/* Branches Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <GitBranch size={18} />
              Branches
            </div>
            <button
              onClick={() => setShowAddBranch(true)}
              className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Plus size={15} />
              Add Branch
            </button>
          </div>

          {/* Branch Selector */}
          <div className="relative">
            <div
              onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
              className="border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">{branch.name}</span>
                <span className="text-xs font-semibold bg-teal-500 text-white px-2 py-0.5 rounded">
                  {branch.type}
                </span>
                {branch.location && (
                  <span className="text-sm text-gray-400">({branch.location})</span>
                )}
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
            {branchDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setBranchDropdownOpen(false)} />
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 max-h-60 overflow-auto">
                  {company.branchList.map((b, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setExpandedBranch(i)
                        setBranchDropdownOpen(false)
                        setEditingBranch(false)
                        setBranchForm(null)
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                        expandedBranch === i ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <span>{b.name}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        expandedBranch === i ? 'bg-indigo-600 text-white' : 'bg-teal-500 text-white'
                      }`}>
                        {b.type}
                      </span>
                      {b.location && <span className="text-xs text-gray-400">({b.location})</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tabbed Card — nav left, content right */}
        <div className="bg-white rounded-xl border border-gray-200 flex flex-col min-h-[320px] mb-5">
          <div className="flex items-stretch flex-1">
            {/* Left Nav */}
            <div className="w-48 shrink-0 border-r border-gray-200 p-3">
              <h2 className="text-xl font-bold text-gray-900 px-3 py-2.5 mb-1">About</h2>
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-0.5 last:mb-0 ${
                    activeTab === tab.label
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon size={15} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right Content */}
            <div className="flex-1 min-w-0 p-6 overflow-auto">
              {activeTab === 'Overview' && (
                <div className="space-y-6" key={refreshKey}>
                  {/* Branch Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                      <Building2 size={16} className="text-gray-500" />
                      {branch.name}
                      <span className="text-[10px] font-semibold bg-indigo-700 text-white px-2 py-0.5 rounded ml-1">
                        {branch.type}
                      </span>
                    </div>
                    <button
                      onClick={() => setEditDrawerOpen(true)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                    >
                      <Pencil size={15} />
                    </button>
                  </div>

                  {/* Phones & Emails — 2 columns */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Phones */}
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Phones</p>
                      {company.phones?.length > 0 ? (
                        <div className="space-y-3">
                          {company.phones.map((p, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <Phone size={14} className="text-gray-400 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-400">{PHONE_TYPE_LABELS[p.type] || p.type}</p>
                                <div className="flex items-center gap-2">
                                  <p className={`text-sm font-medium ${p.primary ? 'text-indigo-600' : 'text-gray-900'}`}>{p.number}</p>
                                  {p.primary && (
                                    <span className="flex items-center gap-1 text-[10px] font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded px-1.5 py-0.5">
                                      <Star size={10} fill="currentColor" />
                                      Preferred
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400">No phone information</p>
                      )}
                    </div>

                    {/* Emails */}
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Emails</p>
                      {company.emails?.length > 0 ? (
                        <div className="space-y-3">
                          {company.emails.map((e, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <Mail size={14} className="text-gray-400 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-400">{e.type}</p>
                                <div className="flex items-center gap-2">
                                  <p className={`text-sm font-medium truncate ${e.primary ? 'text-indigo-600' : 'text-gray-900'}`}>{e.address}</p>
                                  {e.primary && (
                                    <span className="flex items-center gap-1 text-[10px] font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded px-1.5 py-0.5 shrink-0">
                                      <Star size={10} fill="currentColor" />
                                      Preferred
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400">No email information</p>
                      )}
                    </div>
                  </div>

                  {/* Main Address & Billing Address — side by side */}
                  <div className="border-t border-gray-100 pt-6">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Main Address */}
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Main Address</p>
                        {company.billingAddress ? (
                          <div className="flex items-start gap-3">
                            <MapPin size={14} className="text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{company.billingAddress}</p>
                              <p className="text-sm text-gray-600">{company.city}, {company.state} {company.zip}</p>
                              <p className="text-sm text-gray-600">{company.country}</p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400">No address</p>
                        )}
                      </div>

                      {/* Billing Address */}
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Billing Address</p>
                        <div className="flex items-start gap-3">
                          <MapPin size={14} className="text-gray-400 mt-0.5" />
                          <p className="text-sm text-gray-500 italic">Same as main address</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {activeTab === 'Categorization' && (
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  {/* Company Types */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 size={16} className="text-gray-500" />
                      <h3 className="text-sm font-bold text-gray-900">Company Types</h3>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {company.tags
                        .filter((t) => t !== 'Active')
                        .map((tag) => {
                          const prefix = tag === 'Customer' ? 'C' : tag === 'Vendor' ? 'V' : ''
                          return (
                            <span
                              key={tag}
                              className="text-sm font-medium text-gray-700 border border-gray-200 rounded-full px-4 py-1.5"
                            >
                              {prefix ? `${prefix} - ${tag}` : tag}
                            </span>
                          )
                        })}
                    </div>
                  </div>

                  {/* Sub Company Types */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <LayoutGrid size={16} className="text-gray-500" />
                      <h3 className="text-sm font-bold text-gray-900">Sub Company Types</h3>
                    </div>
                    <p className="text-sm text-gray-400">None assigned</p>
                  </div>

                  {/* Company ID */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Tags size={16} className="text-gray-500" />
                      <h3 className="text-sm font-bold text-gray-900">Company ID</h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{company.companyId}</p>
                  </div>

                  {/* Account Status */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2">Account Status</h3>
                    <span className="text-sm font-medium text-green-600 border border-green-300 rounded-full px-4 py-1.5">
                      {company.status}
                    </span>
                  </div>

                  {/* Union Status */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={16} className="text-gray-500" />
                      <h3 className="text-sm font-bold text-gray-900">Union Status</h3>
                    </div>
                    <p className="text-sm text-gray-400">Not applicable</p>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Current Employees — always visible, full width below tabs */}
          <div className="border-t border-gray-200 px-6 py-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                <Users size={16} className="text-gray-500" />
                Current Employees
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Plus size={15} />
                Add Contact
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-5">
              {company.employees.map((emp) => (
                <div
                  key={emp.name}
                  className="border border-gray-200 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-full ${emp.color} text-white text-xs font-bold flex items-center justify-center shrink-0`}
                    >
                      {emp.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900 truncate">
                          {emp.name}
                        </span>
                        {emp.tier && (
                          <span className="text-[10px] font-semibold bg-red-50 text-red-500 px-1.5 py-0.5 rounded shrink-0">
                            {emp.tier}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">{emp.role}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-3">
                    {emp.phone && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Phone size={12} className="text-gray-400" />
                        {emp.phone}
                      </div>
                    )}
                    {emp.email && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Mail size={12} className="text-gray-400" />
                        {emp.email}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex items-center gap-3">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <Phone size={15} />
                    </button>
                    {emp.email && (
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Mail size={15} />
                      </button>
                    )}
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <FileText size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                View all {company.activeUsers} contacts
              </button>
            </div>
          </div>
        </div>

        {/* Quotes Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
              <LayoutGrid size={16} className="text-gray-500" />
              Quotes
            </div>
          </div>
          <p className="text-sm text-gray-400 text-center py-4">
            Quotes feature is currently under development.
          </p>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
              <Package size={16} className="text-gray-500" />
              Orders
            </div>
          </div>
          <p className="text-sm text-gray-400 text-center py-4">
            Orders feature is currently under development.
          </p>
        </div>
      </div>

      {showAddBranch && (
        <AddBranchModal
          companyId={company.id}
          companyName={company.name}
          onClose={() => setShowAddBranch(false)}
          onBranchAdded={() => {
            setExpandedBranch(company.branchList.length - 1)
            forceUpdate((n) => n + 1)
          }}
        />
      )}

      {editDrawerOpen && (
        <CompanyEditDrawer
          company={company}
          onClose={() => setEditDrawerOpen(false)}
          onSaved={() => setRefreshKey((k) => k + 1)}
        />
      )}
    </main>
  )
}
