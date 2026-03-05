import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Users,
  Building2,
  MapPin,
  Mail,
  FileText,
  Pencil,
  MoreVertical,
  Package,
  CreditCard,
  DollarSign,
  LayoutGrid,
  UserCheck,
  StickyNote,
  RefreshCw,
  Phone,
  Star,
  Briefcase,
} from 'lucide-react'
import { contacts } from '../data/contacts'
import { PHONE_TYPE_LABELS, EMAIL_TYPE_LABELS } from '../constants/phoneTypes'
import { resolveBranchPhonesForContact, resolveBranchEmailForContact, resolveCompanyPhonesForContact, resolveCompanyEmailsForContact, resolveContactCardPhones, calculateProfileCompletion } from '../utils/phoneResolution'
import ContactEditDrawer from './ContactEditContent'

const tabs = [
  { icon: Users, label: 'Overview' },
  { icon: Building2, label: 'Company' },
]

export default function ContactDetailContent() {
  const { contactId } = useParams()
  const navigate = useNavigate()
  const [refreshKey, setRefreshKey] = useState(0)
  const contact = contacts.find((c) => c.id === Number(contactId))
  const [activeTab, setActiveTab] = useState('Overview')
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)

  if (!contact) {
    return (
      <main className="flex-1 min-w-0 overflow-auto bg-gray-50/80 flex items-center justify-center">
        <p className="text-gray-500">Contact not found.</p>
      </main>
    )
  }

  const getTierColor = (tier) => {
    if (tier === 'Tier 1') return 'bg-indigo-600 text-white'
    if (tier === 'Tier 2') return 'bg-orange-400 text-white'
    return 'bg-gray-200 text-gray-600'
  }

  const getCompletionColor = (pct) => {
    if (pct >= 80) return 'bg-green-500'
    if (pct >= 60) return 'bg-orange-400'
    return 'bg-red-400'
  }

  return (
    <main className="flex-1 min-w-0 overflow-auto bg-gray-50/80">
      {/* Top breadcrumb bar */}
      <div className="flex items-center gap-2 px-8 py-3 text-sm text-gray-500 border-b border-gray-200 bg-white">
        <Users size={15} className="text-gray-400" />
        <span
          className="text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={() => navigate('/contacts')}
        >
          Contacts
        </span>
        <span className="text-gray-300">/</span>
        <span className="font-medium text-gray-700">{contact.name}</span>
      </div>

      <div className="px-8 py-6 max-w-6xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/contacts')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditDrawerOpen(true)}
              className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <Pencil size={15} />
              Edit Contact
            </button>
            <button className="p-2.5 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-4">
            <Users size={16} />
            Profile
          </div>

          <div className="flex items-start gap-5 mb-5">
            {/* Large Profile Picture */}
            {contact.profilePicture ? (
              <img
                src={contact.profilePicture}
                alt={contact.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 shrink-0"
              />
            ) : (
              <div
                className={`w-24 h-24 rounded-full ${contact.color} text-white text-2xl font-bold flex items-center justify-center shrink-0`}
              >
                {contact.initials}
              </div>
            )}

            {/* Name, meta, and completion */}
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-start justify-between mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{contact.name}</h1>
                <div className="flex items-center gap-1.5 shrink-0">
                  {contact.tier && (
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded ${getTierColor(contact.tier)}`}>
                      {contact.tier}
                    </span>
                  )}
                  <span className="text-[11px] font-semibold bg-green-500 text-white px-2.5 py-1 rounded">
                    {contact.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <UserCheck size={12} className="text-gray-400" />
                  <span className="text-gray-400">Position</span>
                  <span className="font-medium text-gray-700 ml-0.5">{contact.role}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building2 size={12} className="text-gray-400" />
                  <span className="text-gray-400">Company</span>
                  <span className="font-medium text-gray-700 ml-0.5">{contact.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={12} className="text-orange-400" />
                  <span className="text-gray-400">Branch</span>
                  <span className="font-medium text-gray-700 ml-0.5">{contact.branch}</span>
                </div>
              </div>

              {/* Profile Completion Bar */}
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden relative">
                <div
                  className={`h-full ${getCompletionColor(calculateProfileCompletion(contact))} rounded-full`}
                  style={{ width: `${calculateProfileCompletion(contact)}%` }}
                />
                <span className="absolute inset-0 flex items-center px-3 text-[11px] font-semibold text-white">
                  Profile Completion {calculateProfileCompletion(contact)}%
                </span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Package size={15} className="text-gray-400" />
                Orders
              </div>
              <span className="text-lg font-bold text-gray-900">{contact.orders || 0}</span>
            </div>
            <div className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-yellow-700">
                <CreditCard size={15} />
                Needs Payment
              </div>
              <span className="text-lg font-bold text-gray-900">{contact.needsPayment || 0}</span>
            </div>
            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-green-700">
                <DollarSign size={15} />
                Total Sales
              </div>
              <span className="text-lg font-bold text-gray-900">{contact.totalSales || '-'}</span>
            </div>
          </div>

          {/* Quick Action */}
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
            <span className="text-sm font-semibold text-gray-700">Quick Action</span>
            <div className="flex items-center gap-2">
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

        {/* Tabbed Card — nav left, content right, inside one box */}
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
              <div className="space-y-6">
                {/* Personal Contact */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                      <Users size={16} className="text-gray-500" />
                      Contact Information
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                      <Pencil size={15} />
                    </button>
                  </div>
                  {(() => {
                    const companyPhones = resolveCompanyPhonesForContact(contact)
                    const branchPhones = resolveBranchPhonesForContact(contact)
                    const contactPhones = contact.phones || []
                    // Deduplicate by number — company first, then branch, then contact
                    const seenNumbers = new Set()
                    const allPhones = []
                    for (const p of [
                      ...companyPhones.map((p) => ({ ...p, source: 'Branch' })),
                      ...branchPhones.map((p) => ({ ...p, source: 'Branch' })),
                      ...contactPhones.map((p) => ({ ...p, source: 'Contact' })),
                    ]) {
                      if (!seenNumbers.has(p.number)) {
                        seenNumbers.add(p.number)
                        allPhones.push(p)
                      }
                    }

                    const companyEmails = resolveCompanyEmailsForContact(contact)
                    const branchEmail = resolveBranchEmailForContact(contact)
                    const contactEmails = contact.emails || []
                    // Deduplicate by email value
                    const seenEmails = new Set()
                    const allEmails = []
                    for (const e of [
                      ...companyEmails.map((e) => ({ type: e.type, value: e.address, source: 'Branch', primary: e.primary })),
                      ...(branchEmail ? [{ type: 'Branch Email', value: branchEmail, source: 'Branch', primary: !companyEmails.some((e) => e.primary) }] : []),
                      ...contactEmails.map((e) => ({ ...e, source: 'Contact' })),
                      ...(contact.workEmail ? [{ type: 'Business Email', value: contact.workEmail, source: 'Contact', primary: false }] : []),
                    ]) {
                      if (!seenEmails.has(e.value)) {
                        seenEmails.add(e.value)
                        allEmails.push(e)
                      }
                    }

                    const noPhones = allPhones.length === 0
                    const noEmails = allEmails.length === 0

                    return (
                      <div className="grid grid-cols-2 gap-6">
                        {/* Phones Column */}
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Phones</p>
                          {noPhones ? (
                            <p className="text-sm text-gray-400">No phone information</p>
                          ) : (
                            <div className="space-y-3">
                              {allPhones.map((p, i) => (
                                <div key={i} className="flex items-start gap-3">
                                  <Phone size={14} className="text-gray-400 mt-0.5" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-400">
                                      {PHONE_TYPE_LABELS[p.type] || p.type}
                                      {p.source === 'Branch' && (
                                        <span className="ml-1.5 text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">From Branch</span>
                                      )}
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <p className={`text-sm font-medium ${p.primary ? 'text-indigo-600' : 'text-gray-900'}`}>
                                        {p.number}
                                      </p>
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
                          )}
                        </div>

                        {/* Emails Column */}
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Emails</p>
                          {noEmails ? (
                            <p className="text-sm text-gray-400">No email information</p>
                          ) : (
                            <div className="space-y-3">
                              {allEmails.map((e, i) => (
                                <div key={i} className="flex items-start gap-3">
                                  <Mail size={14} className="text-gray-400 mt-0.5" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-400">
                                      {EMAIL_TYPE_LABELS[e.type] || e.type}
                                      {e.source === 'Branch' && (
                                        <span className="ml-1.5 text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">From Branch</span>
                                      )}
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <p className={`text-sm font-medium truncate ${e.primary ? 'text-indigo-600' : 'text-gray-900'}`}>
                                        {e.value}
                                      </p>
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
                          )}
                        </div>
                      </div>
                    )
                  })()}
                </div>

                {/* Notes */}
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                      <StickyNote size={16} className="text-gray-500" />
                      Notes
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                      <Pencil size={15} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">{contact.notes || 'No notes added'}</p>
                </div>
              </div>
            )}

            {activeTab === 'Company' && (
              <div className="space-y-6">
                {/* Current Company */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                      <Building2 size={16} className="text-gray-500" />
                      Current Company
                    </div>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-700 text-white rounded-lg text-sm font-medium hover:bg-indigo-800 transition-colors">
                      <RefreshCw size={14} />
                      Change
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1">{contact.company}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {contact.branch} - Vancouver, WA
                  </p>

                  <span className="inline-block text-xs font-semibold text-gray-700 border border-gray-200 rounded px-3 py-1 mb-4">
                    CUSTOMER
                  </span>

                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-400">Website</p>
                    <a
                      href="#"
                      className="text-sm text-gray-700 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      Visit Website
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>

                  {/* Details */}
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Created</span>
                        <span className="font-medium text-gray-900">2/16/2026</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Updated</span>
                        <span className="font-medium text-gray-900">2/16/2026</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional History */}
                <div className="border-t-2 border-gray-200 pt-8 mt-2">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                      <Briefcase size={16} className="text-gray-500" />
                      Professional History
                    </div>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-700 text-white rounded-lg text-sm font-medium hover:bg-indigo-800 transition-colors">
                      <RefreshCw size={14} />
                      Change Company
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-semibold bg-green-500 text-white px-2 py-0.5 rounded">
                        Current
                      </span>
                      <span className="font-bold text-gray-900">{contact.company}</span>
                    </div>
                    <div className="flex items-center gap-6 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <UserCheck size={12} className="text-gray-400" />
                        <span className="text-gray-400">Position</span>
                        <span className="font-medium text-gray-700">{contact.role}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-orange-400" />
                        <span className="text-gray-400">Branch Location</span>
                        <span className="font-medium text-gray-700">{contact.branch}</span>
                      </div>
                    </div>
                    {contact.workEmail && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
                        <Mail size={12} className="text-gray-400" />
                        <span className="text-gray-400">Work Email</span>
                        <span className="font-medium text-gray-700">{contact.workEmail}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

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

        {/* Communication Log — always visible */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
              <FileText size={16} className="text-gray-500" />
              Communication Log
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-700 text-white rounded-lg text-sm font-medium hover:bg-indigo-800 transition-colors">
              <FileText size={14} />
              Log New
            </button>
          </div>
          <p className="text-sm text-gray-400 text-center py-4">
            No communication logged yet
          </p>
        </div>
      </div>

      {editDrawerOpen && (
        <ContactEditDrawer
          contact={contact}
          onClose={() => setEditDrawerOpen(false)}
          onSaved={() => setRefreshKey((k) => k + 1)}
        />
      )}
    </main>
  )
}
